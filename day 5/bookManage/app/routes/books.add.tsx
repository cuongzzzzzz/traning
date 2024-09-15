import { ActionFunction, ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/Button'
import FormInputField from '~/components/FormInputField'
import { bookSchema } from "app/utils/validate.server"
import { json } from "@remix-run/node"
import { createBook } from '~/utils/book.server'
import { ICreateBook } from '~/utils/types.server'
import { upload } from '~/utils/upload.server'

type Props = {}


export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const desc = formData.get("desc")
    const publisher = formData.get("publisher")
    const author = formData.get("author")
    const price = formData.get("price")
    const stock = formData.get("stock")
    const page = formData.get("page")
    const file = formData.get("cover")

    try {
        bookSchema.parse({
            title,
            desc,
            publisher,
            author,
            price: Number(price),
            stock: Number(stock),
            page: Number(page),
        })

    } catch (error: any) {
        const errors: { [key: string]: string } = {}
        error.issues.map((issue: any) => {
            const name = issue.path[0]
            errors[name] = issue.message
        })
        return json({
            errors,
            fields: {
                title, desc, publisher, author, price, stock
            }
        }, { status: 400 })
    }
    try {
        if (!file || typeof file === "string") {
            return json({ error: "No file uploaded" }, { status: 400 });
        }
        const { name } = await upload(file)

        const newBook = await createBook({
            title,
            desc,
            publisher,
            author,
            price: Number(price),
            stock: Number(stock),
            page: page ? Number(page) : "",
            cover: file ? `uploads/${name}` : ""
        } as ICreateBook)

        console.log({
            title,
            desc,
            publisher,
            author,
            price: Number(price),
            stock: Number(stock),
            page: page ? Number(page) : "",
            cover: file ? `uploads/${name}` : ""
        })
        if (!newBook) {
            return json({
                message: "SOmething went wrong!",
                fields: {
                    title,
                    desc,
                    publisher,
                    author,
                    price: Number(price),
                    stock: Number(stock)
                }
            })
        }
        return redirect("/")
    } catch (error) {
        return json({ error }, { status: 400 })
    }
}

export default function Add(props: Props) {
    const actionData = useActionData<any>()
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formData, setFormData] = useState({
        title: actionData?.fields?.title || "",
        desc: actionData?.fields?.desc || "",
        publisher: actionData?.fields?.publisher || "",
        author: actionData?.fields?.author || "",
        price: actionData?.fields?.price || "",
        stock: actionData?.fields?.stock || "",
        page: actionData?.fields?.page || "",
        cover: actionData?.fields?.cover || "",
    })

    useEffect(() => {
        if (actionData?.errors) {
            setErrors(actionData.errors)
        }
        if (actionData?.fields) {
            setFormData(actionData.fields)
        }
    }, [actionData])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev: any) => ({ ...prev, [name]: "" }))
    }

    return (
        <form method='POST' encType="multipart/form-data">
            <FormInputField
                label='title'
                htmlFor='title'
                defaultValue={formData.title}
                placeHolder='enter title'
                error={errors?.title}
                onChange={handleInputChange}
            />
            <FormInputField
                label='desc'
                htmlFor='desc'
                placeHolder='enter desc'
                error={errors?.desc}
                onChange={handleInputChange}
                defaultValue={formData.desc}
            />
            <FormInputField
                label='publisher'
                htmlFor='publisher'
                defaultValue={formData.publisher}
                placeHolder='enter publisher'
                onChange={handleInputChange}
                error={errors?.publisher}
            />
            <FormInputField
                label='author'
                htmlFor='author'
                defaultValue={formData.author}
                onChange={handleInputChange}
                placeHolder='enter author'
                error={errors?.author}
            />
            <FormInputField
                label='price'
                htmlFor='price'
                placeHolder='enter price'
                onChange={handleInputChange}
                defaultValue={formData.price}
                type="number"
                error={errors?.price}
            />
            <FormInputField
                label='stock'
                htmlFor='stock'
                defaultValue={formData.stock}
                placeHolder='enter stock'
                onChange={handleInputChange}
                type='number'
                error={errors?.stock}
            />
            <FormInputField
                label='page'
                htmlFor='page'
                defaultValue={formData.page}
                placeHolder='enter page number'
                onChange={handleInputChange}
                type='number'
                error={errors?.page}
            />
            <FormInputField
                label='cover Image'
                htmlFor='cover'
                type='file'
                error={errors?.cover}
            />
            <Button type='submit' value='add'>Add</Button>
        </form>

    )
}


