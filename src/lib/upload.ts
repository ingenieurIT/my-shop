export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/webp",
];

export function validateImage(file: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type))
        return false;

    return file.size <= MAX_FILE_SIZE;
}