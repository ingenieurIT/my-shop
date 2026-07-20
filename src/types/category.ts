import { Prisma } from "@prisma/client";

export type Category = Prisma.CategoryGetPayload<{}>;

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