import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Début du seed...");

    // ==========================
    // STORES
    // ==========================

    const glc = await prisma.store.upsert({
        where: { slug: "glc" },
        update: {},
        create: {
            name: "GLC Informatique",
            slug: "glc",
            phone: "+237690000000",
            email: "contact@glc.cm",
            address: "Douala",
            city: "Douala",
            website: "https://glc.cm",
        },
    });

    const els = await prisma.store.upsert({
        where: { slug: "els" },
        update: {},
        create: {
            name: "ELS Informatique",
            slug: "els",
            phone: "+237680000000",
            email: "contact@els.cm",
            address: "Yaoundé",
            city: "Yaoundé",
            website: "https://els.cm",
        },
    });

    // ==========================
    // CATÉGORIES
    // ==========================

    const categories = [
        { name: "Ordinateurs portables", slug: "laptop" },
        { name: "Ordinateurs de bureau", slug: "desktop" },
        { name: "Gaming", slug: "gaming" },
        { name: "Moniteurs", slug: "monitor" },
        { name: "Accessoires", slug: "accessories" },
        { name: "Réseau", slug: "network" },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }

    // ==========================
    // MARQUES
    // ==========================

    const brands = ["HP", "Dell", "Asus", "Acer", "Lenovo"];

    for (const name of brands) {
        const existing = await prisma.brand.findFirst({ where: { name } });

        if (!existing) {
            await prisma.brand.create({ data: { name } });
        }
    }

    // ==========================
    // ADMIN
    // ==========================

    const password = await bcrypt.hash("Admin12345", 10);

    await prisma.user.upsert({
        where: {
            email: "admin@linkitdeal.com",
        },
        update: {},
        create: {
            firstName: "Super",
            lastName: "Admin",
            email: "admin@linkitdeal.com",
            password,
            role: UserRole.SUPER_ADMIN,
        },
    });

    console.log("✅ Seed terminé !");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });