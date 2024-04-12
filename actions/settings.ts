'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { settingsSchema } from '@/schemas/auth'
import { getUserByEmail, getUserById } from '@/services/user'
import { db } from '@/utils/db'
import { sendVerificationEmail } from '@/utils/email'
import { generateVerificationToken } from '@/utils/token'
import { currentUser } from '@/utils/user'

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const userDb = await getUserById(user.id!)

  if (!userDb) {
    return { error: 'User not found' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already used!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && userDb.password) {
    const passwordMatch = await bcrypt.compare(values.password, userDb.password)

    if (!passwordMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.password, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: {
      id: userDb.id,
    },
    data: {
      ...values,
    },
  })

  return { success: 'Settings updated!' }
}
