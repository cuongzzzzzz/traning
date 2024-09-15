import { PrismaClient } from "@prisma/client"
import { IUser } from "~/interfaces/IUser"

const prisma = new PrismaClient()

export const getAllUser = async () => {
    const allUser = await prisma.user.findMany()
    return allUser
}
export const getOne = async (id: number) => {

    const foundUser = await prisma.user.findUnique({ where: { id } })
    if (!foundUser) throw new Response("Not found", { status: 404 })
    return foundUser

}
export const create = async (data: IUser) => {
    const newUser = await prisma.user.create({ data })
    return newUser
}
export const update = async (id: number, data: Partial<IUser>) => {
    const foundUser = await prisma.user.findUnique({ where: { id } })
    if (!foundUser) throw new Response("Not found", { status: 404 })
    return await prisma.user.update({ where: { id }, data })

}
export const deleteOne = async (id: number) => {
    const foundUser = await prisma.user.findUnique({ where: { id } })
    if (!foundUser) throw new Response("Not found", { status: 404 })
    return await prisma.user.delete({ where: { id } })
}