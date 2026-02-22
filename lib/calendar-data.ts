export interface CalendarEvent {
    id: string
    title: string
    date: string
    time: string
    location: string
    type: 'Tournament' | 'Training' | 'Meeting' | 'Social'
    prizePool?: string
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Planned' | 'Active'
    organizer: string
    description: string
    image?: string
    registrationOpen: boolean
    level: 'Beginner' | 'Intermediate' | 'Professional' | 'All'
    entryFee?: string
}

export const calendarEvents: CalendarEvent[] = [
    {
        id: "ev-001",
        title: "National Blitz Championship 2025",
        date: "2025-03-15",
        time: "09:00 AM",
        location: "National Stadium Hub, Freetown",
        type: "Tournament",
        prizePool: "SLE 50,000",
        status: "Upcoming",
        organizer: "SLCF",
        description: "The biggest blitz event of the year, featuring 100+ players in a 9-round Swiss format.",
        image: "/images/national-blitz.png",
        registrationOpen: true,
        level: "All",
        entryFee: "SLE 200"
    },
    {
        id: "ev-002",
        title: "GM Meta-Strategy Seminar",
        date: "2025-03-20",
        time: "06:00 PM",
        location: "Zoom Virtual Arena",
        type: "Training",
        status: "Upcoming",
        organizer: "Technical Committee",
        description: "Deep dive into grandmaster concepts and modern opening theory.",
        registrationOpen: true,
        level: "Professional",
        entryFee: "Free for Members"
    },
    {
        id: "ev-003",
        title: "Freetown Schools League",
        date: "2025-04-05",
        time: "10:00 AM",
        location: "Central Library Grand Hall",
        type: "Tournament",
        prizePool: "Equipment & Scholarships",
        status: "Upcoming",
        organizer: "SLCF Education Department",
        description: "Part of our 'Chess in Schools' initiative. Inter-school championship for juniors.",
        registrationOpen: true,
        level: "Beginner"
    },
    {
        id: "ev-004",
        title: "West African Zonal Qualifiers",
        date: "2025-05-12",
        time: "08:00 AM",
        location: "Radisson Blu, Freetown",
        type: "Tournament",
        prizePool: "SLE 150,000 + FIDE Norms",
        status: "Upcoming",
        organizer: "FIDE / SLCF",
        description: "The elite qualifying event for the West African Zonal. Only registered professionals may enter.",
        image: "/images/zonal-qualifiers.png",
        registrationOpen: false,
        level: "Professional",
        entryFee: "SLE 500"
    },
    {
        id: "ev-005",
        title: "Monthly Strategy Workshop",
        date: "2025-03-01",
        time: "05:00 PM",
        location: "Federation HQ",
        type: "Training",
        status: "Upcoming",
        organizer: "Bo Strategic Thinkers",
        description: "Positional play fundamentals and endgame puzzles.",
        registrationOpen: true,
        level: "Intermediate"
    }
]
