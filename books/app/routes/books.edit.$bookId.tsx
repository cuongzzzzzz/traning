import { Book } from "@prisma/client";
import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import FormInputField from "~/components/FormInputField";
import { getOneBook, updateBook } from "~/utils/book.server";
import { upload } from "~/utils/upload.server";
import { bookEditSchema } from "~/utils/validate.server";

type Props = {};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { bookId } = params;
  if (!bookId) json({ error: "Missing bookId" });

  const formData = await request.formData();
  const title = formData.get("title");
  const desc = formData.get("desc");
  const publisher = formData.get("publisher");
  const author = formData.get("author");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const page = formData.get("stock");
  const file: any = formData.get("cover");
  const currentCover = formData.get("currentCover");
  console.log("form data:::", formData);

  try {
    bookEditSchema.parse({
      title,
      desc,
      publisher,
      author,
      price: Number(price),
      stock: Number(stock),
      page: Number(page),
    });
  } catch (error: any) {
    const errors: { [key: string]: string } = {};
    error.issues.map((issue: any) => {
      const name = issue.path[0];
      errors[name] = issue.message;
    });
    return json(
      {
        errors,
        fields: {
          title,
          desc,
          publisher,
          author,
          price,
          stock,
        },
      },
      { status: 400 }
    );
  }
  try {
    let name: string | null = "";
    if (!file.size || typeof file === "string") {
      name = null;
    } else {
      name = (await upload(file)).name;
    }
    console.log(name ? "true" : "false");

    await updateBook(Number(bookId), {
      title,
      desc,
      publisher,
      author,
      price: Number(price),
      stock: Number(stock),
      page: Number(page),
      cover: name ? `uploads/${name}` : currentCover,
    } as Partial<Book>);
    return redirect("/");
    // return {}
  } catch (error) {
    console.log(error);
    return json({ error }, { status: 400 });
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { bookId } = params;
  if (!bookId) json({ error: "missing bookId" });
  console.log(bookId);
  const book = await getOneBook(Number(bookId));
  if (!book) json({ error: "Book doesnt exist" });
  return json({ book });
};

export default function Edit(props: Props) {
  const { book } = useLoaderData<any>();

  const actionData = useActionData<any>();
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formData, setFormData] = useState({
    title: book?.title || actionData?.fields?.title || "",
    desc: actionData?.fields?.desc || book?.desc || "",
    publisher: book?.publisher || actionData?.fields?.publisher || "",
    author: book?.author || actionData?.fields?.author || "",
    price: book?.price || actionData?.fields?.price || "",
    stock: book?.stock || actionData?.fields?.stock || "",
    page: book?.page || actionData?.fields?.page || "",
    cover: book?.cover || "",
  });

  useEffect(() => {
    if (actionData?.errors) {
      setErrors(actionData.errors);
    }
    if (actionData?.fields) {
      setFormData(actionData.fields);
    }
  }, [actionData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };
  return (
    <form method="POST" encType="multipart/form-data">
      <input
        type="text"
        name="currentCover"
        readOnly
        hidden
        value={formData.cover}
      />
      <FormInputField
        label="title"
        htmlFor="title"
        defaultValue={formData.title}
        placeHolder="enter title"
        error={errors?.title}
        onChange={handleInputChange}
      />
      <FormInputField
        label="desc"
        htmlFor="desc"
        placeHolder="enter desc"
        error={errors?.desc}
        onChange={handleInputChange}
        defaultValue={formData.desc}
      />
      <FormInputField
        label="publisher"
        htmlFor="publisher"
        defaultValue={formData.publisher}
        placeHolder="enter publisher"
        onChange={handleInputChange}
        error={errors?.publisher}
      />
      <FormInputField
        label="author"
        htmlFor="author"
        defaultValue={formData.author}
        onChange={handleInputChange}
        placeHolder="enter author"
        error={errors?.author}
      />
      <FormInputField
        label="price"
        htmlFor="price"
        placeHolder="enter price"
        onChange={handleInputChange}
        defaultValue={formData.price}
        type="number"
        error={errors?.price}
      />
      <FormInputField
        label="stock"
        htmlFor="stock"
        defaultValue={formData.stock}
        placeHolder="enter stock"
        onChange={handleInputChange}
        type="number"
        error={errors?.stock}
      />
      <FormInputField
        label="page"
        htmlFor="page"
        defaultValue={formData.page}
        placeHolder="enter page number"
        onChange={handleInputChange}
        type="number"
        error={errors?.page}
      />
      <FormInputField
        label="cover Image"
        htmlFor="cover"
        // defaultValue={formData.stock}
        // placeHolder='enter stock'
        onChange={handleInputChange}
        type="file"
        error={errors?.cover}
      />
      <Button type="submit" value="add">
        Edit
      </Button>
    </form>
  );
}
