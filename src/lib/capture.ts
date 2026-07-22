import { toPng } from "html-to-image";

import { withTimeout } from "@/lib/with-timeout";

function nextFrame(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

async function waitForImagesReady(node: HTMLElement): Promise<void> {
    const images = Array.from(node.querySelectorAll("img"));

    await Promise.all(
        images.map((img) => {
            if (img.complete && img.naturalWidth > 0) {
                return img.decode().catch(() => undefined);
            }

            return new Promise<void>((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
            }).then(() => img.decode().catch(() => undefined));
        })
    );

    // Safari's foreignObject rendering needs a couple of paint cycles after
    // images finish decoding before it reliably rasterizes them onto canvas.
    await nextFrame();
    await nextFrame();
}

export async function capturePng(
    node: HTMLElement,
    options: { pixelRatio?: number; timeoutMs?: number } = {}
): Promise<string> {
    const { pixelRatio = 2, timeoutMs = 20000 } = options;

    await waitForImagesReady(node);

    const capture = () =>
        withTimeout(toPng(node, { cacheBust: true, pixelRatio }), timeoutMs);

    try {
        return await capture();
    } catch (error) {
        // Safari/iOS occasionally fails the first rasterization pass
        // non-deterministically; one retry resolves it most of the time.
        console.warn("Première tentative d'export échouée, nouvel essai...", error);
        await nextFrame();
        return capture();
    }
}
