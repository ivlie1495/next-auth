'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface Props {
  href: string
  label: string
}

const AuthBackButton = ({ href, label }: Props) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default AuthBackButton
