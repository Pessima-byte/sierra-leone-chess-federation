import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Clearing existing data...')
    await prisma.game.deleteMany()
    await prisma.member.deleteMany()
    await prisma.calendarEvent.deleteMany()
    await prisma.newsArticle.deleteMany()
    await prisma.user.deleteMany()

    console.log('Seeding members...')
    const membersData = [
        { id: "SL-001", name: "Ansu Kamara", title: "FM", rating: 2150, club: "Freetown Chess Club", status: "Active", joined: "2015", image: "/images/player1.png", bio: "Ansu Kamara is a FIDE Master and one of Sierra Leone's most consistent players.", fideId: "12345678", wins: 450, draws: 120, losses: 80 },
        { id: "SL-002", name: "Aminata Sesay", title: "WFM", rating: 1950, club: "Central University Chess Club", status: "Active", joined: "2018", image: "/images/player2.png", bio: "Aminata Sesay is a leading figure in women's chess in Sierra Leone.", fideId: "87654321", wins: 320, draws: 95, losses: 110 },
        { id: "SL-003", name: "Abubakarr Jalloh", title: "CM", rating: 2050, club: "Bo Strategic Thinkers", status: "Active", joined: "2016", image: "/images/player3.png", bio: "Abubakarr Jalloh, a Candidate Master from Bo, is famous for deep opening preparations.", fideId: "23456789", wins: 380, draws: 150, losses: 90 },
        { id: "SL-004", name: "Winston Thomas", title: "WCM", rating: 1850, club: "Makeni Elite Chess", status: "Active", joined: "2019", image: "/images/player4.png", bio: "Winston Thomas has rapidly risen through the ranks.", fideId: "98765432", wins: 210, draws: 60, losses: 75 },
        { id: "SL-005", name: "Mariatu Bangura", title: "Candidate", rating: 1720, club: "Freetown Chess Club", status: "Active", joined: "2021", bio: "Mariatu Bangura is one of the rising stars from the Chess in Schools initiative.", wins: 120, draws: 40, losses: 65 },
        { id: "SL-006", name: "David Koroma", title: "None", rating: 1650, club: "Kenema Chess Warriors", status: "Inactive", joined: "2020", bio: "David Koroma is a strong club player taking a break.", wins: 180, draws: 55, losses: 120 },
        { id: "SL-007", name: "Fatmata Mansaray", title: "None", rating: 1580, club: "Freetown Chess Club", status: "Active", joined: "2022", bio: "Fatmata Mansaray is an enthusiastic member.", wins: 95, draws: 30, losses: 85 },
        { id: "SL-008", name: "Ibrahim Turay", title: "None", rating: 1910, club: "Kono Diamonds", status: "Active", joined: "2017", bio: "Ibrahim Turay is known as the 'Diamond of the East'.", wins: 290, draws: 80, losses: 110 }
    ]

    for (const member of membersData) {
        await prisma.member.create({ data: member })
    }

    console.log('Seeding games...')
    const gamesData = [
        { whiteId: "SL-001", blackId: "SL-003", result: "1-0", date: "2024-01-15", event: "National Championship", moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7...", ratingChange: 8.5 },
        { whiteId: "SL-002", blackId: "SL-001", result: "1/2-1/2", date: "2024-01-18", event: "National Championship", moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 c5...", ratingChange: -1.2 },
        { whiteId: "SL-001", blackId: "SL-004", result: "1-0", date: "2023-11-20", event: "West African Open", moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6...", ratingChange: 5.4 },
        { whiteId: "SL-006", blackId: "SL-001", result: "0-1", date: "2023-11-22", event: "West African Open", moves: "1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 d5 5. cxd5 Nxd5...", ratingChange: 7.1 },
        { whiteId: "SL-001", blackId: "SL-008", result: "1-0", date: "2023-09-10", event: "Freetown Blitz", moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 dxe4 5. Nxe4 Be7...", ratingChange: 3.2 }
    ]

    for (const game of gamesData) {
        await prisma.game.create({ data: game })
    }

    console.log('Seeding events...')
    const eventsData = [
        { id: "ev-001", title: "National Blitz Championship 2025", date: "2025-03-15", time: "09:00 AM", location: "National Stadium Hub, Freetown", type: "Tournament", prizePool: "SLE 50,000", status: "Upcoming", organizer: "SLCF", description: "The biggest blitz event of the year.", image: "/images/national-blitz.png", registrationOpen: true, level: "All", entryFee: "SLE 200" },
        { id: "ev-002", title: "GM Meta-Strategy Seminar", date: "2025-03-20", time: "06:00 PM", location: "Zoom Virtual Arena", type: "Training", status: "Upcoming", organizer: "Technical Committee", description: "Deep dive into grandmaster concepts.", image: "/images/chess-seminar.png", registrationOpen: true, level: "Professional", entryFee: "Free for Members" },
        { id: "ev-004", title: "West African Zonal Qualifiers", date: "2025-05-12", time: "08:00 AM", location: "Radisson Blu, Freetown", type: "Tournament", prizePool: "SLE 150,000 + FIDE Norms", status: "Upcoming", organizer: "FIDE / SLCF", description: "The elite qualifying event for the West African Zonal.", image: "/images/zonal-qualifiers.png", registrationOpen: false, level: "Professional", entryFee: "SLE 500" }
    ]

    for (const event of eventsData) {
        await prisma.calendarEvent.create({ data: event })
    }

    console.log('Seeding news...')
    const newsData = [
        {
            id: 'n1',
            title: 'Junior Team Claims Victory at West African Zonals',
            excerpt: 'Our under-18 squad secured 3 gold medals in Accra this weekend, setting a new record.',
            content: 'The Sierra Leone national junior team has achieved an unprecedented victory at the West African Zonal Championships held in Accra, Ghana. The team, coached by CM Abubakarr Jalloh, dominated the rapid and blitz categories, showcasing the immense potential of Sierra Leonean youth in international competition.',
            date: 'May 12, 2025',
            author: 'Technical Committee',
            category: 'INTERNATIONAL',
            image: '/images/news1.png',
            readTime: '4 min read',
            tags: 'Youth,International,Victory',
            featured: true
        },
        {
            id: 'n2',
            title: 'New Grandmaster Coaching Program Announced',
            excerpt: 'Special seminars with visiting GM Nigel Short will begin next month for the national team.',
            content: 'The Sierra Leone Chess Federation is proud to announce the launch of a revolutionary Grandmaster Coaching Program. We are honored to welcome legendary GM Nigel Short, who will lead a series of intensive seminars designed to prepare our players for the upcoming Olympiad.',
            date: 'May 08, 2025',
            author: 'External Affairs',
            category: 'DEVELOPMENT',
            image: '/images/news2.png',
            readTime: '5 min read',
            tags: 'Coaching,Grandmaster,Training',
            featured: false
        },
        {
            id: 'n3',
            title: 'Chess in Schools Initiative Expands to Bo',
            excerpt: 'Over 500 students in the Bo district will receive free chess sets and training materials.',
            content: 'The Chess in Schools initiative continues its successful journey across the provinces. Bo City recently hosted the regional launch event where over 500 students from various schools received their first chess sets and began their journey into the world of strategy.',
            date: 'April 25, 2025',
            author: 'Education Dept',
            category: 'COMMUNITY',
            image: '/images/news3.png',
            readTime: '3 min read',
            tags: 'Education,Bo,Youth',
            featured: false
        }
    ]

    for (const article of newsData) {
        await prisma.newsArticle.create({ data: article })
    }

    console.log('Seeding user...')
    // Note: In seed script, we can't easily import from lib if ts-node config is strict,
    // but let's try to do a simple hash here or import.
    // For simplicity in this environment, I'll use a hardcoded hash for "password123" if the import fails
    // or just reimplement the hash logic here to avoid module issues during seed.

    const { scrypt, randomBytes } = await import('node:crypto');
    const { promisify } = await import('node:util');
    const scryptAsync = promisify(scrypt);

    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync("password123", salt, 64)) as Buffer;
    const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;

    await prisma.user.create({
        data: {
            email: "admin@slchess.org",
            password: hashedPassword,
            role: "ADMIN",
            name: "Federation Admin"
        }
    })

    console.log('Seeding complete.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
