import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { headers } from 'next/headers'
import { getSystemSettings } from '@/lib/queries'
import { getSession } from '@/app/actions/auth'
import './globals.css'
import LockdownPage from './lockdown/page'

export const metadata: Metadata = {
  title: 'SLCF Portal',
  description: 'Sierra Leone Chess Federation Official Portal',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  const settings = await getSystemSettings()
  const session = await getSession()
  const isAdmin = session?.user.role === 'ADMIN'

  // Exceptions for lockdown: /admin, /login, /api, and the lockdown page itself
  const isExcluded = pathname.startsWith('/admin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||
    pathname === '/lockdown'

  const showLockdown = settings.lockdownActive && !isAdmin && !isExcluded

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {showLockdown ? <LockdownPage /> : children}
        <Toaster position="top-right" theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
