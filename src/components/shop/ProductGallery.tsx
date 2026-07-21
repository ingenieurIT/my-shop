"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type GalleryImage = {
    id: string;
    imageUrl: string;
    alt: string | null;
};

type ProductGalleryProps = {
    images: GalleryImage[];
    productName: string;
    fallbackImage: string;
};

export function ProductGallery({
    images,
    productName,
    fallbackImage,
}: ProductGalleryProps) {
    const items: GalleryImage[] =
        images.length > 0
            ? images
            : [{ id: "fallback", imageUrl: fallbackImage, alt: productName }];

    const [index, setIndex] = useState(0);
    const current = items[index];
    const hasMultiple = items.length > 1;

    function showPrev() {
        setIndex((i) => (i - 1 + items.length) % items.length);
    }

    function showNext() {
        setIndex((i) => (i + 1) % items.length);
    }

    return (
        <div>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-pasted URL, not an allowlisted domain */}
                <img
                    src={current.imageUrl}
                    alt={current.alt || productName}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {hasMultiple && (
                    <>
                        <button
                            type="button"
                            onClick={showPrev}
                            aria-label="Image précédente"
                            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm transition-colors hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Image suivante"
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm transition-colors hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white">
                            {index + 1} / {items.length}
                        </div>
                    </>
                )}
            </div>

            {hasMultiple && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                    {items.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Voir l'image ${i + 1}`}
                            aria-current={i === index}
                            className={cn(
                                "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                                i === index
                                    ? "border-teal-500"
                                    : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                            )}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-pasted URL, not an allowlisted domain */}
                            <img
                                src={item.imageUrl}
                                alt={item.alt || productName}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductGallery;
