'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaKey } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { defaultLoginRedirect } from '@/routes'

type Provider = 'google' | 'github' | 'keycloak'

const AuthSocial = () => {
  const onClick = (provider: Provider) => {
    signIn(provider, {
      callbackUrl: defaultLoginRedirect,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick('keycloak')
        }}
      >
        <FaKey className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default AuthSocial
