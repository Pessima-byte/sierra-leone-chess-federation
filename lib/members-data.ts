export interface Game {
    id: string
    white: string
    black: string
    result: '1-0' | '0-1' | '1/2-1/2'
    date: string
    event: string
    moves: string
    rating_change?: number
}

export interface Member {
    id: string
    name: string
    title: string
    rating: number
    club: string
    status: 'Active' | 'Inactive'
    joined: string
    image?: string
    bio?: string
    fideId?: string
    recentResults?: {
        event: string
        result: string
        date: string
    }[]
    stats?: {
        wins: number
        draws: number
        losses: number
    }
    games?: Game[]
}

const mockGames: Game[] = [
    {
        id: "g1",
        white: "Ansu Kamara",
        black: "Abubakarr Jalloh",
        result: "1-0",
        date: "2024-01-15",
        event: "National Championship",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7...",
        rating_change: 8.5
    },
    {
        id: "g2",
        white: "Aminata Sesay",
        black: "Ansu Kamara",
        result: "1/2-1/2",
        date: "2024-01-18",
        event: "National Championship",
        moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 c5...",
        rating_change: -1.2
    },
    {
        id: "g3",
        white: "Ansu Kamara",
        black: "Winston Thomas",
        result: "1-0",
        date: "2023-11-20",
        event: "West African Open",
        moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6...",
        rating_change: 5.4
    },
    {
        id: "g4",
        white: "David Koroma",
        black: "Ansu Kamara",
        result: "0-1",
        date: "2023-11-22",
        event: "West African Open",
        moves: "1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 d5 5. cxd5 Nxd5...",
        rating_change: 7.1
    },
    {
        id: "g5",
        white: "Ansu Kamara",
        black: "Ibrahim Turay",
        result: "1-0",
        date: "2023-09-10",
        event: "Freetown Blitz",
        moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 dxe4 5. Nxe4 Be7...",
        rating_change: 3.2
    }
]

export const members: Member[] = [
    {
        id: "SL-001",
        name: "Ansu Kamara",
        title: "FM",
        rating: 2150,
        club: "Freetown Chess Club",
        status: "Active",
        joined: "2015",
        image: "/images/player1.png",
        bio: "Ansu Kamara is a FIDE Master and one of Sierra Leone's most consistent players. He has represented the country in multiple Chess Olympiads.",
        fideId: "12345678",
        recentResults: [
            { event: "National Championship 2024", result: "1st Place", date: "Jan 2024" },
            { event: "West African Open", result: "3rd Place", date: "Nov 2023" },
            { event: "Freetown Blitz", result: "1st Place", date: "Sept 2023" },
        ],
        stats: { wins: 450, draws: 120, losses: 80 },
        games: mockGames
    },
    {
        id: "SL-002",
        name: "Aminata Sesay",
        title: "WFM",
        rating: 1950,
        club: "Central University Chess Club",
        status: "Active",
        joined: "2018",
        image: "/images/player2.png",
        bio: "Aminata Sesay is a leading figure in women's chess in Sierra Leone. She is known for her aggressive tactical style and exceptional endgame technique.",
        fideId: "87654321",
        recentResults: [
            { event: "Women's National Championship", result: "1st Place", date: "Feb 2024" },
            { event: "African Women's Zonal", result: "5th Place", date: "Dec 2023" },
            { event: "University Cup", result: "1st Place", date: "Oct 2023" },
        ],
        stats: { wins: 320, draws: 95, losses: 110 },
        games: [mockGames[1]]
    },
    {
        id: "SL-003",
        name: "Abubakarr Jalloh",
        title: "CM",
        rating: 2050,
        club: "Bo Strategic Thinkers",
        status: "Active",
        joined: "2016",
        image: "/images/player3.png",
        bio: "Abubakarr Jalloh, a Candidate Master from Bo, is famous for his deep opening preparations and positional understanding.",
        fideId: "23456789",
        recentResults: [
            { event: "Regional Masters Bo", result: "1st Place", date: "Mar 2024" },
            { event: "National Blitz", result: "2nd Place", date: "Jan 2024" },
            { event: "Sierra Leone Open", result: "4th Place", date: "Dec 2023" },
        ],
        stats: { wins: 380, draws: 150, losses: 90 },
        games: [mockGames[0]]
    },
    {
        id: "SL-004",
        name: "Winston Thomas",
        title: "WCM",
        rating: 1850,
        club: "Makeni Elite Chess",
        status: "Active",
        joined: "2019",
        image: "/images/player4.png",
        bio: "Winston Thomas has rapidly risen through the ranks, showing great promise in international youth competitions.",
        fideId: "98765432",
        recentResults: [
            { event: "Youth Invitational", result: "1st Place", date: "Apr 2024" },
            { event: "Northern Province Open", result: "2nd Place", date: "Feb 2024" },
            { event: "Junior Nationals", result: "1st Place", date: "Jan 2024" },
        ],
        stats: { wins: 210, draws: 60, losses: 75 },
        games: [mockGames[2]]
    },
    {
        id: "SL-005",
        name: "Mariatu Bangura",
        title: "Candidate",
        rating: 1720,
        club: "Freetown Chess Club",
        status: "Active",
        joined: "2021",
        bio: "Mariatu Bangura is one of the rising stars from the Chess in Schools initiative.",
        stats: { wins: 120, draws: 40, losses: 65 }
    },
    {
        id: "SL-006",
        name: "David Koroma",
        title: "None",
        rating: 1650,
        club: "Kenema Chess Warriors",
        status: "Inactive",
        joined: "2020",
        bio: "David Koroma is a strong club player currently taking a break from competitive chess.",
        stats: { wins: 180, draws: 55, losses: 120 },
        games: [mockGames[3]]
    },
    {
        id: "SL-007",
        name: "Fatmata Mansaray",
        title: "None",
        rating: 1580,
        club: "Freetown Chess Club",
        status: "Active",
        joined: "2022",
        bio: "Fatmata Mansaray is an enthusiastic member and regular participant in weekend rapid tournaments.",
        stats: { wins: 95, draws: 30, losses: 85 }
    },
    {
        id: "SL-008",
        name: "Ibrahim Turay",
        title: "None",
        rating: 1910,
        club: "Kono Diamonds",
        status: "Active",
        joined: "2017",
        bio: "Ibrahim Turay is known as the 'Diamond of the East' for his sparkling tactical combinations.",
        stats: { wins: 290, draws: 80, losses: 110 },
        games: [mockGames[4]]
    },
]
