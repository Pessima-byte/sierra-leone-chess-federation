"use client"

import { useState, Suspense, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    Eye,
    EyeOff,
    ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { login, register } from "@/app/actions/auth"

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="h-8 w-8 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        }>
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
            })
            setIsLoading(false)
        } else {
            toast.success(mode === 'login' ? "Welcome back!" : "Account created!", {
                description: "Redirecting...",
            })
            const authResult = result as any
            if (authResult?.role === 'ADMIN') {
                router.push('/admin/dashboard')
            } else {
                router.push('/members')
            }
        }
    }

    /* ─── Shared Form Component ─── */
    const AuthForm = (
        <>
            {/* Social Login */}
            <div className="flex gap-2.5 mb-4">
                <button className="flex-1 h-11 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center gap-2 text-[13px] font-medium text-slate-300 hover:bg-white/[0.08] active:scale-[0.97] transition-all">
                    <Chrome className="w-4 h-4 text-slate-400" />
                    Google
                </button>
                <button className="flex-1 h-11 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center gap-2 text-[13px] font-medium text-slate-300 hover:bg-white/[0.08] active:scale-[0.97] transition-all">
                    <Github className="w-4 h-4 text-slate-400" />
                    GitHub
                </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/[0.06]"></div>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/[0.06]"></div>
            </div>

            {/* Form */}
            <form action={handleAuthAction} className="space-y-3">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        type="email"
                        name="email"
                        required
                        placeholder="Email address"
                        className="h-11 pl-10 bg-white/[0.04] border-white/[0.06] rounded-xl text-[14px] placeholder:text-slate-600 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/15 transition-all"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        placeholder="Password"
                        className="h-11 pl-10 pr-10 bg-white/[0.04] border-white/[0.06] rounded-xl text-[14px] placeholder:text-slate-600 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/15 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {mode === 'login' && (
                    <div className="flex justify-end">
                        <Link href="#" className="text-[12px] text-blue-400 font-medium hover:text-blue-300 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] transition-all active:scale-[0.97] disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>{mode === 'login' ? 'Signing in...' : 'Creating...'}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                </Button>
            </form>

            {/* Toggle + Legal */}
            <div className="mt-5 text-center space-y-2.5">
                <button
                    onClick={() => {
                        const newMode = mode === 'login' ? 'register' : 'login'
                        setMode(newMode)
                        router.push(`/login?mode=${newMode}`)
                    }}
                    className="text-[13px] text-slate-400 hover:text-slate-300 transition-colors"
                >
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <span className="text-blue-400 font-semibold">{mode === 'login' ? 'Sign up' : 'Sign in'}</span>
                </button>
                <p className="text-[10px] text-slate-600">
                    By continuing, you agree to our{' '}
                    <Link href="#" className="text-slate-500 underline underline-offset-2">Terms</Link>
                    {' & '}
                    <Link href="#" className="text-slate-500 underline underline-offset-2">Privacy</Link>
                </p>
            </div>
        </>
    )

    return (
        <div className="min-h-[100dvh] bg-slate-950 text-white relative overflow-hidden">

            {/* ═══════════════════════════════════════════════
                MOBILE LAYOUT (< lg)
            ═══════════════════════════════════════════════ */}
            <div className="lg:hidden min-h-[100dvh] flex flex-col relative">
                {/* Full-screen background */}
                <div className="absolute inset-0 z-0">
                    <Image src="/images/chess-hero.png" alt="Chess" fill priority className="object-cover object-center opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col px-5">
                    {/* Top Bar */}
                    <header className="flex items-center justify-between pt-[max(env(safe-area-inset-top,12px),12px)] mt-3 mb-6">
                        <Link href="/" className="flex items-center gap-2.5 active:opacity-70 transition-opacity">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 backdrop-blur-md border border-white/15">
                                <Image src="/images/logo.png" alt="SLCF" width={32} height={32} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[13px] font-semibold text-white/80">SLCF</span>
                        </Link>
                        <button
                            onClick={() => {
                                const newMode = mode === 'login' ? 'register' : 'login'
                                setMode(newMode)
                                router.push(`/login?mode=${newMode}`)
                            }}
                            className="text-[12px] font-medium text-blue-400 active:opacity-70 transition-opacity"
                        >
                            {mode === 'login' ? 'Create account' : 'Sign in'}
                        </button>
                    </header>

                    {/* Spacer */}
                    <div className="flex-1 min-h-[60px]"></div>

                    {/* Heading */}
                    <div className="mb-5 pl-1">
                        <h1 className="text-[28px] font-bold tracking-tight leading-[1.15]">
                            {mode === 'login' ? 'Welcome back' : 'Create account'}
                        </h1>
                        <p className="text-[14px] text-white/40 mt-1">
                            {mode === 'login' ? 'Sign in to continue to your account' : 'Join the Sierra Leone Chess Federation'}
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 mb-4 shadow-2xl shadow-black/40">
                        {AuthForm}
                    </div>

                    {/* Bottom safe area */}
                    <div className="pb-[max(env(safe-area-inset-bottom,8px),8px)]"></div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                DESKTOP LAYOUT (≥ lg)
            ═══════════════════════════════════════════════ */}
            <div className="hidden lg:flex min-h-screen">
                {/* Left Side — Hero Visual */}
                <div className="flex-1 relative overflow-hidden">
                    <Image src="/images/chess-hero.png" alt="Chess" fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/40 to-slate-950"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

                    {/* Branding over image */}
                    <div className="absolute bottom-16 left-16 right-16 z-10">
                        <Link href="/" className="flex items-center gap-3 mb-10 group">
                            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                <Image src="/images/logo.png" alt="SLCF" width={44} height={44} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white leading-none">SLCF</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">Sierra Leone Chess Federation</span>
                            </div>
                        </Link>

                        <h2 className="text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-4">
                            Elevate your<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">strategic mind</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-md leading-relaxed">
                            Access your rating history, tournament records, and exclusive federation resources.
                        </p>

                        {/* Trust badge */}
                        <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/5">
                            <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="text-[12px] text-slate-500 font-medium leading-snug">
                                FIDE Affiliated Organization<br />
                                <span className="text-slate-600">Secured authentication</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side — Form */}
                <div className="w-[480px] xl:w-[520px] shrink-0 flex flex-col justify-center px-12 xl:px-16 bg-slate-950 relative">
                    {/* Subtle left border glow */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            {mode === 'login' ? 'Welcome back' : 'Create account'}
                        </h1>
                        <p className="text-[15px] text-slate-400">
                            {mode === 'login'
                                ? 'Sign in to continue to your account'
                                : 'Join the Sierra Leone Chess Federation'}
                        </p>
                    </div>

                    {/* Form */}
                    {AuthForm}
                </div>
            </div>
        </div>
    )
}
