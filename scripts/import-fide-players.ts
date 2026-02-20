import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const fidePlayers = [
    { "fideId": "17800625", "name": "Abdul Rahman Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800170", "name": "Abubakarr Hassan Kamara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800188", "name": "Abubakarr Kamara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800811", "name": "Abubakarr Mohamed Dumbuya", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800013", "name": "Adeshole Beckley, Brian", "title": "", "stdRating": 1802, "rapidRating": 1751, "blitzRating": 1787 },
    { "fideId": "17800021", "name": "Agbaje, Samuel", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800030", "name": "Agbaje, Samzu.o.h.", "title": "", "stdRating": 1635, "rapidRating": 1730, "blitzRating": 0 },
    { "fideId": "17800382", "name": "Ahmed Haidar", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800714", "name": "Albert Moses Lake", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800846", "name": "Anita Macmillan Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800943", "name": "Arnold Bassie Kamara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800730", "name": "Ayo D Webber", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800110", "name": "Bah, Mariama Djelo", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800277", "name": "Baison Bundu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800099", "name": "Bangura, Fatmata Azzahara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800323", "name": "Bangura, Hussain Dauda", "title": "", "stdRating": 1502, "rapidRating": 1605, "blitzRating": 1583 },
    { "fideId": "17801010", "name": "Bangura, Ibrahim A", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800340", "name": "Bangura, Kabba Anthony", "title": "", "stdRating": 1621, "rapidRating": 1799, "blitzRating": 1738 },
    { "fideId": "17800331", "name": "Beckley, Jerelyn Adeshola Mary", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800781", "name": "Bockarie, Peter", "title": "", "stdRating": 1647, "rapidRating": 1584, "blitzRating": 1619 },
    { "fideId": "17800358", "name": "Boyle, Sonia", "title": "", "stdRating": 0, "rapidRating": 1517, "blitzRating": 0 },
    { "fideId": "17800234", "name": "Brima Momoh", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800919", "name": "Cecil Bliss Osho Williams", "title": "", "stdRating": 0, "rapidRating": 1618, "blitzRating": 0 },
    { "fideId": "17801001", "name": "Cole, Jonathan Adeyemi", "title": "", "stdRating": 0, "rapidRating": 1544, "blitzRating": 1702 },
    { "fideId": "17800862", "name": "Conteh, Favour Marian", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800250", "name": "Conteh, Moses Ina Ebenezer", "title": "", "stdRating": 1684, "rapidRating": 1619, "blitzRating": 1665 },
    { "fideId": "17800994", "name": "Conteh, Mustapha", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800080", "name": "Conteh, Samuella", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800528", "name": "Cyril Ibrahim Kargbo", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800722", "name": "David Awal Mansaray", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800790", "name": "Davida Hannah Ebu Mabel Koroma", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800137", "name": "Dennis Thamba Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800315", "name": "Donald Gabbidon", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800684", "name": "Edward Logan", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800404", "name": "Emmanuel Francis Lahai", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800870", "name": "Emmanuel Leo Baimba", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800455", "name": "Fadlu Ahmed Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800668", "name": "Farmer, Adama", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800641", "name": "Farmer, Mary Salamatu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801060", "name": "Fawaz Khalil", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800650", "name": "Fornah, Rugiatu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801079", "name": "Gbo- Musa Emmanuel Alpha", "title": "", "stdRating": 0, "rapidRating": 1456, "blitzRating": 0 },
    { "fideId": "17800757", "name": "Hawa Coma", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800463", "name": "Ibrahim Akmed Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800129", "name": "Ibrahim Santigie Conteh", "title": "", "stdRating": 1515, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800706", "name": "Isaac Julius Centralcee Hallowell", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800749", "name": "Isata Rainatu Fornah", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800552", "name": "Issa Kamara", "title": "", "stdRating": 1673, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800854", "name": "Joan Bannister", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800951", "name": "John Alie Kamara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800200", "name": "John Junior Bundu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800390", "name": "Jonathan Jermaine Obaseki", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800218", "name": "Joseph Sandy", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800986", "name": "Kamara, Abass", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800102", "name": "Kamara, Adiratu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800773", "name": "Kamara, Ibrahim Alie Bai", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800595", "name": "Kamara, Mohamed", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800820", "name": "Kamara, Samura", "title": "", "stdRating": 1592, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800072", "name": "Kamara, Sarah", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800935", "name": "Kargbo, I Michael", "title": "", "stdRating": 0, "rapidRating": 1431, "blitzRating": 0 },
    { "fideId": "17800480", "name": "Karim Dumbuya", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800307", "name": "Ken Gabbidon", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800285", "name": "Kenneth Mcgregor", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800587", "name": "Lavalie, Abdul Amara", "title": "", "stdRating": 1629, "rapidRating": 1594, "blitzRating": 1649 },
    { "fideId": "10001034", "name": "Lwebuga, Ronald", "title": "CM", "stdRating": 1880, "rapidRating": 0, "blitzRating": 1910 },
    { "fideId": "17800765", "name": "Mariama Jalloh", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800900", "name": "Michael Conteh", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800242", "name": "Michael Jarrett", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800161", "name": "Michael Tommy", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800579", "name": "Mohamed Abdul Turay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800498", "name": "Mohamed Dumbuya", "title": "", "stdRating": 0, "rapidRating": 1566, "blitzRating": 1598 },
    { "fideId": "17800536", "name": "Mohniratu Adama Nana Kargbo", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801028", "name": "Moore, Warren Joseph Obidiah", "title": "", "stdRating": 0, "rapidRating": 1661, "blitzRating": 1584 },
    { "fideId": "17800366", "name": "Moses Abdul Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800501", "name": "Muhammad Mustapha", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800692", "name": "Muna Kamara", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800471", "name": "Natherniel M S Goba", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800609", "name": "Ndiokho, Iboro Peter", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "422258", "name": "O`Neill, Jon", "title": "", "stdRating": 1886, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801052", "name": "Patrick Kanjear", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800447", "name": "Pedro Souzey", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800293", "name": "Percy Showers", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801044", "name": "Pessima, Tommy", "title": "", "stdRating": 0, "rapidRating": 1607, "blitzRating": 1684 },
    { "fideId": "17800838", "name": "Saccoi, Hilren John Milton", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800374", "name": "Sahr K Tenequee", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800153", "name": "Samuel Kamara", "title": "", "stdRating": 1651, "rapidRating": 1637, "blitzRating": 1644 },
    { "fideId": "17800226", "name": "Sankoh, Osman", "title": "", "stdRating": 1651, "rapidRating": 0, "blitzRating": 1770 },
    { "fideId": "17800544", "name": "Sebastian, Antic", "title": "", "stdRating": 1749, "rapidRating": 1630, "blitzRating": 1659 },
    { "fideId": "17800927", "name": "Sesay, Ibrahim Sorie Saidu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800064", "name": "Sesay, Mohamed", "title": "", "stdRating": 1726, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800978", "name": "Sesay, Simbo Ibrahim", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800633", "name": "Sheka Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800420", "name": "Sheku Ahmed Mansaray", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800889", "name": "Someone Emmanuel Sahr Gboku", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800056", "name": "Sowa, Dauda", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800897", "name": "Swaray, Alusine", "title": "", "stdRating": 1700, "rapidRating": 1613, "blitzRating": 1672 },
    { "fideId": "17800560", "name": "Tarawallie, Issa Peter", "title": "", "stdRating": 1609, "rapidRating": 1652, "blitzRating": 1635 },
    { "fideId": "17800196", "name": "Tenequee, Saa Joseph", "title": "", "stdRating": 1658, "rapidRating": 1707, "blitzRating": 1734 },
    { "fideId": "17800510", "name": "Timothy Olufemi Williams", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800269", "name": "Toronka, Abdul Rahman", "title": "", "stdRating": 1503, "rapidRating": 1505, "blitzRating": 1473 },
    { "fideId": "17800617", "name": "Toronka, Ibrahim", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800676", "name": "Toronka, Memunatu", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800412", "name": "Umarr Sesay", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800960", "name": "Webber, Desmond Ayo", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800048", "name": "Winston Gerald, Mansfield Thomas", "title": "", "stdRating": 1928, "rapidRating": 1927, "blitzRating": 1864 },
    { "fideId": "17800145", "name": "Wusu Kakay Sannoh", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800439", "name": "Yaukb Yass Jaward", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17800803", "name": "Yeaniva Agnes Lansana", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 },
    { "fideId": "17801036", "name": "Yusif Conteh", "title": "", "stdRating": 0, "rapidRating": 0, "blitzRating": 0 }
]

async function main() {
    console.log("Starting to import detailed FIDE players...")
    let importedCount = 0

    for (const player of fidePlayers) {
        if (!player.fideId) continue

        await prisma.member.upsert({
            where: {
                id: `FIDE-${player.fideId}`
            },
            update: {
                name: player.name,
                title: player.title || "None",
                rating: player.stdRating,
                rapidRating: player.rapidRating,
                blitzRating: player.blitzRating,
                fideId: player.fideId,
            },
            create: {
                id: `FIDE-${player.fideId}`,
                name: player.name,
                title: player.title || "None",
                rating: player.stdRating,
                rapidRating: player.rapidRating,
                blitzRating: player.blitzRating,
                club: "Federation Unaffiliated",
                status: "Active",
                joined: new Date().getFullYear().toString(),
                fideId: player.fideId,
                image: null,
            }
        })
        importedCount++
    }

    console.log(`Successfully imported ${importedCount} FIDE players!`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
