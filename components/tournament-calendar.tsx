"use client"

import { useState, useEffect } from "react"
import { MapPin, Trophy, ChevronRight, Filter, Clock, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Sample tournament data
const tournaments = [
  {
    id: 1,
    name: "National Championship",
    date: "June 15-20, 2025",
    location: "Freetown, Sierra Leone",
    type: "local",
    category: "open",
    description: "The annual national chess championship to determine the best players in Sierra Leone.",
    registrationLink: "#",
  },
  {
    id: 2,
    name: "Freetown Open",
    date: "July 8-10, 2025",
    location: "Freetown, Sierra Leone",
    type: "local",
    category: "open",
    description: "An open tournament for all chess enthusiasts in the capital city of Freetown.",
    registrationLink: "#",
  },
  {
    id: 3,
    name: "Junior Championship",
    date: "August 5-7, 2025",
    location: "Bo, Sierra Leone",
    type: "local",
    category: "junior",
    description: "A tournament for young chess players under 18 to showcase their talents.",
    registrationLink: "#",
  },
  {
    id: 4,
    name: "West African Chess Championship",
    date: "September 12-18, 2025",
    location: "Accra, Ghana",
    type: "international",
    category: "open",
    description: "Regional championship featuring players from West African countries.",
    registrationLink: "#",
  },
  {
    id: 5,
    name: "Women's National Championship",
    date: "October 3-5, 2025",
    location: "Freetown, Sierra Leone",
    type: "local",
    category: "women",
    description: "The annual national chess championship for women players.",
    registrationLink: "#",
  },
]

export default function TournamentCalendar() {
  const [filter, setFilter] = useState("all")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true)
  }, [])

  const filteredTournaments = tournaments.filter((tournament) => {
    if (filter === "all") return true
    if (filter === "local" || filter === "international") return tournament.type === filter
    return tournament.category === filter
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0"></div>
      <div className="absolute top-1/4 -left-4 w-8 h-8 border border-blue-500/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-4 w-8 h-8 border border-green-500/20 rounded-full animate-pulse-slow"></div>

      {/* Chess piece silhouettes */}
      <div className="absolute -top-10 right-10 w-20 h-20 opacity-5">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L8 6H16L12 2Z" />
          <path d="M8 6V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V6H8Z" />
          <path d="M6 22H18V20C18 17.7909 16.2091 16 14 16H10C7.79086 16 6 17.7909 6 20V22Z" />
        </svg>
      </div>
      <div className="absolute -bottom-10 left-10 w-20 h-20 opacity-5">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C10.3431 2 9 3.34315 9 5C9 5.74127 9.29324 6.38924 9.76 6.83C8.15 7.28 7 8.75 7 10.5C7 11.3789 7.28 12.1788 7.74 12.83C6.73 13.63 6 14.74 6 16C6 17.93 7.5 19.59 9.5 19.92V20H8V22H16V20H14.5V19.92C16.5 19.59 18 17.93 18 16C18 14.74 17.27 13.63 16.26 12.83C16.72 12.1788 17 11.3789 17 10.5C17 8.75 15.85 7.28 14.24 6.83C14.71 6.39 15 5.74 15 5C15 3.34315 13.6569 2 12 2Z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="space-y-8 py-2">
        {/* Filter section with futuristic styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-slate-900/20 to-green-900/20 rounded-xl blur-sm"></div>
          <div className="relative bg-slate-900/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-4">
            <div className="flex items-center gap-2 mb-3 text-blue-300">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter Tournaments</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All" },
                { id: "local", label: "Local" },
                { id: "international", label: "International" },
                { id: "junior", label: "Junior" },
                { id: "women", label: "Women" },
              ].map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(option.id)}
                  className={`relative group overflow-hidden ${filter === option.id
                    ? "bg-gradient-to-r from-blue-600/80 to-green-600/80 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:text-white"
                    } rounded-full border border-slate-700/50 transition-all duration-300`}
                >
                  <span className="relative z-10">{option.label}</span>
                  {filter !== option.id && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 transition-all duration-300 group-hover:w-4/5 group-hover:opacity-100"></span>
                  )}
                  {filter === option.id && (
                    <span className="absolute inset-0 bg-[url('/images/krio-pattern.png')] opacity-5 mix-blend-overlay"></span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament cards with futuristic styling */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
        >
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              variants={itemVariants}
              className={`relative group overflow-hidden transition-all duration-500 ${activeIndex === index ? "scale-[1.02]" : ""
                }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Animated border glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 blur-xl"></div>

              <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 transition-all duration-300 group-hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)]">
                {/* Status Badge */}
                <div className="absolute top-0 right-0">
                  <div
                    className={`
                    ${tournament.type === "international" ? "bg-blue-600/90" : "bg-green-600/90"} 
                    backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-[0.2em] border-b border-l border-white/10
                  `}
                  >
                    {tournament.type}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {/* Left side with icon */}
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16">
                      <div
                        className={`absolute inset-0 ${tournament.type === "international" ? "bg-blue-500" : "bg-green-500"} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`relative h-full w-full flex items-center justify-center ${tournament.type === "international" ? "bg-blue-600/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)]" : "bg-green-600/20 shadow-[inset_0_0_20px_rgba(34,197,94,0.3)]"} border border-white/10 rounded-2xl`}
                      >
                        {tournament.category === "women" ? (
                          <Users className="h-7 w-7 text-white" />
                        ) : tournament.category === "junior" ? (
                          <Award className="h-7 w-7 text-white" />
                        ) : (
                          <Trophy className="h-7 w-7 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle content */}
                  <div className="flex-grow space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                        {tournament.name}
                      </h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase tracking-widest text-blue-400">
                          {tournament.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-blue-500" />
                        {tournament.location}
                      </div>
                      <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <Clock className="h-3.5 w-3.5 mr-2 text-cyan-400" />
                        {tournament.date}
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{tournament.description}</p>
                  </div>

                  {/* Right side with button */}
                  <div className="flex-shrink-0">
                    <Button asChild className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 border-0 transition-all active:scale-95">
                      <a href={tournament.registrationLink}>
                        Register
                        <ChevronRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results message */}
        {filteredTournaments.length === 0 && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 text-center">
            <div className="text-slate-300 mb-2">No tournaments found</div>
            <Button variant="outline" size="sm" onClick={() => setFilter("all")}>
              Show All Tournaments
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
