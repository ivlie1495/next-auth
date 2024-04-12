'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  mode?: 'modal' | 'redirect'
}

const LoginButton = ({ mode = 'redirect', children }: Props) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return <div>TODO: implement modal</div>
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export default LoginButton
