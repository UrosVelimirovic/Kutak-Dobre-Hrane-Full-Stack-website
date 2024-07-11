import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

export function savePic(ime: string, data: string, folder: string): string { // returns path
    if (data == "") {
        return "DEFAULT";
    }//../backend/src/profile_pics/
    const path: string = "../backend/src/" + folder + "/" + ime;
    fs.writeFileSync(path, data);
    return "USER";
}

export function loadPic(ime: string, folder: string): string {
    let path: string = "../backend/src/" + folder + "/" + ime
    const data: string = fs.readFileSync(path, 'utf-8');
    return data;
}

export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fsPromises.unlink(filePath);
        console.log(`File deleted successfully: ${filePath}`);
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
    }
}

export async function renameFile(oldPath: string, newPath: string): Promise<void> {
    try {
        await fs.promises.rename(oldPath, newPath);
        console.log(`File renamed from ${oldPath} to ${newPath}`);
    } catch (err) {
        console.error(`Error renaming file: ${err}`);
        throw err;
    }
}