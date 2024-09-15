import React from "react"

type Props = {
    htmlFor: string
    placeHolder?: string
    error?: string
    label: string
    type?: string
    value?: string
    defaultValue?: string
    onChange?: (...args: any) => any
}

const FormInputField = ({ htmlFor = "", placeHolder = "", error = "", label, type = "text", defaultValue = "", onChange }: Props) => {
    function capitalizeFirstLetter(string: string) {
        if (string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            <label
                htmlFor={capitalizeFirstLetter(htmlFor)}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {capitalizeFirstLetter(label)}
            </label>
            <input
                type={type}
                defaultValue={defaultValue}
                name={htmlFor}
                id={htmlFor}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={capitalizeFirstLetter(placeHolder)}
                onChange={onChange}
            />
            <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-red-600"
            >
                {error}
            </p>
        </>

    )
}

export default FormInputField