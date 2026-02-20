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
        {/* Simplified background for mobile to improve scrolling performance */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('/grid.svg')] opacity-[0.03] transform-gpu"></div>
        <div className="fixed inset-0 z-[-2] pointer-events-none bg-slate-950 transform-gpu"></div>
        <div className="fixed inset-0 z-[-3] pointer-events-none bg-[linear-gradient(to_bottom_right,#1e3a8a,#020617)] opacity-40 transform-gpu lg:opacity-100"></div>

        {/* Only show expensive blur orbs on desktop */}
        <div className="hidden lg:block">
          <div
            className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] z-[-2] bg-blue-500/20 blur-[150px] rounded-full transform-gpu"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          ></div>
          <div
            className="fixed top-[20%] right-[-10%] w-[50%] h-[50%] z-[-2] bg-emerald-500/15 blur-[150px] rounded-full transform-gpu"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          ></div>
        </div>
        <Navbar />
        {children}
        <Toaster position="top-right" theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
