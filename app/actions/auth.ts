"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import db from "@/lib/db";
import { hashPassword, verifyPassword, generateSessionToken } from "@/lib/auth-utils";

const AuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const SESSION_COOKIE_NAME = "slcf-session";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = AuthSchema.safeParse({ email, password });
    if (!result.success) {
        return { error: result.error.errors[0].message };
    }

    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user || user.password === null) {
            // Use generic error message for security
            return { error: "Invalid credentials" };
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return { error: "Invalid credentials" };
        }

        // Create a new session
        const sessionToken = generateSessionToken();
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await db.session.create({
            data: {
                sessionToken,
                userId: user.id,
                expires,
            },
        });

        // Set the cookie
        (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires,
            sameSite: "lax",
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export async function register(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const key = formData.get("key") as string; // Optional invite/verification key if needed

    /* In a real app, you might check an invite key here */

    const result = AuthSchema.safeParse({ email, password });
    if (!result.success) {
        return { error: result.error.errors[0].message };
    }

    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "User already exists with this email." };
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                // Default role is PLAYER
            },
        });

        // Auto-login after registration
        const sessionToken = generateSessionToken();
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await db.session.create({
            data: {
                sessionToken,
                userId: user.id,
                expires,
            },
        });

        (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires,
            sameSite: "lax",
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Failed to create account. specific error logged." };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
        await db.session.deleteMany({
            where: { sessionToken },
        });
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect("/"); // Changed back to home page from placeholder
}

export async function getSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) return null;

    try {
        const session = await db.session.findUnique({
            where: { sessionToken },
            include: { user: true },
        });

        if (!session || session.expires < new Date()) {
            return null;
        }

        return session;
    } catch {
        return null;
    }
}
