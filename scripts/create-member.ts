import { PrismaClient } from '@prisma/client'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const prisma = new PrismaClient()
const scryptAsync = promisify(scrypt)

async function createMemberUser() {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync("member123", salt, 64)) as Buffer;
    const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;

    try {
        await prisma.user.create({
            data: {
                email: "ansu.kamara@slchess.org",
                password: hashedPassword,
                role: "PLAYER",
                name: "Ansu Kamara",
                memberId: "SL-001"
            }
        })
        console.log("Member user created successfully:")
        console.log("Email: ansu.kamara@slchess.org")
        console.log("Password: member123")
    } catch (error) {
        console.error("Failed to create member user:", error)
    } finally {
        await prisma.$disconnect()
    }
}

createMemberUser()
