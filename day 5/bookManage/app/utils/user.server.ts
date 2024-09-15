import bcrypt from "bcryptjs"
import { prisma } from "./prisma.server"
import { UserRegiser } from "./types.server"

export const createUser = async (user: UserRegiser) => {
    const hashPassword = bcrypt.hashSync(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            password: hashPassword
        }
    })
    return {
        id: newUser.id,
        email: newUser.email
    }
}