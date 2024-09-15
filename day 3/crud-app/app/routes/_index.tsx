import type { MetaFunction } from "@remix-run/node";
import { getAllUser } from "~/services/user.service";
import { json } from "@remix-run/node"
import { useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const allUser = await getAllUser()
  return json({ data: allUser })
}

export default function Index() {
  const data = useActionData<typeof loader>()

  console.log(data)
  return (
    <>
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">email</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">phone number</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">image</th>
              <th className="px-4 py-2">action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </>
  );
}
