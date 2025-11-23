export type FileType = "image" | "video" | "audio";

export const getFileType = (file: File): FileType | null => {
    const type = file.type;
    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.startsWith("audio/")) return "audio";
    return null;
}


/**
 * Converts a File object to a Google AI GenerativePart object.
 * @param file The File object to convert.
 * @returns A promise that resolves with the GenerativePart object.
 */
// FIX: Changed return type to be more specific and correct, resolving a type incompatibility issue in App.tsx.
export const fileToGenerativePart = (file: File, type: FileType): Promise<{ mimeType: string; data: string; }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file.'));
      }
      const base64String = reader.result.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64String,
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
