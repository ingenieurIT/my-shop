"use server";

import { revalidatePath } from "next/cache";

import { storeSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import { errorResponse, successResponse } from "@/lib/response";
import {
    createStore,
    deleteStore,
    updateStore,
} from "@/services/store.service";
import type { CreateStoreInput, UpdateStoreInput } from "@/types/store";

function revalidateStorePaths() {
    revalidatePath("/admin/stores");
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/stores");
}

export async function createStoreAction(input: CreateStoreInput) {
    const parsed = storeSchema.safeParse({
        ...input,
        slug: input.slug || slugify(input.name),
    });

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const store = await createStore(parsed.data);
        revalidateStorePaths();
        return successResponse(store, "Boutique créée");
    } catch {
        return errorResponse("Ce slug de boutique existe déjà");
    }
}

export async function updateStoreAction(
    id: string,
    input: UpdateStoreInput
) {
    const parsed = storeSchema.partial().safeParse(input);

    if (!parsed.success) {
        return errorResponse(
            parsed.error.issues[0]?.message ?? "Données invalides"
        );
    }

    try {
        const store = await updateStore(id, parsed.data);
        revalidateStorePaths();
        return successResponse(store, "Boutique modifiée");
    } catch {
        return errorResponse("Erreur lors de la modification");
    }
}

export async function deleteStoreAction(id: string) {
    try {
        await deleteStore(id);
        revalidateStorePaths();
        return successResponse(null, "Boutique supprimée");
    } catch {
        return errorResponse(
            "Impossible de supprimer cette boutique (des produits ou utilisateurs y sont associés)"
        );
    }
}
