import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { LoginForm, RegisterForm } from "./types.server";
import { createUser } from "./user.server";
import bcrypt from 'bcryptjs'

export async function register(user: RegisterForm) {

    const foundUser = await prisma.user.findFirst({
        where:
            { email: user.email }
    })
    if (foundUser) return json({ error: " User already exists with the email" }, { status: 400 })

    const newUser = await createUser(user)

    if (!newUser) {
        return json({
            error: "Something went wrong, plz try again",
            field: { email: user.email, password: user.password }
        },
            { status: 400 }
        )
    }

    return createUserSession(newUser.id, '/');

}

export const login = async ({ email, password }: LoginForm) => {
    const user = await prisma.user.findUnique({
        where:
            { email }
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        console.log("not pass check")
        return json({ error: "Incorrect login" }, { status: 400 })
    }
    console.log("from login pass check")
    return createUserSession(user.id, "/");
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) throw new Error("SESSION_SECRET must be set")

const storage = createCookieSessionStorage({
    cookie: {
        name: "kudo-session",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true

    }
})

export const createUserSession = async (userId: string, redirectTo: string) => {
    const session = await storage.getSession()
    session.set("userId", userId)
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    })
}

export async function requireUserId(req: Request, redirectTo: string = new URL(req.url).pathname) {
    const session = await getUserSession(req)
    const userId = session.get("userId")

    if (!userId || typeof userId !== "string") {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }
    return userId
}

function getUserSession(req: Request) {
    return storage.getSession(req.headers.get("Cookie"))

}

async function getUserId(req: Request) {
    const session = await getUserSession(req)
    const userId = session.get("userId")

    if (!userId || typeof userId !== "string") return null
    return userId

}

export async function getUser(req: Request) {
    const userId = await getUserId(req)
    if (typeof userId !== "string") {
        return null
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: { id: true, email: true, profile: true }
        })
        if (!user) {
            throw logout(req)
        }

        return user
    } catch (error) {
        throw logout(req)
    }
}

export async function logout(req: Request) {
    const session = await getUserSession(req)
    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    })
}