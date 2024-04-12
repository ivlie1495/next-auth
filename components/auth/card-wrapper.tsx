'use client'

import { PropsWithChildren } from 'react'

import AuthHeader from '@/components/auth/header'
import AuthSocial from '@/components/auth/social'
import AuthBackButton from '@/components/auth/back-button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface Props extends PropsWithChildren {
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const AuthCardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  children,
}: Props) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <AuthSocial />
        </CardFooter>
      )}
      <CardFooter>
        <AuthBackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export default AuthCardWrapper
