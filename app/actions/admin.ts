"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { getSession } from "./auth";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadPlayerImage(formData: FormData) {
    try {
        await checkAdmin();
        const file = formData.get("image") as File;
        if (!file || file.size === 0) return { error: "No file provided" };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const ext = file.name.split(".").pop() ?? "jpg";
        const filename = `player-${Date.now()}.${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        console.error("Image upload failed:", error);
        return { error: "Image upload failed" };
    }
}


const EventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(1, "Location is required"),
    type: z.string().min(1, "Type is required"),
    level: z.string().min(1, "Level is required"),
    status: z.string().default("Upcoming"),
    organizer: z.string().min(1, "Organizer is required"),
    description: z.string().min(1, "Description is required"),
    prizePool: z.string().optional(),
    entryFee: z.string().optional(),
    registrationOpen: z.boolean().default(true),
});

async function checkAdmin() {
    const session = await getSession();
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
}

export async function createEvent(formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            title: formData.get("title") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            location: formData.get("location") as string,
            type: formData.get("type") as string,
            level: formData.get("level") as string,
            status: formData.get("status") as string || "Upcoming",
            organizer: formData.get("organizer") as string,
            description: formData.get("description") as string,
            prizePool: formData.get("prizePool") as string,
            entryFee: formData.get("entryFee") as string,
            registrationOpen: formData.get("registrationOpen") === "on",
        };

        const validated = EventSchema.parse(data);

        await db.calendarEvent.create({
            data: {
                id: `ev-${Math.random().toString(36).substr(2, 9)}`,
                ...validated,
            },
        });

        revalidatePath("/calendar");
        revalidatePath("/admin/events");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { error: error instanceof Error ? error.message : "Failed to create event" };
    }
}

export async function updateEvent(id: string, formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            title: formData.get("title") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            location: formData.get("location") as string,
            type: formData.get("type") as string,
            level: formData.get("level") as string,
            status: formData.get("status") as string,
            organizer: formData.get("organizer") as string,
            description: formData.get("description") as string,
            prizePool: formData.get("prizePool") as string,
            entryFee: formData.get("entryFee") as string,
            registrationOpen: formData.get("registrationOpen") === "on",
        };

        const validated = EventSchema.parse(data);

        await db.calendarEvent.update({
            where: { id },
            data: validated,
        });

        revalidatePath("/calendar");
        revalidatePath("/admin/events");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to update event:", error);
        return { error: error instanceof Error ? error.message : "Failed to update event" };
    }
}

export async function deleteEvent(id: string) {
    try {
        await checkAdmin();

        await db.calendarEvent.delete({
            where: { id },
        });

        revalidatePath("/calendar");
        revalidatePath("/admin/events");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { error: "Failed to delete event" };
    }
}

const MemberSchema = z.object({
    id: z.string().min(1, "Member ID is required"),
    name: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    rating: z.coerce.number().int().default(0),
    rapidRating: z.coerce.number().int().default(0),
    blitzRating: z.coerce.number().int().default(0),
    club: z.string().min(1, "Club is required"),
    status: z.string().min(1, "Status is required"),
    joined: z.string().min(1, "Join date is required"),
    fideId: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
});

export async function createMember(formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            id: formData.get("id") as string,
            name: formData.get("name") as string,
            title: formData.get("title") as string,
            rating: formData.get("rating") || 0,
            rapidRating: formData.get("rapidRating") || 0,
            blitzRating: formData.get("blitzRating") || 0,
            club: formData.get("club") as string,
            status: formData.get("status") as string,
            joined: formData.get("joined") as string,
            fideId: formData.get("fideId") as string,
            bio: formData.get("bio") as string,
            image: (formData.get("image") as string) || undefined,
        };

        const validated = MemberSchema.parse(data);

        await db.member.create({
            data: validated,
        });

        revalidatePath("/members");
        revalidatePath("/admin/members");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to create member:", error);
        return { error: error instanceof Error ? error.message : "Failed to create member" };
    }
}

export async function updateMember(id: string, formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            id: formData.get("memberId") as string || id,
            name: formData.get("name") as string,
            title: formData.get("title") as string,
            rating: formData.get("rating") || 0,
            rapidRating: formData.get("rapidRating") || 0,
            blitzRating: formData.get("blitzRating") || 0,
            club: formData.get("club") as string,
            status: formData.get("status") as string,
            joined: formData.get("joined") as string,
            fideId: formData.get("fideId") as string,
            bio: formData.get("bio") as string,
            image: (formData.get("image") as string) || undefined,
        };

        const validated = MemberSchema.parse(data);

        await db.member.update({
            where: { id },
            data: validated,
        });

        revalidatePath("/members");
        revalidatePath("/admin/members");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to update member:", error);
        return { error: error instanceof Error ? error.message : "Failed to update member" };
    }
}

const NewsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    author: z.string().min(1, "Author is required"),
    date: z.string().min(1, "Date is required"),
    readTime: z.string().min(1, "Read time is required"),
    tags: z.string().default("General"),
    featured: z.boolean().default(false),
    image: z.string().default("/images/news1.png"),
});

export async function createNews(formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            title: formData.get("title") as string,
            excerpt: formData.get("excerpt") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            author: formData.get("author") as string,
            date: formData.get("date") as string,
            readTime: formData.get("readTime") as string,
            tags: formData.get("tags") as string || "General",
            featured: formData.get("featured") === "on",
            image: (formData.get("image") as string) || "/images/news1.png",
        };

        const validated = NewsSchema.parse(data);

        await db.newsArticle.create({
            data: {
                id: `news-${Math.random().toString(36).substr(2, 9)}`,
                ...validated,
            },
        });

        revalidatePath("/news");
        revalidatePath("/admin/news");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to create news:", error);
        return { error: error instanceof Error ? error.message : "Failed to create news" };
    }
}

export async function updateNews(id: string, formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            title: formData.get("title") as string,
            excerpt: formData.get("excerpt") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            author: formData.get("author") as string,
            date: formData.get("date") as string,
            readTime: formData.get("readTime") as string,
            tags: formData.get("tags") as string || "General",
            featured: formData.get("featured") === "on",
            image: (formData.get("image") as string) || "/images/news1.png",
        };

        const validated = NewsSchema.parse(data);

        await db.newsArticle.update({
            where: { id },
            data: validated,
        });

        revalidatePath("/news");
        revalidatePath("/admin/news");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to update news:", error);
        return { error: error instanceof Error ? error.message : "Failed to update news" };
    }
}

const GameSchema = z.object({
    whiteId: z.string().min(1, "White player is required"),
    blackId: z.string().min(1, "Black player is required"),
    result: z.string().min(1, "Result is required"),
    event: z.string().min(1, "Event name is required"),
    date: z.string().min(1, "Date is required"),
    moves: z.string().default("1. e4 e5 ..."),
    ratingChange: z.coerce.number().optional(),
});

export async function recordGame(formData: FormData) {
    try {
        await checkAdmin();

        const data = {
            whiteId: formData.get("whiteId") as string,
            blackId: formData.get("blackId") as string,
            result: formData.get("result") as string,
            event: formData.get("event") as string,
            date: formData.get("date") as string,
            moves: (formData.get("moves") as string) || "1. e4 e5 ...",
            ratingChange: formData.get("ratingChange") ? Number(formData.get("ratingChange")) : undefined,
        };

        const validated = GameSchema.parse(data);

        await db.game.create({
            data: validated,
        });

        revalidatePath("/members");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to record game:", error);
        return { error: error instanceof Error ? error.message : "Failed to record game" };
    }
}

export async function deleteMember(id: string) {
    try {
        await checkAdmin();

        // Delete all games that reference this member (as white or black player)
        // to satisfy the foreign key constraints before deleting the member.
        await db.game.deleteMany({
            where: {
                OR: [{ whiteId: id }, { blackId: id }],
            },
        });

        // Also unlink any user account tied to this member
        await db.user.updateMany({
            where: { memberId: id },
            data: { memberId: null },
        });

        await db.member.delete({
            where: { id },
        });

        revalidatePath("/members");
        revalidatePath("/admin/members");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete member:", error);
        return { error: "Failed to delete member" };
    }
}

export async function deleteNews(id: string) {
    try {
        await checkAdmin();
        await db.newsArticle.delete({
            where: { id },
        });
        revalidatePath("/news");
        revalidatePath("/admin/news");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete news:", error);
        return { error: "Failed to delete news" };
    }
}
