"use client"

import { usePathname } from "next/navigation"

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Hide main navbar on admin pages to prevent layout conflicts
    if (pathname?.startsWith('/admin')) {
        return null
    }

    return <>{children}</>
}
