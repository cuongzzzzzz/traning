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

export const getOne = async (id:number)=>{
    return await prisma.user.findUnique({
        where:{id},
        select:{
            name:true,
            email:true,
            id:true
        }
    })
}