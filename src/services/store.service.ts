import { prisma } from "@/lib/prisma";
import {
    CreateStoreInput,
    StoreFilters,
    UpdateStoreInput,
} from "@/types/store";

export async function getStores(filters?: StoreFilters) {
    return prisma.store.findMany({
        where: {
            ...(filters?.search && {
                OR: [
                    {
                        name: {
                            contains: filters.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        city: {
                            contains: filters.search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        },
        orderBy: {
            name: "asc",
        },
    });
}

export async function getStoreById(id: string) {
    return prisma.store.findUnique({
        where: { id },
        include: {
            products: true,
            users: true,
        },
    });
}

export async function getStoreBySlug(slug: string) {
    return prisma.store.findUnique({
        where: { slug },
    });
}

export async function createStore(data: CreateStoreInput) {
    return prisma.store.create({
        data,
    });
}

export async function updateStore(
    id: string,
    data: UpdateStoreInput
) {
    return prisma.store.update({
        where: { id },
        data,
    });
}

export async function deleteStore(id: string) {
    return prisma.store.delete({
        where: { id },
    });
}

export async function countStores() {
    return prisma.store.count();
}