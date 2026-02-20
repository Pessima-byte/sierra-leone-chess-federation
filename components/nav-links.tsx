"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    { name: "Home", href: "/" },
    { name: "Calendar", href: "/calendar" },
    { name: "Members", href: "/members" },
    { name: "Learn", href: "/#learn" },
    { name: "News", href: "/news" },
]

export function NavLinks() {
    const pathname = usePathname()

    return (
        <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            {links.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive
                                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}
