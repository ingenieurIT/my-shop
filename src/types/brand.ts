import { Prisma } from "@prisma/client";

export type Brand = Prisma.BrandGetPayload<{}>;

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