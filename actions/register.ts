'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { registerSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/user'
import { db } from '@/utils/db'
import { sendVerificationEmail } from '@/utils/email'
import { generateVerificationToken } from '@/utils/token'

type LoginFormProps = z.infer<typeof registerSchema>

export const registerAction = async (values: LoginFormProps) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: 'Email already in use!',
    }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmation email sent!' }
}
