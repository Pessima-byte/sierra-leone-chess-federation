import Image from "next/image"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsCardProps {
  title: string
  date: string
  category: string
  image: string
  excerpt: string
}

export default function NewsCard({ title, date, category, image, excerpt }: NewsCardProps) {
  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10 shadow-lg">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-blue-400/80 text-xs font-medium mb-3 tracking-wide">
          <Calendar className="h-3.5 w-3.5 mr-2" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <Button
          variant="outline"
          className="w-full h-11 rounded-xl border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-sm font-semibold transition-all duration-300"
        >
          Read Full Story
        </Button>
      </div>
    </div>
  )
}
