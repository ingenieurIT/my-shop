import { z } from "zod";

export const storeSchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    logo: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
    city: z.string().optional(),
    website: z.string().optional(),
});

export const categorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    image: z.string().optional(),
});

export const brandSchema = z.object({
    name: z.string().min(2),
    logo: z.string().optional(),
    website: z.string().optional(),
});

export const productSchema = z.object({
    name: z.string().min(2),

    slug: z.string().min(2),

    description: z.string().optional(),

    sku: z.string().optional(),

    price: z.number(),

    oldPrice: z.number().optional(),

    stock: z.number(),

    storeId: z.string(),

    categoryId: z.string(),

    brandId: z.string(),
});