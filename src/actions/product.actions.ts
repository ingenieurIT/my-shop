"use server";

import { revalidatePath } from "next/cache";
import { ProductStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import { errorResponse, successResponse } from "@/lib/response";
import { deleteProduct } from "@/services/product.service";
import type { CreateProductInput } from "@/types/product";

export type ProductImageInput = {
    imageUrl: string;
    alt?: string;
};

export type ProductSpecInput = {
    key: string;
    value: string;
};

export type ProductActionInput = CreateProductInput & {
    images?: ProductImageInput[];
    specifications?: ProductSpecInput[];
    featured?: boolean;
    status?: ProductStatus;
};

function revalidateProductPaths() {
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/products/[slug]", "page");
    revalidatePath("/stores");
}

function cleanList<T extends Record<string, string | undefined>>(
    items: T[] | undefined,
    requiredKey: keyof T
) {
    return (items ?? []).filter((item) => item[requiredKey]?.trim());
}

export async function createProductAction(input: ProductActionInput) {
    const { images, specifications, ...productFields } = input;

    const parsed = productSchema.safeParse({
        ...productFields,
        slug: productFields.slug || slugify(productFields.name),
    });

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    const cleanImages = cleanList(images, "imageUrl");
    const cleanSpecs = cleanList(specifications, "key");

    try {
        const product = await prisma.product.create({
            data: {
                ...parsed.data,
                featured: input.featured ?? false,
                status: input.status ?? ProductStatus.AVAILABLE,
                images: {
                    create: cleanImages.map((image, index) => ({
                        imageUrl: image.imageUrl,
                        alt: image.alt,
                        position: index,
                    })),
                },
                specifications: {
                    create: cleanSpecs.map((spec) => ({
                        key: spec.key,
                        value: spec.value,
                    })),
                },
            },
        });

        revalidateProductPaths();
        return successResponse(product, "Produit créé");
    } catch {
        return errorResponse(
            "Erreur lors de la création du produit (slug ou SKU déjà utilisé ?)"
        );
    }
}

export async function updateProductAction(
    id: string,
    input: ProductActionInput
) {
    const { images, specifications, ...productFields } = input;

    const parsed = productSchema.partial().safeParse(productFields);

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    const cleanImages = cleanList(images, "imageUrl");
    const cleanSpecs = cleanList(specifications, "key");

    try {
        const product = await prisma.$transaction(async (tx) => {
            await tx.productImage.deleteMany({ where: { productId: id } });
            await tx.productSpecification.deleteMany({
                where: { productId: id },
            });

            return tx.product.update({
                where: { id },
                data: {
                    ...parsed.data,
                    ...(input.featured !== undefined && {
                        featured: input.featured,
                    }),
                    ...(input.status && { status: input.status }),
                    images: {
                        create: cleanImages.map((image, index) => ({
                            imageUrl: image.imageUrl,
                            alt: image.alt,
                            position: index,
                        })),
                    },
                    specifications: {
                        create: cleanSpecs.map((spec) => ({
                            key: spec.key,
                            value: spec.value,
                        })),
                    },
                },
            });
        });

        revalidateProductPaths();
        return successResponse(product, "Produit modifié");
    } catch {
        return errorResponse("Erreur lors de la modification du produit");
    }
}

export async function deleteProductAction(id: string) {
    try {
        await deleteProduct(id);
        revalidateProductPaths();
        return successResponse(null, "Produit supprimé");
    } catch {
        return errorResponse("Erreur lors de la suppression du produit");
    }
}
