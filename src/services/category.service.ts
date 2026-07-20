import { prisma } from "@/lib/prisma";
import {
    CategoryFilters,
    CreateCategoryInput,
    UpdateCategoryInput,
} from "@/types/category";

export async function getCategories(filters?: CategoryFilters) {
    return prisma.category.findMany({
        where: {
            ...(filters?.search && {
                name: {
                    contains: filters.search,
                    mode: "insensitive",
                },
            }),
        },
        orderBy: {
            name: "asc",
        },
    });
}

export async function getCategoryById(id: string) {
    return prisma.category.findUnique({
        where: { id },
        include: {
            products: true,
        },
    });
}

export async function createCategory(
    data: CreateCategoryInput
) {
    return prisma.category.create({
        data,
    });
}

export async function updateCategory(
    id: string,
    data: UpdateCategoryInput
) {
    return prisma.category.update({
        where: { id },
        data,
    });
}

export async function deleteCategory(id: string) {
    return prisma.category.delete({
        where: { id },
    });
}

export async function countCategories() {
    return prisma.category.count();
}