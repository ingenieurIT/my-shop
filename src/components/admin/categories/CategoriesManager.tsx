"use client";

import { useState, useTransition } from "react";
import type { Category } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { slugify } from "@/lib/slug";
import {
    createCategoryAction,
    deleteCategoryAction,
    updateCategoryAction,
} from "@/actions/category.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type CategoriesManagerProps = {
    categories: Category[];
};

const EMPTY_FORM = { name: "", slug: "", description: "", image: "" };

export function CategoriesManager({ categories }: CategoriesManagerProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [slugTouched, setSlugTouched] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [isPending, startTransition] = useTransition();

    function openCreate() {
        setEditing(null);
        setForm(EMPTY_FORM);
        setSlugTouched(false);
        setSheetOpen(true);
    }

    function openEdit(category: Category) {
        setEditing(category);
        setForm({
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
            image: category.image ?? "",
        });
        setSlugTouched(true);
        setSheetOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const input = {
                name: form.name,
                slug: form.slug,
                description: form.description || undefined,
                image: form.image || undefined,
            };

            const result = editing
                ? await updateCategoryAction(editing.id, input)
                : await createCategoryAction(input);

            if (result.success) {
                toast.success(result.message);
                setSheetOpen(false);
            } else {
                toast.error(result.message);
            }
        });
    }

    function handleDelete() {
        if (!deleteTarget) return;

        startTransition(async () => {
            const result = await deleteCategoryAction(deleteTarget.id);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }

            setDeleteTarget(null);
        });
    }

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <Button
                    type="button"
                    onClick={openCreate}
                    className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter une catégorie
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                    Aucune catégorie pour le moment.
                                </TableCell>
                            </TableRow>
                        )}

                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {category.name}
                                </TableCell>

                                <TableCell className="text-zinc-500 dark:text-zinc-400">
                                    {category.slug}
                                </TableCell>

                                <TableCell className="max-w-xs truncate text-zinc-500 dark:text-zinc-400">
                                    {category.description || "—"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Modifier"
                                            onClick={() => openEdit(category)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Supprimer"
                                            className="text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                                            onClick={() => setDeleteTarget(category)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>
                            {editing ? "Modifier la catégorie" : "Nouvelle catégorie"}
                        </SheetTitle>
                    </SheetHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
                    >
                        <div className="space-y-1.5">
                            <Label htmlFor="cat-name">Nom</Label>
                            <Input
                                id="cat-name"
                                required
                                value={form.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setForm((f) => ({
                                        ...f,
                                        name,
                                        slug: slugTouched ? f.slug : slugify(name),
                                    }));
                                }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="cat-slug">Slug</Label>
                            <Input
                                id="cat-slug"
                                required
                                value={form.slug}
                                onChange={(e) => {
                                    setSlugTouched(true);
                                    setForm((f) => ({ ...f, slug: e.target.value }));
                                }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="cat-description">Description</Label>
                            <Textarea
                                id="cat-description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, description: e.target.value }))
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="cat-image">Image (URL)</Label>
                            <Input
                                id="cat-image"
                                type="url"
                                placeholder="https://..."
                                value={form.image}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, image: e.target.value }))
                                }
                            />
                        </div>

                        <SheetFooter className="px-0">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                            >
                                {isPending ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cette catégorie ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            « {deleteTarget?.name} » sera définitivement supprimée. Cette
                            action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CategoriesManager;
