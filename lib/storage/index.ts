export interface StorageProvider { upload(file: File, path: string): Promise<{ url: string }>; remove(path: string): Promise<void>; }
export const storage: StorageProvider = { async upload() { throw new Error("Storage provider is not configured"); }, async remove() { throw new Error("Storage provider is not configured"); } };
