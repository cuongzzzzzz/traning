// import z from "zod"
// export const bookSchema = z.object({
//     title: z.string().min(1, "title không được để trống"),
//     desc: z.string().min(1, "desc không được để trống"),
//     publisher: z.string().min(1, "publisher không được để trống"),
//     author: z.string().min(1, "author không được để trống"),
//     price: z.number({ message: "trường này phải là số" }).min(1, "price không thể nhỏ hơn 0"),
//     stock: z.number({ message: "trường này phải là số" }).min(1, "stock không thể nhỏ hơn 0"),
//     page: z.number({ message: "trường này phải là số" }).min(1, "page không thể nhỏ hơn 0").optional(),
//     cover: z.string().min(1, "author không được để trống").optional(),

// });
// export const bookEditSchema = z.object({
//     title: z.string().min(1, "title không được để trống"),
//     desc: z.string().min(1, "desc không được để trống"),
//     publisher: z.string().min(1, "publisher không được để trống"),
//     author: z.string().min(1, "author không được để trống"),
//     price: z.number({ message: "trường này phải là số" }).min(1, "price không thể nhỏ hơn 0"),
//     stock: z.number({ message: "trường này phải là số" }).min(1, "stock không thể nhỏ hơn 0"),
//     page: z.number({ message: "trường này phải là số" }).min(1, "page không thể nhỏ hơn 0").optional(),
//     cover: z.string().min(1, "author không được để trống").optional(),


// });

export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
        return "Please enter a valid email address"
    }
}

export const validatePassword = (password: string): string | undefined => {
    if (password.length < 5) {
        return "Please enter a password that is at least 5 characters long"
    }
}

export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Please enter a value`
}