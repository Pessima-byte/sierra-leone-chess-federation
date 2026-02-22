import Image from "next/image"
// Trigger re-compile: 2026-02-21T21:51
import Link from "next/link"
import {
  ChevronRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Trophy,
  Users,
  BookOpen,
  Newspaper,
  Menu,
  X,
  ArrowRight,
  Play,
  Star,
  Zap,
  Target,
  GraduationCap,
} from "lucide-react"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { getSession } from "@/app/actions/auth"
import { getMembers, getEvents, getHomeStats, getNews } from "@/lib/queries"
import PlayerMarquee from "@/components/player-marquee"
import EventMarqueeMobile from "@/components/event-marquee-mobile"
import NewsMobileScroller from "@/components/news-mobile-scroller"

export const revalidate = 60

export default async function Home() {
  const [session, allMembers, allEvents, homeStats, allNews] = await Promise.all([
    getSession(),
    getMembers(),
    getEvents(),
    getHomeStats(),
    getNews()
  ])

  const topPlayers = allMembers
    .filter(m => m.image && m.image.trim() !== "")
    .map(m => ({
      id: m.id,
      name: m.name,
      title: m.title,
      rating: m.rating,
      club: m.club,
      image: m.image as string,
      wins: m.wins,
      draws: m.draws,
      losses: m.losses,
    }))

  const upcomingEvents = allEvents.slice(0, 5).map(e => ({
    title: e.title,
    image: e.image || "/images/national-blitz.png",
    tag: e.status,
    tagColor: e.status === 'Ongoing' ? 'bg-green-500/80' : 'bg-blue-500/80',
    date: e.date,
    location: e.location
  }))

  // Fallback for empty events
  if (upcomingEvents.length === 0) {
    upcomingEvents.push({
      title: "Upcoming Tournament",
      image: "/images/national-championship.png",
      tag: "Planned",
      tagColor: "bg-slate-500/80",
      date: "TBA",
      location: "Freetown, SL"
    })
  }


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      <main>
        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

          {/* MOBILE BACKGROUND (Showing more landscape width) */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-[80vh] z-0 bg-slate-950 overflow-hidden">
            <Image
              src="/images/chess-hero.png"
              alt="Sierra Leone Chess"
              fill
              priority
              className="object-cover opacity-60 scale-105"
            />
            {/* Tech grid overlay for mobile */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            {/* Deep vertical fade into the content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950"></div>
          </div>

          {/* DESKTOP BACKGROUND (Clean Radial + Grid) */}
          <div className="hidden md:block absolute inset-0 z-0 transform-gpu">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]"></div>
            <div className="hidden lg:block absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] animate-pulse-slow transform-gpu"></div>
            <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000 transform-gpu"></div>
          </div>

          <div className="container relative z-10 mx-auto px-5 md:px-4 flex flex-col justify-end md:justify-center min-h-[90vh] md:min-h-screen md:grid md:grid-cols-2 md:gap-12 md:items-center pb-12 md:pb-0">
            <div className="space-y-6 md:space-y-8 flex flex-col items-center text-center md:items-start md:text-left w-full group">
              <h1 className="text-[2.5rem] md:text-7xl leading-[1] md:leading-[1.1] font-black md:font-bold tracking-tighter md:tracking-tight">
                Ignite Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  Strategic Genius
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/60 md:text-muted-foreground max-w-xl leading-relaxed">
                Elevating minds, fostering champions, and building a community of strategic thinkers across Sierra Leone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:pt-4">
                <Link href="/login?mode=register" className="group relative w-full sm:w-auto h-14 md:h-12 px-10 rounded-2xl md:rounded-full bg-gradient-to-br from-white to-slate-200 text-slate-950 text-base font-black md:font-bold inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                  Join the Arena
                  <Play className="w-4 h-4 fill-current group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <Link href="/calendar?type=Tournament" className="group w-full sm:w-auto h-14 md:h-12 px-10 rounded-2xl md:rounded-full text-base font-bold bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 text-white inline-flex items-center justify-center transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Tournament Portal
                </Link>
              </div>

              {/* Desktop Stats (original style) */}
              <div className="hidden md:flex items-center gap-8 pt-8 border-t border-white/5">
                {[
                  { value: `${homeStats.memberCount}+`, label: "Active Members" },
                  { value: `${homeStats.eventCount}+`, label: "Annual Events" },
                  { value: "1985", label: "Established" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Mobile Stats (compact pills) */}
              <div className="md:hidden flex flex-wrap justify-center gap-2 pt-2">
                {[
                  { value: `${homeStats.memberCount}+`, label: "Members" },
                  { value: `${homeStats.eventCount}+`, label: "Events" },
                  { value: "1985", label: "Est." },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[13px] font-bold text-white">{stat.value}</span>
                    <span className="text-[10px] text-white/40">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP VISUAL (The card Split Layout) */}
            <div className="hidden md:flex relative lg:h-[600px] w-full items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl opacity-30"></div>

                <div className="absolute inset-0 z-10 bg-slate-950/80 rounded-[2rem] border border-white/10 p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="relative h-full w-full rounded-xl overflow-hidden bg-slate-900">
                    <Image src="/images/chess-hero.png" alt="Chess" fill sizes="50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-white/10">
                        <div>
                          <div className="text-xs text-muted-foreground">Next Event</div>
                          <div className="font-semibold text-sm text-white">{upcomingEvents[0]?.title || "National Championship"}</div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 z-20 p-4 bg-slate-900 rounded-2xl border border-white/10 shadow-xl animate-float">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="absolute -bottom-6 -left-6 z-20 p-4 bg-slate-900 rounded-2xl border border-white/10 shadow-xl animate-float delay-700">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FEATURES / MISSION SECTION
        ═══════════════════════════════════════════════════ */}
        <section className="py-12 md:py-24 bg-transparent relative overflow-hidden">
          {/* Mobile-Only Background Decor */}
          <div className="md:hidden absolute inset-0 z-0">
            <div className="absolute top-1/4 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full blur-[60px]"></div>
          </div>

          <div className="container mx-auto px-5 md:px-4 relative z-10">
            {/* Desktop Layout (Satisfied previous design) */}
            <div className="hidden md:flex gap-16 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-5xl font-bold">
                  Elevating the Game <br />
                  <span className="text-blue-500">Since 1985</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We are dedicated to promoting chess excellence in Sierra Leone.
                  From grassroots camps to national championships, we foster an environment
                  where strategy meets opportunity.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "National Rating System Implementation",
                    "Youth Development Programs",
                    "International FIDE Representation",
                    "Women in Chess Initiative"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-8">
                    <div className="aspect-[4/5] bg-slate-900 rounded-2xl border border-white/5 overflow-hidden relative group">
                      <Image src="/images/player1.png" alt="P1" fill sizes="25vw" className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-bold">Community</div>
                        <div className="text-xs text-white/50">Growing together</div>
                      </div>
                    </div>
                    <div className="aspect-square bg-blue-900/10 rounded-2xl border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                      <Users className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square bg-green-900/10 rounded-2xl border border-green-500/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                      <Trophy className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="aspect-[4/5] bg-slate-900 rounded-2xl border border-white/5 overflow-hidden relative group">
                      <Image src="/images/player2.png" alt="P2" fill sizes="25vw" className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-bold">Excellence</div>
                        <div className="text-xs text-white/50">Champions made here</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden space-y-12 pb-4">
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <span className="text-green-400 font-black tracking-[0.2em] text-[9px] uppercase">Sierra Leone's Pride</span>
                  <div className="h-[2px] w-8 bg-gradient-to-l from-green-500 to-transparent rounded-full"></div>
                </div>
                <h2 className="text-[2.25rem] font-black tracking-tighter leading-[1.1] mb-4 text-white">
                  Shaping the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-green-400">Future of Strategy</span>
                </h2>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-4">
                <div className="col-span-2 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-[2.5rem] p-8 relative overflow-hidden group animate-shine">
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                      <Target className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-black text-2xl text-white tracking-tight">National Ratings</h3>
                      <p className="text-sm text-white/50 leading-relaxed max-w-[240px]">FIDE-integrated ranking system for our professional community.</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-black text-sm text-white tracking-tight leading-snug">Youth Outreach</h3>
                  </div>
                </div>

                <div className="col-span-1 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group">
                  <div className="relative z-10 space-y-4 text-right flex flex-col items-end">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="font-black text-sm text-white tracking-tight leading-snug">FIDE Affiliation</h3>
                  </div>
                </div>

                <div className="col-span-2 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-transparent border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-black text-lg text-white tracking-tight">Women in Chess</h3>
                    <p className="text-xs text-white/40">Empowering future champions</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                    <Star className="w-6 h-6 text-rose-400 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 p-1.5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                {[
                  { label: "Partner", val: "FIDE" },
                  { label: "Tournaments", val: "40+" },
                  { label: "Members", val: "500+" }
                ].map((stat, i) => (
                  <div key={i} className="flex-1 py-4 px-2 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-xs font-black text-white">{stat.val}</div>
                    <div className="text-[9px] text-white/30 uppercase font-black tracking-tighter mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TOURNAMENTS SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="tournaments" className="py-12 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-5 md:px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-8 mb-12 sm:mb-20 relative">
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-blue-500/20 md:hidden"></div>
                  <div className="flex h-6 px-3 items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Arena</span>
                  </div>
                  <div className="h-px w-8 bg-blue-500/20"></div>
                  <span className="text-white/20 font-mono text-[10px] tracking-tighter">COORD: ST_4.2</span>
                </div>

                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                  Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-blue-500/40">Events</span>
                </h2>
              </div>

              <Link href="/calendar" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors"></div>
                <span className="text-xs font-black text-white uppercase tracking-widest">Discover All</span>
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-slate-950 transition-all duration-500">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </div>

            {/* Mobile (Stacked + Horizontal) */}
            <div className="md:hidden space-y-6">
              {/* Featured Event (Large with Glow) */}
              <div className="relative group overflow-visible">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl animate-shine">
                  <Image src={upcomingEvents[0].image} alt="Featured" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  {/* Glass Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-morphism border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Featured Event</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white leading-[1.1] mb-3 drop-shadow-lg">{upcomingEvents[0].title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> {upcomingEvents[0].date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" /> {upcomingEvents[0].location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Browse More Label */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Next in Line</span>
                <div className="h-[1px] flex-1 mx-4 bg-white/10"></div>
              </div>

              {/* Horizontal Scroll with Slide-in Animation */}
              <EventMarqueeMobile events={upcomingEvents.slice(1)} />
            </div>

            {/* Desktop (Infinite Marquee) */}
            <div className="hidden md:block relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused] group">
                {[0, 1].map((setIndex) => (
                  <div key={setIndex} className="flex gap-6 pr-6" aria-hidden={setIndex === 1}>
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="w-[350px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 hover:border-blue-500/30 transition-colors duration-500">
                        <div className="h-44 relative overflow-hidden">
                          <Image src={event.image} alt={event.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 ${event.tagColor} text-white text-[10px] font-bold rounded-full uppercase tracking-widest`}>{event.tag}</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-white leading-tight">{event.title}</h3>
                          <div className="space-y-2 text-xs text-muted-foreground mb-6">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> {event.date}</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> {event.location}</div>
                          </div>
                          <Link href="#" className="w-full h-10 bg-white/5 hover:bg-blue-600 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl inline-flex items-center justify-center transition-colors">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TOP PLAYERS SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="players" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
          {/* Section Glow Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full -z-10 opacity-50 pointer-events-none" />

          <div className="container mx-auto px-5 md:px-4">
            <div className="text-center mb-16 md:mb-24 space-y-6">
              {/* Badge Decor */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">National Rankings</span>
              </div>

              {/* Multi-layered Title */}
              <div className="relative">
                <h2 className="text-[2.5rem] md:text-7xl font-black text-white tracking-tighter leading-none md:leading-[0.9] uppercase italic">
                  Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">Minds</span>
                </h2>
                {/* Accent Line */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
              </div>

              {/* Subtitle */}
              <p className="text-white/40 max-w-xl mx-auto text-sm md:text-lg leading-relaxed font-medium pt-4">
                Powered by official <span className="text-white">FIDE</span> intelligence.
                Meet the players shaping the strategic future of Sierra Leone.
              </p>
            </div>
            <div className="relative -mx-5 md:-mx-4">
              <PlayerMarquee players={topPlayers} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TRAINING SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="learn" className="py-10 md:py-16 relative overflow-hidden">
          <div className="container mx-auto px-5 md:px-4 relative z-10">

            {/* Mobile (Immersive Image Card) */}
            <div className="md:hidden relative rounded-2xl overflow-hidden border border-white/10 aspect-video p-5 flex flex-col justify-end">
              <Image src="/images/training-board.png" alt="Learn" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase border border-blue-500/30">
                  <Zap className="w-3 h-3" /> Training Academy
                </div>
                <h3 className="text-2xl font-black uppercase italic text-white leading-none">Elevate Your <span className="text-blue-400">Mind</span></h3>
                <div className="flex gap-2">
                  <Link href="#" className="flex-1 h-10 rounded-xl bg-blue-600 text-white font-bold text-[11px] uppercase inline-flex items-center justify-center">Enter Portal</Link>
                  <Link href="#" className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-[11px] uppercase inline-flex items-center justify-center">Puzzles</Link>
                </div>
              </div>
            </div>

            {/* Desktop (Bento split) */}
            <div className="hidden md:block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-[2rem] blur opacity-20 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 rounded-[2rem] border border-white/10 p-10 lg:p-12 overflow-hidden">
                <div className="grid grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      Training Academy
                    </div>
                    <h2 className="text-5xl font-black uppercase italic leading-none text-white transition-all">
                      Elevate Your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Strategic Mind</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-md">Master critical thinking with GM-led insights and professional analysis.</p>
                    <div className="flex gap-4">
                      <Button className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold uppercase text-[11px] tracking-widest">Portal Access</Button>
                      <Button variant="outline" className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-bold uppercase text-[11px] tracking-widest">Daily Puzzles</Button>
                    </div>
                  </div>
                  <div className="aspect-[16/10] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image src="/images/training-board.png" alt="Training" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            NEWS SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="news" className="py-12 md:py-24">
          <div className="container mx-auto px-5 md:px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-1">
                <span className="text-rose-400 font-bold tracking-widest text-[10px] uppercase italic">The Feed</span>
                <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                  Federation <br className="md:hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">News</span>
                </h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black text-[10px] uppercase tracking-widest bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10 transition-all hover:bg-blue-500/10">
                Read All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {allNews.slice(0, 3).map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  date={article.date}
                  category={article.category}
                  image={article.image}
                  excerpt={article.excerpt}
                />
              ))}
            </div>

            {/* Mobile View (Snap Scroller) */}
            <div className="md:hidden">
              <NewsMobileScroller articles={allNews.slice(0, 3)} />
            </div>

            {allNews.length === 0 && (
              <div className="py-12 text-center text-white/40 border border-white/5 rounded-2xl">
                No news articles found.
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════ */}
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-6 md:px-4 relative z-10 text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest mx-auto">
                <Target className="w-3 h-3" /> Join the Mission
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
                Ready to make <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-500">your move?</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-xl max-w-xl mx-auto leading-relaxed">
                Join the official body for chess in Sierra Leone and grow with a national family of thinkers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
              <Link href="/login?mode=register" className="group relative w-full sm:w-auto h-16 sm:h-auto overflow-hidden rounded-2xl bg-white text-black px-10 py-5 transition-all active:scale-95">
                <div className="relative z-10 flex items-center justify-center gap-3 font-black text-[12px] uppercase tracking-widest">
                  Become a Member <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="#" className="w-full sm:w-auto h-16 sm:h-auto rounded-2xl border border-white/10 bg-white/5 text-white px-10 py-5 transition-all hover:bg-white/10 active:scale-95">
                <div className="flex items-center justify-center gap-3 font-black text-[12px] uppercase tracking-widest">
                  Contact Support <Mail className="w-4 h-4" />
                </div>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap justify-center gap-8 md:gap-12 opacity-30 grayscale contrast-125">
              <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-white">
                <Star className="w-3 h-3" /> FIDE Affiliated
              </div>
              <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-white">
                <Star className="w-3 h-3" /> National Body
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 border-t border-white/5 pt-6 md:pt-24 pb-4 md:pb-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-4 relative z-10">
          {/* Mobile Dashboard: High-Density & Impressive */}
          <div className="md:hidden space-y-5 mb-5">
            {/* Header: Identity & Status */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 border border-white/10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                  SL
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                  <p className="text-[8px] font-black text-blue-400/80 uppercase tracking-[0.2em] mt-1">National Authority</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                <Zap className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active</span>
              </div>
            </div>

            {/* Navigation Matrix */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Discovery</span>
                  <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  {['About', 'Rankings', 'News'].map(item => (
                    <Link key={item} href="#" className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                  ))}
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Academy</span>
                  <Star className="w-3 h-3 text-white/10 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  {['Learn', 'FIDE', 'Hub'].map(item => (
                    <Link key={item} href="#" className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Contact Strip */}
            <div className="flex flex-col gap-1.5 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40"></div>
                <p className="text-[10px] font-bold text-slate-400">15 Siaka Stevens St, Freetown</p>
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                <p className="text-[10px] font-bold text-slate-400">info@slchess.org</p>
              </div>
            </div>
          </div>

          {/* Desktop Layout: Unchanged spacing but refined visual */}
          <div className="hidden md:grid grid-cols-12 gap-8 mb-20">
            {/* Brand Intro */}
            <div className="md:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-2xl">
                    SL
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-2xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mt-1 italic">National Authority</p>
                </div>
              </div>

              <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
                The supreme governing body for chess in high strategy.
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Discovery</h4>
                  <div className="w-6 h-0.5 bg-blue-500"></div>
                </div>
                <ul className="grid grid-cols-1 gap-y-4">
                  {['About Us', 'Rankings', 'Events', 'News'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Academy</h4>
                  <div className="w-6 h-0.5 bg-emerald-500"></div>
                </div>
                <ul className="grid grid-cols-1 gap-y-4">
                  {['Learn', 'FIDE Laws', 'Hub'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 space-y-8">
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/40 italic">Connect</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-3.5 h-3.5 text-rose-500/60" />
                  <p className="text-xs font-bold text-slate-400">Siaka Stevens St, Freetown</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-3.5 h-3.5 text-blue-500/60" />
                  <p className="text-xs font-bold text-slate-400">info@slchess.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Credits & Legal */}
          <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4">
              <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse hidden md:block" />
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest text-center">
                © 2025 <span className="text-slate-400">Sierra Leone Chess Federation</span>
              </p>
            </div>

            <div className="flex gap-6">
              <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Privacy</Link>
              <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
