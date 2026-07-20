"use server";

import { revalidatePath } from "next/cache";

import { categorySchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import { errorResponse, successResponse } from "@/lib/response";
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from "@/services/category.service";
import type {
    CreateCategoryInput,
    UpdateCategoryInput,
} from "@/types/category";

function revalidateCategoryPaths() {
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/products");
}

export async function createCategoryAction(input: CreateCategoryInput) {
    const parsed = categorySchema.safeParse({
        ...input,
        slug: input.slug || slugify(input.name),
    });

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const category = await createCategory(parsed.data);
        revalidateCategoryPaths();
        return successResponse(category, "Catégorie créée");
    } catch {
        return errorResponse("Ce slug de catégorie existe déjà");
    }
}

export async function updateCategoryAction(
    id: string,
    input: UpdateCategoryInput
) {
    const parsed = categorySchema.partial().safeParse(input);

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const category = await updateCategory(id, parsed.data);
        revalidateCategoryPaths();
        return successResponse(category, "Catégorie modifiée");
    } catch {
        return errorResponse("Erreur lors de la modification");
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        await deleteCategory(id);
        revalidateCategoryPaths();
        return successResponse(null, "Catégorie supprimée");
    } catch {
        return errorResponse(
            "Impossible de supprimer cette catégorie (des produits y sont associés)"
        );
    }
}
