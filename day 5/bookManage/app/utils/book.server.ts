import { Book } from "@prisma/client";
import { prisma } from "./prisma.server";
import { ICreateBook } from "./types.server";

export const createBook = async (data: ICreateBook) => {
    return await prisma.book.create({ data })
}


export const getOneBook = async (id: number) => {
    return await prisma.book.findUnique({
        where: { id }
    })
}
export const getAllBooks = async () => {
    return await prisma.book.findMany()
}
export const updateBook = async (id: number, data: Partial<Book>) => {
    return await prisma.book.update({
        where: {
            id
        }, data
    })
}
export const deleteOne = async (id: number) => {
    await prisma.book.delete({
        where: {
            id
        }
    })
}