import { Form, useActionData, useFormAction } from "@remix-run/react"
import React, { act, useEffect, useRef, useState, useTransition } from "react"
import { ActionFunctionArgs, json, LoaderFunction, redirect } from '@remix-run/node'
import { register, getUser, login } from '~/utils/auth.server'
import FormInputField from "~/components/FormInputField"
import { validateEmail, validateName, validatePassword } from "~/utils/validate.server"

export const loader: LoaderFunction = async ({ request }) => {
    return (await getUser(request)) ? redirect('/') : null
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const action = formData.get("_action")
    const email = formData.get("email")
    const password = formData.get("password")
   
    let name = formData.get("name")

    if (typeof action !== "string" || typeof email !== "string" || typeof password !== "string") {
        return json({ error: "Invalid Form Data", form: action }, { status: 400 })
    }
    if (action === "register" && (typeof name !== "string")) {
        return json({ error: "Invalid Form Data", form: action }, { status: 400 })
    }

    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === "register"
            ? {
                name: validateName(name as string),
            }
            : {}
        )

    }

    if (Object.values(errors).some(Boolean)) {
        console.log("run through validate")
        return json({ errors, fields: { email, password, name }, form: action }, { status: 400 })
    }

    switch (action) {
        case "register":
            name as string
            return await register({
                email, password, name: name as string
            })

        case "login":
            console.log("run here")
            return await login({ email, password })
        default:
            return json({ error: "Invalid Form Data" }, { status: 400 })
    }
}
export default function Login() {
    const actionData = useActionData<any>()
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [error, setError] = useState(actionData?.error || "")
    const [values, setValues] = useState(actionData?.fields || "")
    const [action, setAction] = useState("login")

    useEffect(() => {
        if (actionData?.errors) {
            setErrors(actionData.errors)
        }
        if (actionData?.error) {
            setError(actionData.error)
        }
        if (actionData?.fields) {
            setValues(actionData.fields)
        }
    }, [actionData])

    useEffect(() => {
        setErrors({})
    }, [action])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target
        setErrors((prev: any) => ({ ...prev, [name]: "" }))
        if (error !== "") {
            setError("")
        }

    }
    console.log(error)
    const toggleAction = () => {
        setAction(prev => prev === 'login' ? 'register' : 'login')
        if (formRef.current) formRef.current.reset()
    }

    return (
            <div className="h-full justify-center items-center flex flex-col gap-y-4">
                <button
                    onClick={toggleAction}
                    className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                >
                    {action === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
                <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to BookManage!</h2>
                <p className="font-semibold text-slate-300">
                    {action === 'login' ? 'Log In!' : 'Sign Up To Get Started!'}
                </p>
                <Form ref={formRef} method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <div className="text-xs form-error font-semibold text-center tracking-wide text-red-500 w-full">
                        {error}
                    </div>

                    <FormInputField
                        htmlFor="email"
                        label="Email"
                        error={errors.email}
                        onChange={handleInputChange}
                    />
                    <FormInputField
                        htmlFor="password"
                        type="password"
                        label="Password"
                        error={errors.password}
                        onChange={handleInputChange}
                    />
                    {action === 'register' && (
                        <>
                            <FormInputField
                                htmlFor="firstName"
                                label="First Name"
                                error={errors.firstName}
                                onChange={handleInputChange}
                            />
                            <FormInputField
                                htmlFor="lastName"
                                label="Last Name"
                                error={errors.lastName}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                    <div className="w-full text-center">
                        <button
                            type="submit"
                            name="_action"
                            value={action}
                            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                        >
                            {action === 'login' ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </Form>
            </div>
    )
}
