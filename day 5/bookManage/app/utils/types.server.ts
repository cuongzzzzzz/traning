import { Book } from "@prisma/client"

export type UserRegiser = {
    email: string
    name?: string
    password: string
}

export interface ICreateBook {
    title: string;
    desc: string;
    publisher: string;
    author: string;
    price: number;
    stock: number;
    page?: number,
    cover?: string
}