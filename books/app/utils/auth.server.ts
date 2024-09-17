import { prisma } from "./prisma.server"
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { createUser, getOne } from "./user.server";
import { UserRegiser } from "./types.server";

 const register = async (user: UserRegiser) => {
    const { email, name, password } = user
    const foundUser = await prisma.user.findUnique({
        where: { email }
    })
    if (foundUser) return json({ error: "User already exist with this email" }, { status: 400 })

    const newUser = await createUser(user)
    if (!newUser) return json({
        error: "somthing went wrong!", fields: {
            email,
            name,
            password
        }
    }, { status: 400 })

    return redirect("/")

}   

const sessionSecret = process.env.SESSION_SECRET 
if(!sessionSecret) throw new Error("session secret required")


const storage = createCookieSessionStorage({
    cookie: {
        name: "book-session",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true

    }
})

const getUserSession = async (req:Request)=>{
    return storage.getSession(req.headers.get("cookie"))
}

const getUserId = async (req:Request)=>{
    const session = await getUserSession(req)
    const userId =session.get("userId")
    if(!userId || typeof userId !== "string"){
        return null
    }
    return userId
}

const getUser = async(req:Request) =>{
    const userId = await getUserId(req)
    if(!userId) {
        return null
    }

    try {
        const foundUser = await getOne(Number(userId))
        if(!foundUser) return logout(req)
        return foundUser
    } catch (error) {
        
    }
}

const logout = async (req:Request)=>{
    const session = storage.getSession()
}

const login = async ({email, password}:{email: string, password : string})=>{
    return redirect("/")
}

export {login,logout,register,getUser,getUserId,getUserSession}