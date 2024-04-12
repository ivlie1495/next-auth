'use server'

import { z } from 'zod'

import { resetSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/user'
import { generatePasswordResetToken } from '@/utils/token'
import { sendPasswordResetEmail } from '@/utils/email'

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Reset email sent!' }
}
