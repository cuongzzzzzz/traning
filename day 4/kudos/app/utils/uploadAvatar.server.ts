import { unstable_parseMultipartFormData, unstable_createFileUploadHandler } from "@remix-run/node";
export const uploadAvatar = async (request: Request) => {

    const handler = unstable_createFileUploadHandler({
        directory: `${process.cwd()}/public/uploads`,
        file: ({ filename }) => filename,
        maxPartSize: 50_000_000
    });

    const formData = await unstable_parseMultipartFormData(request, handler);
    const file = formData.get("avatar") as File;

    return {
        imageUrl: `/uploads/${file.name}`,
    };
};
