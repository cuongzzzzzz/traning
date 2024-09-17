import { ActionFunction, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/Button'
import FormInputField from '~/components/FormInputField'
import { json } from "@remix-run/node"
import { createBook } from '~/utils/book.server'
import { ICreateBook } from '~/utils/types.server'
import { upload } from '~/utils/upload.server'
import { bookSchema } from '~/utils/validate.server'



export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const desc = formData.get("desc")
    const publisher = formData.get("publisher")
    const author = formData.get("author")
    const price = formData.get("price")
    const stock = formData.get("stock")
    const page = formData.get("page")

    const file :any= formData.get("cover")


    let errors: { [key: string]: string } = {}
     

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
        console.log(error)
        error.issues.map((issue: any) => {
            const name = issue.path[0]
            errors[name] = issue.message
        })
        
    }
    try {
        if (!file.size|| typeof file === "string") {
            errors["cover"] = "Không có file được tải lên"
        }
        console.log(typeof file)

        console.log(errors)

        if(Object.keys(errors).length >0){
            return json({
                errors,
                fields: {
                    title, desc, publisher, author, price, stock
                }
            }, { status: 400 })
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
            cover: name ? `uploads/${name}` : ""
        } as ICreateBook)

        
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

// interface FormData {
//     title: string;
//     desc: string;
//     publisher: string;
//     author: string;
//     price: string;
//     stock: string;
//     page: string;
//     cover: File | null;
//   }
  
  // Hàm xác thực form ở client
//   const validateForm = (data: FormData) => {
//     const errors: Partial<Record<keyof FormData, string>> = {};
//     if (!data.title.trim()) errors.title = "Title is required";
//     if (!data.desc.trim()) errors.desc = "Description is required";
//     if (!data.publisher.trim()) errors.publisher = "Publisher is required";
//     if (!data.author.trim()) errors.author = "Author is required";
//     if (!data.price || isNaN(Number(data.price))) errors.price = "Price must be a valid number";
//     if (!data.stock || isNaN(Number(data.stock))) errors.stock = "Stock must be a valid number";
//     if (data.page && isNaN(Number(data.page))) errors.page = "Page must be a valid number";
//     return errors;
//   };

export default function Add() {
    const actionData = useActionData<typeof action>()
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formData, setFormData] = useState({
        title: actionData?.fields?.title || "",
        desc: actionData?.fields?.desc || "",
        publisher: actionData?.fields?.publisher || "",
        author: actionData?.fields?.author || "",
        price: actionData?.fields?.price || "",
        stock: actionData?.fields?.stock || "",
        page: actionData?.fields?.page || "",
    })

    useEffect(() => {
        if (actionData?.errors) {
            setErrors(actionData.errors)
        }
        if (actionData?.fields) {
            setFormData(actionData.fields)
        }
        console.log("data change")
    }, [actionData])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target
        if (name === 'cover' && files) {
          setFormData(prev => ({ ...prev, [name]: files[0] }))
        } else {
          setFormData(prev => ({ ...prev, [name]: value }))
        }
        setErrors((prev:any) => ({ ...prev, [name]: "" }))
      }
    useEffect(()=>{
        console.log("rerender")
    },[])
    return (
        <Form method='POST' encType="multipart/form-data" className='py-5'>
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
                onChange={handleInputChange}

            />
            <Button type='submit' value='add'>Add</Button>
        </Form>

    )
}


