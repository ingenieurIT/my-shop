import type { Category as PrismaCategory } from "@prisma/client";

export type Category = PrismaCategory;

export interface CreateCategoryInput {
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface UpdateCategoryInput {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
}

export interface CategoryFilters {
    search?: string;
}