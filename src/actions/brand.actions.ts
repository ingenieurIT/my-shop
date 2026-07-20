"use server";

import { revalidatePath } from "next/cache";

import { brandSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/response";
import {
    createBrand,
    deleteBrand,
    updateBrand,
} from "@/services/brand.service";
import type { CreateBrandInput, UpdateBrandInput } from "@/types/brand";

function revalidateBrandPaths() {
    revalidatePath("/admin/brands");
    revalidatePath("/");
    revalidatePath("/products");
}

export async function createBrandAction(input: CreateBrandInput) {
    const parsed = brandSchema.safeParse(input);

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const brand = await createBrand(parsed.data);
        revalidateBrandPaths();
        return successResponse(brand, "Marque créée");
    } catch {
        return errorResponse("Erreur lors de la création de la marque");
    }
}

export async function updateBrandAction(
    id: string,
    input: UpdateBrandInput
) {
    const parsed = brandSchema.partial().safeParse(input);

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const brand = await updateBrand(id, parsed.data);
        revalidateBrandPaths();
        return successResponse(brand, "Marque modifiée");
    } catch {
        return errorResponse("Erreur lors de la modification");
    }
}

export async function deleteBrandAction(id: string) {
    try {
        await deleteBrand(id);
        revalidateBrandPaths();
        return successResponse(null, "Marque supprimée");
    } catch {
        return errorResponse(
            "Impossible de supprimer cette marque (des produits y sont associés)"
        );
    }
}
