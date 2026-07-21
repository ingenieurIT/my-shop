import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { Container, PageHeader } from "@/components/layout";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/services/product.service";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const FALLBACK_IMAGE =
    "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Produit";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) notFound();

    return (
        <>
            <PageHeader
                title={product.name}
                breadcrumbItems={[
                    { label: "Produits", href: "/products" },
                    { label: product.name },
                ]}
            />

            <Container className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-2">
                <ProductGallery
                    images={product.images}
                    productName={product.name}
                    fallbackImage={FALLBACK_IMAGE}
                />

                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {product.name}
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {product.brand.name} · {product.category.name}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                        <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                            {formatPrice(product.price)}
                        </span>

                        {product.oldPrice && (
                            <span className="text-sm text-zinc-400 line-through dark:text-zinc-600">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    {product.description && (
                        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {product.description}
                        </p>
                    )}

                    {product.specifications.length > 0 && (
                        <ul className="mt-6 space-y-2">
                            {product.specifications.map((spec) => (
                                <li
                                    key={spec.id}
                                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                                >
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                                    {spec.key} - {spec.value}
                                </li>
                            ))}
                        </ul>
                    )}

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
                            "mt-8 w-full gap-1.5 bg-teal-600 text-white hover:bg-teal-700 sm:w-auto sm:px-8 dark:bg-teal-600 dark:hover:bg-teal-500"
                        )}
                    >
                        <MessageCircle className="h-4 w-4" />
                        Acheter
                    </a>
                </div>
            </Container>
        </>
    );
}
