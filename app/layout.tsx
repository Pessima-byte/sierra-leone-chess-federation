import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'
import NavbarWrapper from '@/components/navbar-wrapper'
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
      <body className={`${GeistSans.className} ${GeistMono.variable} antialiased selection:bg-blue-500/30 text-white bg-[#0f172a]`} suppressHydrationWarning>
        {/* 
          Background container — uses `contain: strict` to isolate it
          from the main scroll composite. This prevents the browser from
          re-compositing these layers on every scroll frame.
        */}
        <div className="fixed inset-0 z-[-1] pointer-events-none" style={{ contain: 'strict' }}>
          {/* Solid base */}
          <div className="absolute inset-0 bg-slate-950"></div>
          {/* Gradient overlay — hidden on mobile for perf */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#1e3a8a,#020617)] opacity-40 lg:opacity-100"></div>
          {/* Grid texture — very lightweight */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        </div>

        {/* Decorative blur orbs — DESKTOP ONLY (hidden on ≤1024px via CSS + class) */}
        <div className="hidden lg:block fixed inset-0 z-[-1] pointer-events-none" style={{ contain: 'strict' }}>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[150px] rounded-full transform-gpu"></div>
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/15 blur-[150px] rounded-full transform-gpu"></div>
        </div>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        {children}
        <Toaster position="top-right" theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
