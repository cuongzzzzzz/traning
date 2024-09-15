import { prisma } from "./prisma.server"
import { json, redirect } from "@remix-run/node";
import { createUser } from "./user.server";
import { UserRegiser } from "./types.server";


export const register = async (user: UserRegiser) => {
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