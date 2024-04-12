'use server'

import { getUserByEmail } from '@/services/user'
import { getVerificationTokenByToken } from '@/services/verification-token'
import { db } from '@/utils/db'

export const verification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const expired = new Date(existingToken.expires) < new Date()

  if (expired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Email verified!' }
}
