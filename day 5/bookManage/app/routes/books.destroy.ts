import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { deleteOne } from "~/utils/book.server"

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const id = formData.get("id")
    if (!id) json({ error: "Missing Id" })
    try {
        await deleteOne(Number(id))
        return redirect("/")
    } catch (error) {
        return json(error)
    }
}
