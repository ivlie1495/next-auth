'use server'

import { signOut } from '@/utils/auth'

export const logout = async () => {
  await signOut()
}
