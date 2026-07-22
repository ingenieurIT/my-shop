import type { Brand as PrismaBrand } from "@prisma/client";

export type Brand = PrismaBrand;

export interface CreateBrandInput {
    name: string;
    logo?: string;
    website?: string;
}

export interface UpdateBrandInput {
    name?: string;
    logo?: string;
    website?: string;
}

export interface BrandFilters {
    search?: string;
}