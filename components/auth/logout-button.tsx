'use client'

import { logout } from '@/actions/logout'
import { PropsWithChildren } from 'react'

const LogoutButton = ({ children }: PropsWithChildren) => {
  const onLogout = () => {
    logout()
  }

  return (
    <span onClick={onLogout} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LogoutButton
