import { useState } from "react"

interface FormFieldProps {
    htmlFor: string
    type?: string
    label: string
    value?: any
    onChange?: (...args: any) => any
    error?: string
}

export function FormField({ htmlFor, label, type = "text", value, onChange, error = "" }: FormFieldProps) {
    console.log(`${htmlFor}:::${error}`)
    return (
        <div>
            <label htmlFor={htmlFor} className="text-blue-600 font-semibold">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                id={htmlFor}
                name={htmlFor}
                className="w-full p-2 rounded-xl my-2"
                value={value}
            />
            {error && <div id="error" className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                {error}
            </div>
            }
        </div>
    )
}