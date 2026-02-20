import Image from "next/image"
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
} from "lucide-react"
import ChessBoard from "@/components/chess-board"
import TournamentCalendar from "@/components/tournament-calendar"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/app/actions/auth"
import { getMembers } from "@/lib/queries"
import PlayerMarquee from "@/components/player-marquee"

export const revalidate = 60 // Update every minute

export default async function Home() {
  const [session, allMembers] = await Promise.all([
    getSession(),
    getMembers()
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

  const upcomingEvents = [
    {
      title: "National Championship",
      image: "/images/national-championship.png",
      tag: "Registering",
      tagColor: "bg-green-500/80",
      date: "June 15-20, 2025",
      location: "Freetown City Hall"
    },
    {
      title: "Freetown Open 2025",
      image: "/images/freetown-open-2025.png",
      tag: "Upcoming",
      tagColor: "bg-blue-500/80",
      date: "July 8-10, 2025",
      location: "Freetown, SL"
    },
    {
      title: "Junior Masters Cup",
      image: "/images/junior-masters.png",
      tag: "Junior",
      tagColor: "bg-purple-500/80",
      date: "August 5-7, 2025",
      location: "Bo, Sierra Leone"
    },
    {
      title: "National Blitz Championship",
      image: "/images/national-blitz.png",
      tag: "Blitz",
      tagColor: "bg-rose-500/80",
      date: "October 10-12, 2025",
      location: "Bintumani Hotel, SL"
    },
    {
      title: "Village School Chess Outreach",
      image: "/images/events/village-school-chess.png",
      tag: "Community",
      tagColor: "bg-emerald-500/80",
      date: "July 1-5, 2025",
      location: "Rural Provinces"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]"></div>

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-green-400 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Official Federation Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-gradient-x">
                  Royal Game
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Join the Sierra Leone Chess Federation. elevating minds, fostering
                champions, and building a community of strategic thinkers across
                the nation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/login?mode=register">
                  <Button
                    size="lg"
                    className="bg-white text-slate-950 hover:bg-slate-200 border-0 h-12 px-8 rounded-full text-base font-semibold transition-transform hover:scale-105"
                  >
                    Start Playing
                    <Play className="w-4 h-4 ml-2 fill-current" />
                  </Button>
                </Link>
                <Link href="/calendar?type=Tournament">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 rounded-full text-base border-white/10 hover:bg-white/5 transition-all"
                  >
                    View Tournaments
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-sm text-muted-foreground">
                    Annual Events
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1985</div>
                  <div className="text-sm text-muted-foreground">
                    Established
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:h-[600px] w-full flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Decorative Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl opacity-30"></div>

                {/* Glass Card */}
                <div className="absolute inset-0 z-10 bg-slate-950/50 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="relative h-full w-full rounded-xl overflow-hidden bg-slate-900">
                    <Image
                      src="/images/chess-hero.png"
                      alt="Chess Board"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Next Event
                          </div>
                          <div className="font-semibold text-sm">
                            Freetown Open
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
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

        {/* Features / Mission */}
        <section className="py-24 bg-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-950/20 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Elevating the Game <br />
                  <span className="text-blue-500">Since 1985</span>
                </h2>
                <p className="text-muted-foreground text-lg">
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
                    <li key={i} className="flex items-center gap-3">
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
                      <Image src="/images/player1.png" alt="Player" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-sm font-bold">Community</div>
                        <div className="text-xs text-muted-foreground">Growing together</div>
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
                      <Image src="/images/player2.png" alt="Player" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-sm font-bold">Excellence</div>
                        <div className="text-xs text-muted-foreground">Champions made here</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments Section */}
        <section id="tournaments" className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">Competition</span>
                <h2 className="text-4xl font-bold mt-2">Upcoming Events</h2>
              </div>
              <Link href="/calendar">
                <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                  View All Events <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Infinite Horizontal Scroll / Marquee Layout */}
            <div className="relative w-full overflow-hidden pb-8 -mx-4 px-4 md:mx-0 md:px-0 [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused] group">
                {/* Two identical sets of cards to loop seamlessly */}
                {[0, 1].map((setIndex) => (
                  <div key={setIndex} className="flex gap-6 pr-6" aria-hidden={setIndex === 1}>
                    {upcomingEvents.map((event, i) => (
                      <div
                        key={i}
                        className="w-[300px] md:w-[350px] shrink-0 relative group/card overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transform-gpu"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <div className="h-44 relative overflow-hidden">
                          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover/card:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 ${event.tagColor} backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/10`}>
                              {event.tag}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-white group-hover/card:text-blue-400 transition-colors leading-tight">{event.title}</h3>
                          <div className="space-y-2 text-xs text-muted-foreground mb-6">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> {event.date}</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> {event.location}</div>
                          </div>
                          <Button size="sm" className="w-full h-10 bg-white/5 hover:bg-blue-600 border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Calendar Bar - Horizontal */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground bg-white/[0.02] p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/10 rounded-lg"><Calendar className="w-4 h-4 text-blue-400" /></div>
                <span>Full Event Calendar available for download</span>
              </div>
              <div className="flex gap-4">
                <Button variant="link" className="text-blue-400 p-0 h-auto">Download PDF</Button>
                <div className="w-px h-4 bg-white/10"></div>
                <Button variant="link" className="text-white p-0 h-auto">Subscribe to iCal</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Players */}
        <section id="players" className="py-24 bg-transparent relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Top Players</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the elite players representing Sierra Leone on the global stage.
                Ranked by official FIDE ratings.
              </p>
            </div>

            <div className="relative -mx-4">
              <PlayerMarquee players={topPlayers} />
            </div>
          </div>
        </section>

        {/* Learn / Chess Board Section */}
        {/* Compact Training Grounds Section */}
        <section id="learn" className="py-20 relative overflow-hidden bg-transparent">
          {/* Futuristic background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-40"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

              <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-6 md:p-10 lg:p-12 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-none">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
                      </span>
                      Training Academy
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase italic">
                        Elevate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                          Strategic Mind
                        </span>
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed max-w-md font-medium">
                        Master the royal game with grandmaster insights and professional analysis designed for champions.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all hover:scale-105 active:scale-95 text-xs tracking-widest uppercase">
                        Enter Portal
                      </Button>
                      <Button size="lg" variant="outline" className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs tracking-widest uppercase transition-all">
                        Daily Puzzle
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border border-slate-900 bg-slate-800 overflow-hidden relative">
                            <Image src={`/images/player${i}.png`} alt="User" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                        <span className="text-white">1,240+</span> Thinkers Online
                      </div>
                    </div>
                  </div>

                  <div className="relative group/board">
                    <div className="relative z-10 aspect-square w-full max-w-[450px] mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover/board:scale-[1.02]">
                      <Image
                        src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000"
                        alt="Professional Chess Set"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg">
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Premium Training</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section id="news" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Federation News</h2>
              <Link href="#" className="text-blue-500 hover:text-blue-400 font-medium flex items-center">
                Read All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <NewsCard
                title="Junior Team Claims Victory at West African Zonals"
                date="May 12, 2025"
                category="International"
                image="/images/news1.png"
                excerpt="Our under-18 squad secured 3 gold medals in Accra this weekend, setting a new record."
              />
              <NewsCard
                title="New Grandmaster Coaching Program Announced"
                date="May 08, 2025"
                category="Development"
                image="/images/news2.png"
                excerpt="Special seminars with visiting GM Nigel Short will begin next month for the national team."
              />
              <NewsCard
                title="Chess in Schools Initiative Expands to Bo"
                date="April 25, 2025"
                category="Community"
                image="/images/news3.png"
                excerpt="Over 500 students in the Bo district will receive free chess sets and training materials."
              />
            </div>
          </div>
        </section>

        {/* Contact / Footer CTA */}
        <section id="contact" className="py-24 bg-gradient-to-b from-transparent to-blue-950/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to make your move?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the Sierra Leone Chess Federation today and become part of our growing family of thinkers and champions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login?mode=register">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-white text-black hover:bg-slate-200 font-bold">
                  Become a Member
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-white/10 hover:bg-white/5">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950/20 backdrop-blur-xl border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">SL</div>
                <span className="font-bold text-lg">SLCF</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The official governing body for chess in Sierra Leone. Affiliated with FIDE and the Africa Chess Confederation.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Rankings</Link></li>
                <li><Link href="/calendar" className="hover:text-white transition-colors">Event Calendar</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News Hub</Link></li>
                <li><Link href="/members" className="hover:text-white transition-colors">Membership</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">Learn Chess</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FIDE Laws</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Arbiter's Corner</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Download PGNs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  15 Siaka Stevens St, Freetown
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  info@slchess.org
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-500" />
                  +232 76 123 456
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2025 Sierra Leone Chess Federation. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
