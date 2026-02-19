"use client"

import { useState, Suspense, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
    ChevronLeft,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    Sparkles,
    ShieldCheck,
    Eye,
    EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { login, register } from "@/app/actions/auth"

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black italic">AUTHENTICATING TERMINAL...</div>}>
            <LoginContent />
        </Suspense>
    )
}

function LoginContent() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const queryMode = searchParams.get('mode')
        if (queryMode === 'register') {
            setMode('register')
        } else {
            setMode('login')
        }
    }, [searchParams])


    const handleAuthAction = async (formData: FormData) => {
        setIsLoading(true)

        let result;

        if (mode === 'login') {
            result = await login(null, formData)
        } else {
            result = await register(null, formData)
        }

        if (result?.error) {
            toast.error("Authentication Failed", {
                description: result.error,
                className: "bg-red-500/10 border-red-500/20 text-red-400",
            })
            setIsLoading(false)
        } else {
            toast.success(mode === 'login' ? "Access Granted: Welcome back, Player!" : "Account Created: Welcome to the Federation!", {
                description: "Redirecting to your dashboard...",
                className: "bg-slate-900 border-white/10 text-white",
            })
            // Router push handled by server action redirect or here
            router.push('/members') // Fallback
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-2xl">

                {/* Left Side: Brand & Visuals */}
                <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-white/10 bg-slate-950/40">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none"></div>

                    <Link href="/" className="flex items-center gap-3 group relative z-10">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative w-full h-full bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center">
                                <Image
                                    src="/images/logo.png"
                                    alt="SLCF Logo"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl leading-none">SLCF</span>
                            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Federation Portal</span>
                        </div>
                    </Link>

                    <div className="relative z-10 space-y-6">
                        <Badge variant="outline" className="py-1.5 px-4 rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] w-fit">
                            <Sparkles className="w-3 h-3 mr-2 animate-pulse" />
                            Next-Gen Authentication
                        </Badge>
                        <h2 className="text-5xl font-black leading-[0.9] tracking-tighter italic text-white">
                            PROTECTING THE <br />
                            <span className="text-blue-500 not-italic">FEDERATION&apos;S</span> <br />
                            LEGACY.
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-sm">
                            Access your rating history, registered tournaments, and exclusive grandmaster resources.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 py-6 border-t border-white/5">
                        <div className="h-10 w-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                            E2E Encrypted Session Data <br />
                            Secured by SLCF Security Protocol v4.0
                        </div>
                    </div>
                </div>

                {/* Right Side: Auth Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="text-center lg:text-left mb-10">
                        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">
                            {mode === 'login' ? 'IDENTITY VERIFICATION' : 'JOIN THE ELITE'}
                        </h1>
                        <p className="text-muted-foreground">
                            {mode === 'login'
                                ? 'Authorize your session to continue access.'
                                : 'Create your digital federation credentials.'}
                        </p>
                    </div>

                    <form action={handleAuthAction} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Terminal</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="cadet@slchess.org"
                                        className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-500/50 transition-all focus:bg-white/[0.08]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Encryption Key</label>
                                    {mode === 'login' && (
                                        <Link href="#" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest">Lost Key?</Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        placeholder="••••••••••••"
                                        className="h-14 pl-12 pr-12 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-500/50 transition-all focus:bg-white/[0.08]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    SECURE AUTHENTICATING...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    {mode === 'login' ? 'AUTHORIZE SESSION' : 'INITIALIZE REGISTRATION'}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                            <span className="bg-[#020617] px-4 text-muted-foreground">OR EXTERNAL PROVIDER</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                            <Chrome className="w-5 h-5 mr-3" /> Google
                        </Button>
                        <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                            <Github className="w-5 h-5 mr-3" /> GitHub
                        </Button>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => {
                                const newMode = mode === 'login' ? 'register' : 'login'
                                setMode(newMode)
                                router.push(`/login?mode=${newMode}`)
                            }}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                        >
                            {mode === 'login'
                                ? "New to the federation? "
                                : "Already have credentials? "}
                            <span className="text-blue-400 font-bold border-b border-blue-400/20">
                                {mode === 'login' ? 'Initialize Registration' : 'Authorize Login'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Abort Button */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 group px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                <span className="text-xs font-bold text-muted-foreground group-hover:text-white uppercase tracking-widest">Abort to Home</span>
            </Link>
        </div>
    )
}
