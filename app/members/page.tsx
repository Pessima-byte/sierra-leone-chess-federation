import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    Menu,
    Mail,
    Phone,
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/app/actions/auth"
import { getMembers } from "@/lib/queries"
import MembersClient from "./members-client"

export const revalidate = 60

export default async function MembersPage() {
    const [session, members] = await Promise.all([
        getSession(),
        getMembers()
    ])

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            <main className="pt-24 pb-24">
                <MembersClient members={members as any} />
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">SL</div>
                                <span className="font-black italic uppercase tracking-tighter text-lg">SLCF</span>
                            </div>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-60">
                                The official governing body for chess in Sierra Leone. Affiliation with FIDE and the Africa Chess Confederation.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Quick Links</h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li><Link href="/#home" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/#players" className="hover:text-blue-400 transition-colors">Rankings</Link></li>
                                <li><Link href="/news" className="hover:text-blue-400 transition-colors">News Transmission</Link></li>
                                <li><Link href="/members" className="hover:text-blue-400 transition-colors">Membership</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Resources</h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Learn Chess</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">FIDE Laws</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Arbiter&apos;s Corner</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Download PGNs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Contact</h4>
                            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    15 Siaka Stevens St, Freetown
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    info@slchess.org
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                    +232 76 123 456
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground opacity-40">
                        <p>© 2025 Sierra Leone Chess Federation. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-white">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white">Terms of Service</Link>
                            <Link href="#" className="hover:text-white">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}
