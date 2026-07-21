export function proxiedImageUrl(url: string) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

export async function toDataUrl(url: string): Promise<string> {
    const response = await fetch(proxiedImageUrl(url));

    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${url}`);
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
