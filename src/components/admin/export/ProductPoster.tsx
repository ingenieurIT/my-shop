import { forwardRef } from "react";
import { MessageCircle, Store } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { proxiedImageUrl } from "@/lib/image-proxy";
import type { Product } from "@/types/product";

import { getSpecIcon } from "./spec-icons";

const FALLBACK_IMAGE =
    "https://placehold.co/900x900/18181b/71717a/png?text=Produit";

export const POSTER_WIDTH = 1080;
export const POSTER_HEIGHT = 1350;

type ProductPosterProps = {
    product: Product;
    imageMap?: Record<string, string>;
};

export const ProductPoster = forwardRef<HTMLDivElement, ProductPosterProps>(
    function ProductPoster({ product, imageMap }, ref) {
        const image = product.images[0]?.imageUrl ?? FALLBACK_IMAGE;
        const resolvedImage = imageMap?.[image] ?? proxiedImageUrl(image);
        const specs = product.specifications.slice(0, 6);

        return (
            <div
                ref={ref}
                style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
                className="relative flex shrink-0 flex-col overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black font-sans text-white"
            >
                <div className="flex items-center justify-between px-14 pt-10">
                    <span className="text-2xl font-bold tracking-tight">
                        Link<span className="text-teal-400">IT Deal</span>
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-zinc-200">
                        <Store className="h-4 w-4" />
                        {product.store.name}
                    </span>
                </div>

                <div className="flex flex-1 items-center justify-center px-16 py-6">
                    {/* eslint-disable-next-line @next/next/no-img-element -- captured via html-to-image, not rendered by Next */}
                    <img
                        src={resolvedImage}
                        alt={product.name}
                        className="max-h-[560px] max-w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
                    />
                </div>

                <div className="px-14">
                    <p className="text-sm font-medium text-teal-400">
                        {product.brand.name} · {product.category.name}
                    </p>

                    <h1 className="mt-1 text-4xl leading-tight font-bold text-balance">
                        {product.name}
                    </h1>

                    {specs.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {specs.map((spec) => {
                                const Icon = getSpecIcon(spec.key);

                                return (
                                    <div
                                        key={spec.id}
                                        className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-4 py-3"
                                    >
                                        <Icon className="h-5 w-5 shrink-0 text-teal-400" />

                                        <div className="min-w-0">
                                            <p className="text-xs text-zinc-400">
                                                {spec.key}
                                            </p>
                                            <p className="truncate text-sm font-semibold text-zinc-50">
                                                {spec.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex items-center justify-between bg-teal-500 px-14 py-8">
                    <div>
                        <p className="text-4xl font-extrabold text-zinc-950">
                            {formatPrice(product.price)}
                        </p>

                        {product.oldPrice && (
                            <p className="text-base font-medium text-zinc-900/60 line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                    </div>

                    {product.store.phone && (
                        <div className="flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
                            <MessageCircle className="h-4 w-4 text-teal-400" />
                            {product.store.phone}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default ProductPoster;
