import type { Store as PrismaStore } from "@prisma/client";

export type Store = PrismaStore;

export interface CreateStoreInput {
    name: string;
    slug: string;
    logo?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    website?: string;
}

export interface UpdateStoreInput {
    name?: string;
    slug?: string;
    logo?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    website?: string;
}

export interface StoreFilters {
    search?: string;
}