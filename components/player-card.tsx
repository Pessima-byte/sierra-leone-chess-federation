import Link from "next/link"
import Image from "next/image"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlayerCardProps {
  id: string
  name: string
  rating: number
  title: string
  image: string
}

export default function PlayerCard({ id, name, rating, title, image }: PlayerCardProps) {
  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10 shadow-lg">
            {title}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h3>
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-xs font-black text-blue-400">{rating}</span>
          </div>
        </div>
        <Link href={`/members/${id}`}>
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}
