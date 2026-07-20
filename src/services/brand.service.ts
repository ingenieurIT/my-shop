import { prisma } from "@/lib/prisma";
import {
    BrandFilters,
    CreateBrandInput,
    UpdateBrandInput,
} from "@/types/brand";

export async function getBrands(filters?: BrandFilters) {
    return prisma.brand.findMany({
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

export async function getBrandById(id: string) {
    return prisma.brand.findUnique({
        where: { id },
        include: {
            products: true,
        },
    });
}

export async function createBrand(data: CreateBrandInput) {
    return prisma.brand.create({
        data,
    });
}

export async function updateBrand(
    id: string,
    data: UpdateBrandInput
) {
    return prisma.brand.update({
        where: { id },
        data,
    });
}

export async function deleteBrand(id: string) {
    return prisma.brand.delete({
        where: { id },
    });
}

export async function countBrands() {
    return prisma.brand.count();
}