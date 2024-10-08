import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
import { SelectBox } from "~/components/select-box";
import { getUser, logout, requireUserId } from "~/utils/auth.server";
import { departments } from "~/utils/constants";
import { deleteUser, updateUser } from "~/utils/user.server";
import { validateName } from "~/utils/validator.server";
import type { Department } from "@prisma/client";
import { ImageUploader } from "~/components/img-uploader";
export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    return json({ user })
}

export const action: ActionFunction = async ({ request }) => {

    const userId = await requireUserId(request)
    const formData = await request.formData()
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const department = formData.get("department")
    const action = formData.get("_action")

    switch (action) {
        case "save":
            {

                if (typeof firstName !== "string" || typeof lastName !== "string" || typeof department !== "string") {
                    return json("Invalid Form Data", { status: 400 })
                }

                const errors = {
                    firstName: validateName(firstName),
                    lastName: validateName(lastName),
                    department: validateName(department),
                }
                if (Object.values(errors).some(Boolean)) {
                    return json({ errors, fields: { department, lastName, firstName } }, { status: 400 })
                }
                await updateUser(userId, {
                    firstName,
                    lastName,
                    department: department as Department
                })
                return redirect('/home')
            }

        case "delete":
            await deleteUser(userId)
            return logout(request)

        default:
            return json("Invalid Form Date", { status: 400 })
    }


}

export default function ProfileSettings() {
    const { user } = useLoaderData<typeof loader>()


    const [formData, setFormData] = useState({
        firstName: user?.profile?.firstName || "",
        lastName: user?.profile?.lastName || "",
        department: (user?.profile?.department || 'MARKETING'),
        profilePicture: user?.profile?.profilePicture || ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(formData => ({ ...formData, [field]: e.target.value }))
    }

    const handleFileUpload = async (file: File) => {
        let inputFormData = new FormData()
        inputFormData.append('avatar', file)
        const response = await fetch('/avatar', {
            method: 'POST',
            body: inputFormData
        })
        const { imageUrl } = await response.json()
        setFormData({
            ...formData,
            profilePicture: imageUrl,

        })
    }

    return (
        <Modal isOpen={true} className="w-1/3">
            <div className="p-3">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
                <div className="flex">
                    <div className="w-1/3">
                        <ImageUploader onChange={handleFileUpload} imageUrl={formData.profilePicture || ''} />
                    </div>
                    <div className="flex-1">
                        <form method="post" onSubmit={(e) => {
                            return !confirm("Are you sure?") ? e.preventDefault() : true
                        }}>
                            <FormField htmlFor="firstName" label="First Name" value={formData.firstName} onChange={e => handleInputChange(e, 'firstName')} />
                            <FormField htmlFor="lastName" label="Last Name" value={formData.lastName} onChange={e => handleInputChange(e, 'lastName')} />
                            <SelectBox
                                className="w-full rounded-xl px-3 py-2 text-gray-400"
                                id="department"
                                label="Department"
                                name="department"
                                options={departments}
                                value={formData.department}
                                onChange={e => handleInputChange(e, 'department')}
                            />

                            <div className="w-full text-right mt-4 flex gap-3">
                                <button name="_action" value="delete" className="rounded-xl bg-red-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-red-400 hover:-translate-y-1">
                                    Delete
                                </button>
                                <button name="_action" value="save" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
