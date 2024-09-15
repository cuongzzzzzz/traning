import z from "zod"
export const bookSchema = z.object({
    title: z.string().min(1, "title không được để trống"),
    desc: z.string().min(1, "desc không được để trống"),
    publisher: z.string().min(1, "publisher không được để trống"),
    author: z.string().min(1, "author không được để trống"),
    price: z.number({ message: "trường này phải là số" }).min(1, "price không thể nhỏ hơn 0"),
    stock: z.number({ message: "trường này phải là số" }).min(1, "stock không thể nhỏ hơn 0"),
    page: z.number({ message: "trường này phải là số" }).min(1, "page không thể nhỏ hơn 0").optional(),
    cover: z.string().min(1, "author không được để trống").optional(),

});
export const bookEditSchema = z.object({
    title: z.string().min(1, "title không được để trống"),
    desc: z.string().min(1, "desc không được để trống"),
    publisher: z.string().min(1, "publisher không được để trống"),
    author: z.string().min(1, "author không được để trống"),
    price: z.number({ message: "trường này phải là số" }).min(1, "price không thể nhỏ hơn 0"),
    stock: z.number({ message: "trường này phải là số" }).min(1, "stock không thể nhỏ hơn 0"),
    page: z.number({ message: "trường này phải là số" }).min(1, "page không thể nhỏ hơn 0").optional(),
    cover: z.string().min(1, "author không được để trống").optional(),


});
