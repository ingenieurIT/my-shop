import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

const FALLBACK_IMAGE =
    "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Produit";

type ProductCardProps = {
    product: Product;
    priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
    const image = product.images[0]?.imageUrl ?? FALLBACK_IMAGE;

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <Link
                href={`${ROUTES.PRODUCTS}/${product.slug}`}
                className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            >
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-pasted URL, not an allowlisted domain */}
                <img
                    src={image}
                    alt={product.images[0]?.alt || product.name}
                    loading={priority ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <Link href={`${ROUTES.PRODUCTS}/${product.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {product.name}
                    </h3>
                </Link>

                <ul className="space-y-1">
                    {product.specifications.slice(0, 4).map((spec) => (
                        <li
                            key={spec.id}
                            className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"
                        >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                            {spec.key} - {spec.value}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-center gap-2">
                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                        {formatPrice(product.price)}
                    </span>

                    {product.oldPrice && (
                        <span className="text-xs text-zinc-400 line-through dark:text-zinc-600">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>

                <a
                    href={buildWhatsAppLink(
                        product.name,
                        product.price,
                        product.store.phone
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        buttonVariants(),
                        "w-full gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                    )}
                >
                    <MessageCircle className="h-4 w-4" />
                    Acheter
                </a>
            </div>
        </div>
    );
}

export default ProductCard;
