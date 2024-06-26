import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

import { auth } from '@/utils/auth'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={lato.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}

export default RootLayout
