'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { defaultLoginRedirect } from '@/routes'
import { getTwoFactorConfirmationByUserId } from '@/services/two-factor-confirmation'
import { getTwoFactorTokenByEmail } from '@/services/two-factor-token'
import { getUserByEmail } from '@/services/user'
import { loginSchema } from '@/schemas/auth'
import { signIn } from '@/utils/auth'
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/utils/email'
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/utils/token'
import { db } from '@/utils/db'

type LoginFormProps = z.infer<typeof loginSchema>

export const loginAction = async (values: LoginFormProps) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  try {
    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: 'Email does not exist.' }
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      )
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      )

      return { success: 'Confirmation email sent!' }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (!code) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        )

        return { twoFactor: true }
      }

      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: 'Invalid code!' }
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code expired!' }
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' }
        default:
          return { error: 'Something went wrong.' }
      }
    }

    throw error
  }
}
