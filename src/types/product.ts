import { Prisma, ProductStatus } from "@prisma/client";

export type Product = Prisma.ProductGetPayload<{
    include: {
        store: true;
        category: true;
        brand: true;
        images: true;
        specifications: true;
    };
}>;

export interface CreateProductInput {
    name: string;
    slug: string;

    description?: string;

    sku?: string;

    price: number;

    oldPrice?: number;

    stock: number;

    featured?: boolean;

    status?: ProductStatus;

    storeId: string;

    categoryId: string;

    brandId: string;
}

export interface UpdateProductInput {
    name?: string;

    slug?: string;

    description?: string;

    sku?: string;

    price?: number;

    oldPrice?: number;

    stock?: number;

    featured?: boolean;

    status?: ProductStatus;

    storeId?: string;

    categoryId?: string;

    brandId?: string;
}

export interface ProductFilters {
    search?: string;

    categoryId?: string;

    brandId?: string;

    storeId?: string;

    minPrice?: number;

    maxPrice?: number;

    featured?: boolean;

    status?: ProductStatus;
}