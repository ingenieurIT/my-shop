import { forwardRef } from "react";
import { Mail, Phone } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { proxiedImageUrl } from "@/lib/image-proxy";
import type { Product } from "@/types/product";

const FALLBACK_IMAGE =
    "https://placehold.co/480x480/f4f4f5/71717a/png?text=Produit";

export const CATALOG_POSTER_WIDTH = 1200;

type CatalogPosterProps = {
    products: Product[];
    title: string;
    subtitle?: string;
    contactPhone?: string | null;
    contactEmail?: string | null;
    imageMap?: Record<string, string>;
};

export const CatalogPoster = forwardRef<HTMLDivElement, CatalogPosterProps>(
    function CatalogPoster(
        { products, title, subtitle, contactPhone, contactEmail, imageMap },
        ref
    ) {
        return (
            <div
                ref={ref}
                style={{ width: CATALOG_POSTER_WIDTH }}
                className="flex shrink-0 flex-col bg-white p-12 font-sans text-zinc-900"
            >
                <div className="flex items-end justify-between border-b-4 border-teal-500 pb-6">
                    <div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900">
                            Link<span className="text-teal-600">IT Deal</span>
                        </span>

                        <h1 className="mt-3 text-4xl font-extrabold text-balance">
                            {title}
                        </h1>

                        {subtitle && (
                            <p className="mt-1 text-base text-zinc-500">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 text-sm font-medium text-zinc-600">
                        {contactPhone && (
                            <span className="flex items-center gap-1.5">
                                <Phone className="h-4 w-4 text-teal-600" />
                                {contactPhone}
                            </span>
                        )}

                        {contactEmail && (
                            <span className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4 text-teal-600" />
                                {contactEmail}
                            </span>
                        )}
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center py-24 text-lg text-zinc-400">
                        Aucun produit disponible pour le moment.
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-4 gap-6">
                        {products.map((product) => {
                            const image =
                                product.images[0]?.imageUrl ?? FALLBACK_IMAGE;
                            const resolvedImage =
                                imageMap?.[image] ?? proxiedImageUrl(image);
                            const specs = product.specifications.slice(0, 2);

                            return (
                                <div
                                    key={product.id}
                                    className="flex flex-col overflow-hidden rounded-xl border-2 border-zinc-100"
                                >
                                    <div className="aspect-square w-full bg-zinc-50">
                                        {/* eslint-disable-next-line @next/next/no-img-element -- captured via html-to-image, not rendered by Next */}
                                        <img
                                            src={resolvedImage}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col p-4">
                                        <p className="line-clamp-2 text-sm leading-snug font-semibold text-zinc-900">
                                            {product.name}
                                        </p>

                                        {specs.length > 0 && (
                                            <ul className="mt-2 space-y-0.5">
                                                {specs.map((spec) => (
                                                    <li
                                                        key={spec.id}
                                                        className="truncate text-xs text-zinc-500"
                                                    >
                                                        {spec.key}: {spec.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <p className="mt-auto pt-3 text-lg font-extrabold text-teal-600">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-10 flex items-center justify-between rounded-xl bg-zinc-900 px-8 py-6 text-white">
                    <span className="text-lg font-bold">
                        Link<span className="text-teal-400">IT Deal</span>
                    </span>

                    <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
                        {contactPhone && (
                            <span className="flex items-center gap-1.5">
                                <Phone className="h-4 w-4 text-teal-400" />
                                {contactPhone}
                            </span>
                        )}

                        {contactEmail && (
                            <span className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4 text-teal-400" />
                                {contactEmail}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default CatalogPoster;
