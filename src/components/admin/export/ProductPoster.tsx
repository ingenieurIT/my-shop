import { forwardRef } from "react";
import { Cpu, HardDrive, MemoryStick, Monitor, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Product } from "@/types/product";

export const POSTER_WIDTH = 1200;
export const POSTER_HEIGHT = 1000;

const FALLBACK_IMAGE =
    "https://placehold.co/900x900/18181b/71717a/png?text=Produit";

function pickIcon(key: string): LucideIcon {
    const normalized = key.toLowerCase();
    if (normalized.includes("ram") || normalized.includes("mémoire")) return MemoryStick;
    if (normalized.includes("disque") || normalized.includes("ssd") || normalized.includes("stockage"))
        return HardDrive;
    if (normalized.includes("processeur") || normalized.includes("cpu") || normalized.includes("core"))
        return Cpu;
    if (normalized.includes("écran") || normalized.includes("pouce")) return Monitor;
    return Cpu;
}

type ProductPosterProps = {
    product: Product;
    imageMap: Record<string, string>;
};

export const ProductPoster = forwardRef<HTMLDivElement, ProductPosterProps>(
    function ProductPoster({ product, imageMap }, ref) {
        const imageUrl = product.images[0]?.imageUrl ?? FALLBACK_IMAGE;
        const resolvedImage = imageMap[imageUrl] ?? FALLBACK_IMAGE;

        const price = new Intl.NumberFormat("fr-FR").format(product.price);
        const specs = product.specifications.slice(0, 4);

        return (
            <div
                ref={ref}
                style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
                className="relative flex flex-col overflow-hidden bg-white"
            >
                {/* accent shapes */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rotate-12 rounded-[3rem] bg-teal-50" />
                <div className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rotate-12 rounded-[2rem] bg-teal-100/60" />

                {/* top bar */}
                <div className="relative z-10 flex items-center justify-between px-16 pt-12">
                    <span className="text-3xl font-bold text-zinc-900">
                        Link<span className="text-teal-600">IT</span> Deal
                    </span>

                    {product.category?.name && (
                        <span className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white">
                            {product.category.name}
                        </span>
                    )}
                </div>

                {/* main content */}
                <div className="relative z-10 grid flex-1 grid-cols-[1fr_1fr] items-center gap-10 px-16 py-8">
                    {/* left: text */}
                    <div className="flex flex-col gap-6">
                        {product.brand?.name && (
                            <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                                {product.brand.name}
                            </span>
                        )}

                        <h1 className="text-5xl font-extrabold leading-tight text-zinc-900">
                            {product.name}
                        </h1>

                        {product.description && (
                            <p className="line-clamp-3 text-base text-zinc-500">
                                {product.description}
                            </p>
                        )}

                        {specs.length > 0 && (
                            <div className="mt-2 flex flex-col gap-3">
                                {specs.map((spec) => {
                                    const Icon = pickIcon(spec.key);
                                    return (
                                        <div key={spec.key} className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                                <Icon className="h-4.5 w-4.5 text-teal-600" />
                                            </span>
                                            <span className="text-base text-zinc-700">
                                                <span className="font-semibold text-zinc-900">
                                                    {spec.key}
                                                </span>{" "}
                                                : {spec.value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-teal-600 px-6 py-3">
                            <span className="text-3xl font-extrabold text-white">
                                {price}
                            </span>
                            <span className="text-lg font-semibold text-teal-50">FCFA</span>
                        </div>
                    </div>

                    {/* right: image */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-3xl border border-zinc-100 shadow-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={resolvedImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* bottom contact bar */}
                <div className="relative z-10 flex items-center justify-between gap-6 bg-zinc-900 px-16 py-5">
                    <div className="flex items-center gap-6 text-sm text-zinc-200">
                        {product.store?.phone && (
                            <span className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-teal-400" />
                                {product.store.phone}
                            </span>
                        )}
                        {product.store?.city && (
                            <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-teal-400" />
                                {product.store.city}
                            </span>
                        )}
                    </div>

                    {product.store?.name && (
                        <span className="text-sm font-semibold text-white">
                            {product.store.name}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

export default ProductPoster;