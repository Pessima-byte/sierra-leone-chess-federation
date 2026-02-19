export interface NewsArticle {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    author: string
    category: 'Tournament' | 'Federation' | 'International' | 'Training'
    image: string
    readTime: string
    tags: string[]
    featured?: boolean
}

export const newsArticles: NewsArticle[] = [
    {
        id: '1',
        title: 'Sierra Leone Set to Host West Africa Zonal Tournament',
        excerpt: 'The Sierra Leone Chess Federation has officially been awarded the hosting rights for the upcoming 2025 Zonal Championship.',
        content: 'Freetown is preparing to welcome elite grandmasters from across the West African region for a high-stakes championship that promises to elevate the standard of chess in the nation...',
        date: '2025-06-12',
        author: 'Technical Committee',
        category: 'Tournament',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1000',
        readTime: '5 min read',
        tags: ['Championship', 'Freetown', 'International'],
        featured: true
    },
    {
        id: '2',
        title: 'New Digital Rating System Launched for National Players',
        excerpt: 'SLCF introduces a blockchain-verified rating terminal to track player progress with absolute transparency.',
        content: 'In a significant move towards modernization, the federation has deployed a new digital infrastructure to manage national ratings...',
        date: '2025-06-10',
        author: 'IT Department',
        category: 'Federation',
        image: 'https://images.unsplash.com/photo-1586075010923-2cf457062149?q=80&w=1000',
        readTime: '3 min read',
        tags: ['Technology', 'Ratings', 'Digital Hub'],
        featured: false
    },
    {
        id: '3',
        title: 'International Master Seminar: Strategies of the 21st Century',
        excerpt: 'Join IM David Kamara for an exclusive deep-dive into modern opening theories and endgame precision.',
        content: 'Register now for our upcoming masterclass series designed for advanced players seeking to refine their strategic depth...',
        date: '2025-06-08',
        author: 'Training Academy',
        category: 'Training',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000',
        readTime: '4 min read',
        tags: ['Training', 'Seminar', 'Masterclass'],
        featured: false
    },
    {
        id: '4',
        title: 'FIDE President Commends Sierra Leone Development Program',
        excerpt: 'The international chess body recognizes SLCF for its "Chess in Schools" initiative impact.',
        content: 'A delegation from FIDE visited Freetown last week to observe the grassroots development programs currently being implemented...',
        date: '2025-06-05',
        author: 'Press Office',
        category: 'International',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000',
        readTime: '6 min read',
        tags: ['FIDE', 'Development', 'Education'],
        featured: false
    },
    {
        id: '5',
        title: 'U-18 National Squad Selection Trials Announced',
        excerpt: 'Young talents across the country are invited to participate in the upcoming junior selection trials for the African Youth Championship.',
        content: 'The federation is looking for the next generation of champions. Trials will be held across three regional centers...',
        date: '2025-06-02',
        author: 'Youth Development',
        category: 'Tournament',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000',
        readTime: '4 min read',
        tags: ['Youth', 'Trials', 'Competition'],
        featured: false
    }
]
