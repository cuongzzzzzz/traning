import path from "path";
import fs from "fs/promises"
export const upload = async (file: any) => {

    if(file.size){
        const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
        const name = `${Date.now()}-${file.name}`
        const filePath = path.join(UPLOAD_DIR, name);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, fileBuffer);
        return { name }
    }
    return {name:null}
};

export const deleteFile = async (url: string) => {
    try {
        await fs.unlink(path.join(process.cwd(), "public", url))
        return true
    } catch (error) {
        return null
    }
}