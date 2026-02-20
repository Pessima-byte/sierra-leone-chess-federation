import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'SLCF Portal',
  description: 'Sierra Leone Chess Federation Official Portal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
      <body className="antialiased selection:bg-blue-500/30 text-white bg-[#0f172a]">
        {/* Extremely vibrant, colorful blue background to remove blackness completely */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('/grid.svg')] opacity-[0.06]"></div>
        <div className="fixed inset-0 z-[-2] pointer-events-none bg-[linear-gradient(to_bottom_right,#1e3a8a,#312e81,#020617)]"></div>
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] z-[-2] bg-blue-500/30 blur-[150px] rounded-full"></div>
        <div className="fixed top-[20%] right-[-10%] w-[50%] h-[50%] z-[-2] bg-emerald-500/20 blur-[150px] rounded-full"></div>
        <Navbar />
        {children}
        <Toaster position="top-right" theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
