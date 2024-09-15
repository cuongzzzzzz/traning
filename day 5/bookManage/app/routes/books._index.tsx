import { ActionFunctionArgs, json, LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useNavigate } from '@remix-run/react'

import Button from '~/components/Button'
import { deleteOne, getAllBooks } from '~/utils/book.server'

type Props = {}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const allBooks = await getAllBooks()
    return json({ allBooks })
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const id = formData.get("id")
    if (!id) json({ error: "Missing Id" })
    try {
        await deleteOne(Number(id))
        return { message: "Delete successfully" }
    } catch (error) {
        return json(error)
    }
}

const Index = (props: Props) => {
    const navigate = useNavigate()
    const { allBooks } = useLoaderData<typeof loader>()


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Desc

                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Image

                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Price

                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                stock

                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Action

                            </div>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {allBooks.map(book => {
                        return <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {book.title}
                            </th>
                            <td className="px-6 py-4">{book.desc}</td>
                            <td className="px-6 py-4"> <img className='w-[150px]' src={book?.cover || ""} /></td>
                            <td className="px-6 py-4">${book.price}</td>
                            <td className="px-6 py-4">{book.stock}</td>
                            <td className="px-6 py-4 text-right">
                                <div className='flex  items-center gap-3'>
                                    <Link to={`/books/edit/${book.id}`}>
                                        <Button children="Edit" value='' type='button' variant="default" />
                                    </Link>
                                    <Form method="POST"
                                        onSubmit={(event) => {
                                            const response = confirm(
                                                "Please confirm you want to delete this record."
                                            );
                                            if (!response) {
                                                event.preventDefault();
                                            }
                                        }}>

                                        <input type="text" name='id' hidden value={book.id} onChange={() => { }} />
                                        <Button children="delete" value='' variant={"red"} type='submit' />
                                    </Form>
                                </div>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Index