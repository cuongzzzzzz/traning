import { Profile } from "@prisma/client";
import { prisma } from "./prisma.server";
import { RegisterForm } from "./types.server";
import bcrypt from "bcryptjs"


export const createUser = async (user: RegisterForm) => {
    const hashPassword = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: hashPassword,
            profile: {
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    })

    return { id: newUser.id, email: newUser.email }
}
export const getOtherUsers = async (userId: string) => {
    return await prisma.user.findMany({
        where: {
            id: { not: userId }
        }, select: {
            id: true, email: true, profile: true
        },
        orderBy: {
            profile: {
                firstName: "asc"
            }
        }
    })
}
export const getAnUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
export const updateUser = async (userId: string, profile: Partial<Profile>) => {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            profile: {
                update: profile,
            },
        },
    });
};

export const deleteUser = async (userId: string) => {
    return await prisma.user.delete({
        where: {
            id: userId
        }
    })
}