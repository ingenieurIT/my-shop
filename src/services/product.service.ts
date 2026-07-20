import { prisma } from "@/lib/prisma";
import {
    CreateProductInput,
    ProductFilters,
    UpdateProductInput,
} from "@/types/product";

export async function getProducts(filters?: ProductFilters) {
    return prisma.product.findMany({
        where: {
            ...(filters?.search && {
                name: {
                    contains: filters.search,
                    mode: "insensitive",
                },
            }),

            ...(filters?.categoryId && {
                categoryId: filters.categoryId,
            }),

            ...(filters?.brandId && {
                brandId: filters.brandId,
            }),

            ...(filters?.storeId && {
                storeId: filters.storeId,
            }),

            ...(filters?.status && {
                status: filters.status,
            }),

            ...(filters?.featured !== undefined && {
                featured: filters.featured,
            }),

            ...(filters?.minPrice !== undefined ||
            filters?.maxPrice !== undefined
                ? {
                    price: {
                        ...(filters.minPrice !== undefined && {
                            gte: filters.minPrice,
                        }),
                        ...(filters.maxPrice !== undefined && {
                            lte: filters.maxPrice,
                        }),
                    },
                }
                : {}),
        },

        include: {
            store: true,
            brand: true,
            category: true,
            images: true,
            specifications: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getProductById(id: string) {
    return prisma.product.findUnique({
        where: { id },

        include: {
            store: true,
            brand: true,
            category: true,
            images: true,
            specifications: true,
        },
    });
}

export async function getProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },

        include: {
            store: true,
            brand: true,
            category: true,
            images: true,
            specifications: true,
        },
    });
}

export async function createProduct(
    data: CreateProductInput
) {
    return prisma.product.create({
        data,
    });
}

export async function updateProduct(
    id: string,
    data: UpdateProductInput
) {
    return prisma.product.update({
        where: { id },
        data,
    });
}

export async function deleteProduct(id: string) {
    return prisma.product.delete({
        where: { id },
    });
}

export async function countProducts() {
    return prisma.product.count();
}