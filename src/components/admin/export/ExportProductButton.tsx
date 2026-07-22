"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toPng } from "html-to-image";
import { ImageDown } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/product";
import { slugify } from "@/lib/slug";
import { toDataUrl } from "@/lib/image-proxy";
import { withTimeout } from "@/lib/with-timeout";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { POSTER_HEIGHT, POSTER_WIDTH, ProductPoster } from "./ProductPoster";

const PREVIEW_WIDTH = 380;
const SCALE = PREVIEW_WIDTH / POSTER_WIDTH;

const FALLBACK_IMAGE =
    "https://placehold.co/900x900/18181b/71717a/png?text=Produit";

type ExportProductButtonProps = {
    product: Product;
};

export function ExportProductButton({ product }: ExportProductButtonProps) {
    const [open, setOpen] = useState(false);
    const [imagesReady, setImagesReady] = useState(false);
    const [imageMap, setImageMap] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();
    const posterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const imageUrl = product.images[0]?.imageUrl ?? FALLBACK_IMAGE;

        setImagesReady(false);

        toDataUrl(imageUrl)
            .then((dataUrl) => {
                setImageMap({ [imageUrl]: dataUrl });
                setImagesReady(true);
            })
            .catch(() => {
                setImagesReady(true);
            });
    }, [open, product.images]);

    function handleDownload() {
        if (!posterRef.current) return;

        startTransition(async () => {
            try {
                const dataUrl = await withTimeout(
                    toPng(posterRef.current!, {
                        cacheBust: true,
                        pixelRatio: 2,
                        // skipFonts: true,
                    }),
                    20000
                );

                const link = document.createElement("a");
                link.download = `${slugify(product.name)}.png`;
                link.href = dataUrl;
                link.click();

                toast.success("Image téléchargée");
            } catch (error) {
                console.error("Erreur d'export du produit :", error);
                toast.error("Erreur lors de la génération de l'image");
            }
        });
    }

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Exporter en image"
                onClick={() => setOpen(true)}
            >
                <ImageDown className="h-4 w-4" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Exporter « {product.name} »</DialogTitle>
                    </DialogHeader>

                    <div
                        style={{
                            width: POSTER_WIDTH * SCALE,
                            height: POSTER_HEIGHT * SCALE,
                        }}
                        className="mx-auto overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
                    >
                        <div
                            style={{
                                transform: `scale(${SCALE})`,
                                transformOrigin: "top left",
                            }}
                        >
                            <ProductPoster
                                ref={posterRef}
                                product={product}
                                imageMap={imageMap}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            disabled={isPending || !imagesReady}
                            onClick={handleDownload}
                            className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                        >
                            {!imagesReady
                                ? "Préparation..."
                                : isPending
                                  ? "Génération..."
                                  : "Télécharger en PNG"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ExportProductButton;
