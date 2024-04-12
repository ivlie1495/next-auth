'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

import LoginForm from '@/components/auth/login-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface Props extends PropsWithChildren {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton = ({ mode = 'redirect', asChild, children }: Props) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export default LoginButton
