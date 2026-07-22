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
            name: "Global Link Computers",
            slug: "glc",
            phone: "+237678576464",
            email: "wepnjekanyrholy@gmail.com",
            address: "Douala",
            city: "Douala",
            website: "https://linkit-deal.vercel.app/stores/glc",
        },
    });

    const els = await prisma.store.upsert({
        where: { slug: "els" },
        update: {},
        create: {
            name: "Electronic Local Store",
            slug: "els",
            phone: "+237698178327",
            email: "ngahayannick.2017@gmail.com",
            address: "Yaoundé",
            city: "Yaoundé",
            website: "https://linkit-deal.vercel.app/stores/els",
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

    const laptopCategory = await prisma.category.findUnique({
        where: { slug: "laptop" },
    });

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

    const lenovoBrand = await prisma.brand.findFirst({ where: { name: "Lenovo" } });
    const dellBrand = await prisma.brand.findFirst({ where: { name: "Dell" } });
    const hpBrand = await prisma.brand.findFirst({ where: { name: "HP" } });

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

    // ==========================
    // PRODUITS DE BASE (LES 8 ANNONCES — vendus dans les 2 boutiques avec majoration)
    // ==========================

    const rawProducts = [
        {
            name: "Lenovo ThinkPad P15 Gen 2 – Core i7 11ᵉ Génération",
            slug: "lenovo-thinkpad-p15-gen-2-i7-11g",
            basePrice: 455000,
            brandId: lenovoBrand?.id,
            description: `🔥 Lenovo ThinkPad P15 Gen 2 – Core i7 11ᵉ Génération | NVIDIA RTX | Workstation Professionnelle\n\nUne véritable station de travail mobile haut de gamme, conçue pour les ingénieurs, architectes, designers et professionnels qui travaillent sur des logiciels exigeants.\n\n✅ Configuration :\n✔️ Intel® Core™ i7-11800H 11ᵉ Génération\n✔️ 8 cœurs / 16 threads\n✔️ NVIDIA RTX A2000\n✔️ 32Go RAM (4 slots)\n✔️ 512Go SSD NVMe PCIe\n✔️ Écran 15,6” Full HD\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ GPU NVIDIA professionnel certifié ISV\n✔️ Châssis ThinkPad ultra robuste conforme aux normes MIL-SPEC\n✔️ Système de refroidissement conçu pour les longues charges de travail\n✔️ 4 slots RAM — jusqu’à 128 Go\n✔️ Jusqu’à 3 emplacements SSD NVMe\n✔️ 2 ports Thunderbolt 4\n✔️ USB-C, USB-A & HDMI 2.1\n✔️ Ethernet RJ-45 2.5 Gbps\n✔️ Lecteur de carte SD pleine taille\n✔️ Clavier ThinkPad professionnel rétroéclairé\n\n🚀 Idéal pour :\n✅ AutoCAD, Revit & SolidWorks\n✅ Architecture & ingénierie\n✅ CAO / DAO\n✅ Modélisation & rendu 3D\n✅ Montage vidéo professionnel\n✅ Adobe Creative Cloud\n✅ Data analysis & calculs intensifs\n✅ Développement logiciel\n\n💪 Une machine conçue pour les charges de travail professionnelles les plus exigeantes.\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Lenovo ThinkPad P15 – Mobile Workstation Professionnelle",
            slug: "lenovo-thinkpad-p15-workstation",
            basePrice: 390000,
            brandId: lenovoBrand?.id,
            description: `🔥 Lenovo ThinkPad P15– Mobile Workstation Professionnelle | Puissance & Fiabilité\n\nUne véritable station de travail mobile conçue pour les professionnels qui recherchent une puissance maximale et une excellente stabilité sur les tâches lourdes.\n\n✅ Configuration :\n✔️ Intel® Core™ i7– 10ᵉ Génération\n✔️ NVIDIA Quadro T2000\n✔️ 32 Go RAM (4 slots)\n✔️ 512 Go SSD NVMe M.2\n✔️ Écran 15,6” Full HD\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ GPU NVIDIA Quadro professionnel certifié ISV\n✔️ Châssis ThinkPad extrêmement robuste\n✔️ Système de refroidissement renforcé pour les longues sessions de travail\n✔️ 4 slots RAM pour une grande évolutivité\n✔️ Thunderbolt 3, USB-C, HDMI 2.0 & USB-A\n✔️ RJ-45 Ethernet\n✔️ Lecteur SD\n✔️ Smart Card selon configuration\n✔️ Clavier ThinkPad professionnel rétroéclairé\n✔️ Conçu pour fonctionner de manière stable sous forte charge\n\n🚀 Idéal pour :\n✅ AutoCAD & Revit\n✅ SolidWorks & CAO\n✅ Architecture & ingénierie\n✅ Modélisation 3D\n✅ Montage vidéo 4K\n✅ Adobe Creative Cloud\n✅ Data analysis & calculs complexes\n✅ Développement professionnel\n\n💪 Une machine faite pour travailler dur, pendant longtemps.\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Lenovo ThinkPad P16s Gen 1 – Core i7 12ᵉ Génération",
            slug: "lenovo-thinkpad-p16s-gen-1",
            basePrice: 450000,
            brandId: lenovoBrand?.id,
            description: `🔥 Lenovo ThinkPad P16s Gen 1 – Core i7 12ᵉ Génération | Mobile Workstation 16”\n\nUne station de travail mobile professionnelle qui combine la puissance d’un processeur 12ᵉ génération avec un grand écran 16:10 et une excellente mobilité.\n\n✅ Configuration :\n✔️ Intel® Core™ i7-1260P / i7-1280P – 12ᵉ Génération\n✔️ NVIDIA T550 – 4 Go VRAM dédiés\n✔️ Intel Iris Xe Graphics\n✔️ 16 Go RAM\n✔️ SSD NVMe 512 Go\n✔️ Écran 16” WUXGA (1920 × 1200) IPS Anti-reflet\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ Station de travail professionnelle\n✔️ Grand écran 16” au format 16:10\n✔️ 2 ports Thunderbolt 4\n✔️ HDMI 2.1, USB-A & RJ-45 Ethernet\n✔️ Wi-Fi 6E\n✔️ Clavier rétroéclairé avec pavé numérique\n✔️ Lecteur d’empreintes digitales\n✔️ Webcam avec cache de confidentialité\n\n🚀 Idéal pour :\n✅ AutoCAD & conception technique\n✅ Architecture & ingénierie\n✅ Programmation\n✅ Data analysis\n✅ Photoshop & création de contenu\n✅ Gestion professionnelle\n✅ Multitâche intensif\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Lenovo ThinkPad P15s Gen 2 – Core i7 11ᵉ Génération",
            slug: "lenovo-thinkpad-p15s-gen-2",
            basePrice: 375000,
            brandId: lenovoBrand?.id,
            description: `🔥 Lenovo ThinkPad P15s Gen 2 – Core i7 11ᵉ Génération | NVIDIA Quadro T500 4GB\n\nUne véritable station de travail mobile, conçue pour les ingénieurs, architectes, designers et professionnels qui recherchent puissance graphique et mobilité.\n\n✅ Configuration :\n✔️ Intel® Core™ i7-1185G7 – 11ᵉ Génération\n✔️ NVIDIA Quadro T500 – 4 Go GDDR6 dédiés\n✔️ Intel Iris Xe Graphics\n✔️ 16 Go RAM DDR4\n✔️ SSD NVMe 512 Go\n✔️ Écran 15,6” Full HD IPS Anti-reflet\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ GPU professionnel NVIDIA Quadro\n✔️ Certifié pour les logiciels professionnels\n✔️ 2 ports Thunderbolt 4\n✔️ HDMI 2.0 & USB-A\n✔️ Wi-Fi 6E\n✔️ Batterie avec charge rapide Rapid Charge\n✔️ Clavier ThinkPad professionnel\n✔️ Châssis robuste et durable\n✔️ Seulement environ 1,75 kg\n\n🚀 Idéal pour :\n✅ AutoCAD & SolidWorks\n✅ Architecture & ingénierie\n✅ Modélisation 3D\n✅ Photoshop & Adobe Creative Cloud\n✅ Programmation\n✅ Data analysis\n✅ Montage vidéo léger à avancé\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Lenovo ThinkPad P14s Gen 2 – Mobile Workstation",
            slug: "lenovo-thinkpad-p14s-gen-2",
            basePrice: 300000,
            brandId: lenovoBrand?.id,
            description: `💻 Lenovo ThinkPad P14s Gen 2 – Mobile Workstation\n\n🚀 Puissance graphique dédiée • Performance stable • Fiabilité professionnelle\n\nParfait pour ingénieurs, architectes et designers. Certifiée AutoCAD & SolidWorks.\n\n⚙️ Configuration\n✅ Intel®️ Core™️ i7-1165G7 – 11ᵉ Génération (Turbo jusqu’à 5.0 GHz)\n✅ NVIDIA®️ Quadro T500 – 4 Go dédiée\n✅ 16 Go RAM – multitâche et projets lourds\n✅ 512 Go SSD NVMe – ultra rapide\n✅ Écran 14” Full HD IPS – confort et précision\n\n🔌 Connectivité & Sécurité\n✔ Thunderbolt 4 • USB-C • USB-A • HDMI\n✔ Wi-Fi 6 rapide\n✔ Clavier rétroéclairé • Lecteur d’empreinte digitale\n✔ Testé norme militaire • Poids : 1.47 kg\n\n💼 Idéal pour :\nCAO • Modélisation 3D • Calculs techniques • Mobilité professionnelle\n\n📦 Stock limité. Livraison Douala • Yaoundé • Buea.`,
            images: [
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell XPS 15 9520 – La Puissance dans un Design Premium",
            slug: "dell-xps-15-9520-i9",
            basePrice: 650000,
            brandId: dellBrand?.id,
            description: `🔥 Dell XPS 15 9520 – La Puissance dans un Design Premium\n\nL’un des meilleurs ultrabooks haut de gamme, conçu pour les créateurs de contenu, ingénieurs, développeurs et professionnels exigeants.\n\n✅ Configuration :\n✔️ Intel Core i9-12900H (14 cœurs / 20 threads, jusqu’à 5.4 GHz)\n✔️ 24 Mo de mémoire cache\n✔️ 16 Go DDR5 4800 MHz\n✔️ SSD NVMe 512go\n✔️ NVIDIA GeForce RTX 3050 Ti 4 Go GDDR6\n✔️ Intel Iris Xe Graphics\n✔️ Écran 15,6” Full HD IPS antireflet\n✔️ Clavier rétroéclairé\n✔️ Wi-Fi, Bluetooth, Webcam\n✔️ Windows 11 Original\n\n🚀 Idéal pour le montage vidéo 4K, la modélisation 3D, la programmation, l’IA, Photoshop, Premiere Pro, AutoCAD, SolidWorks et le multitâche intensif.\n\n✨ Châssis premium en aluminium, fin, élégant et ultra performant.\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell XPS 15 9520 4K OLED Tactile – L’Ultrabook Ultime",
            slug: "dell-xps-15-9520-oled",
            basePrice: 600000,
            brandId: dellBrand?.id,
            description: `🔥 Dell XPS 15 9520 4K OLED Tactile – L’Ultrabook Ultime des Créateurs\n\nLe Dell XPS 15 9520 est un ultrabook premium conçu pour les créateurs de contenu, ingénieurs, développeurs et professionnels exigeants. Son superbe écran 4K OLED tactile offre une qualité d’image exceptionnelle.\n\n✅ Configuration :\n✔️ Intel Core i7-12700H (12ᵉ Génération – 14 cœurs / 20 threads, jusqu’à 4.7 GHz)\n✔️ 16 Go DDR5 4800 MHz (extensible jusqu’à 32 Go)\n✔️ SSD NVMe 1 To\n✔️ NVIDIA GeForce RTX 3050 Ti – 4 Go GDDR6\n✔️ Intel Iris Xe Graphics\n✔️ Écran tactile OLED 15,6” 4K / 3.5K InfinityEdge (3456 × 2160)\n✔️ Clavier rétroéclairé\n✔️ Wi-Fi 6, Bluetooth, Webcam HD\n✔️ Windows 11 Original\n\n✨ Fonctionnalités Premium :\n✔️ Châssis en aluminium et fibre de carbone\n✔️ Écran OLED tactile aux couleurs ultra-précises et aux noirs profonds\n✔️ 2 ports Thunderbolt™️ 4\n✔️ USB-C 3.2 Gen 2\n✔️ Lecteur de carte SD pleine taille\n✔️ Batterie haute capacité 86 Wh\n\n🚀 Idéal pour le montage vidéo, CAO, IA, développement et modélisation 3D.\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Latitude 7400 Touchscreen – Core i5 8ᵉ Génération",
            slug: "dell-latitude-7400-touch",
            basePrice: 150000,
            brandId: dellBrand?.id,
            description: `🔥 Dell Latitude 7400 Touchscreen – Core i5 8ᵉ Génération | Premium Business\n\nUn ultrabook professionnel haut de gamme, fin, léger et robuste, conçu pour les professionnels, étudiants et utilisateurs à la recherche d’un laptop premium et fiable.\n\n✅ Configuration :\n✔️ Intel® Core™ i5-8265U / i5-8365U – 8ᵉ Génération\n✔️ 8 Go RAM\n✔️ SSD NVMe 256 Go\n✔️ Écran tactile 14” Full HD (1920 × 1080) Anti-reflet\n✔️ Intel UHD Graphics 620\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ Châssis premium en aluminium / fibre de carbone\n✔️ Ultra léger : environ 1,35 kg\n✔️ Écran tactile réactif\n✔️ Ouverture à 180°\n✔️ Thunderbolt 3 / USB-C\n✔️ HDMI, USB-A & lecteur MicroSD\n✔️ Lecteur d’empreintes digitales\n✔️ Batterie 60 Wh avec charge rapide ExpressCharge\n\n🚀 Idéal pour la bureautique, études, programmation et comptabilité.\n\n🔌 Chargeur inclus.\n🛡️ Garantie.\n🚚 Livraison disponible partout au Cameroun.`,
            images: [
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60"
            ]
        }
    ];

    async function seedStoreProducts(storeId: string, storeSlug: string, priceMarkup: number) {
        console.log(`📦 Insertion des 8 produits exacts pour ${storeSlug} (Majoration: +${priceMarkup} FCFA)...`);

        for (const item of rawProducts) {
            const finalPrice = item.basePrice + priceMarkup;
            const uniqueSlug = `${item.slug}-${storeSlug}`;

            await prisma.product.upsert({
                where: { slug: uniqueSlug },
                update: {},
                create: {
                    name: item.name,
                    slug: uniqueSlug,
                    description: item.description,
                    price: finalPrice,
                    stock: 10,
                    status: "AVAILABLE",
                    storeId: storeId,
                    categoryId: laptopCategory?.id as string,
                    brandId: item.brandId as string,
                    images: {
                        create: item.images.map((url) => ({
                            imageUrl: url,
                        })),
                    },
                },
            });
        }
    }

    // GLC : +25 000 FCFA sur chaque article
    await seedStoreProducts(glc.id, "glc", 25000);

    // ELS : +30 000 FCFA sur chaque article
    await seedStoreProducts(els.id, "els", 30000);

    // ==========================
    // PRODUITS SUPPLÉMENTAIRES (prix fixes, propres à Global Link Computers)
    // ==========================

    const fixedPriceProducts = [
        {
            name: "Dell Latitude 7400 – Core i7 8ᵉ Génération | Premium Business Ultrabook",
            slug: "dell-latitude-7400-i7-8g-glc",
            price: 160000,
            brandId: dellBrand?.id,
            description: `🔥 Dell Latitude 7400 – Core i7 8ᵉ Génération | Premium Business Ultrabook\n\nUn ordinateur portable professionnel premium, fin, léger et puissant, idéal pour les utilisateurs qui recherchent performance, fiabilité et mobilité.\n\n✅ Configuration :\n✔️ Intel® Core™ i7-8665U – 8ᵉ Génération\n✔️ 16 Go RAM DDR4\n✔️ SSD NVMe 256 Go \n✔️ Écran 14” Full HD (1920 × 1080)\n✔️ Intel UHD Graphics 620\n✔️ Windows 11 Pro\n\n✨ Points Forts :\n✔️ Châssis premium robuste\n✔️ Ultra portable — environ 1,5 kg\n✔️ SSD NVMe rapide\n✔️ Webcam compatible Windows Hello selon configuration\n✔️ Lecteur d’empreintes digitales selon configuration\n✔️ Excellente autonomie et charge rapide\n✔️ Idéal pour un usage professionnel intensif\n\n🚀 Idéal pour :\n✅ Bureautique avancée\n✅ Comptabilité & gestion\n✅ Programmation\n✅ Analyse de données\n✅ Visioconférences\n✅ Multitâche intensif\n✅ Étudiants & professionnels\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Latitude 7430 – Ultrabook Premium 14”",
            slug: "dell-latitude-7430-glc",
            price: 250000,
            brandId: dellBrand?.id,
            description: `💼 Dell Latitude 7430 – Ultrabook Premium 14”\n\nUn ordinateur portable professionnel haut de gamme, ultra-fin, léger et puissant, conçu pour les entrepreneurs, dirigeants, développeurs et professionnels exigeants.\n\n✅ Configuration :\n✔️ Intel Core i7 (12ᵉ Génération)\n✔️ 32 Go de RAM \n✔️ SSD NVMe 256\n✔️ Écran 14” Full HD (1920 × 1080) antireflet\n✔️ Châssis premium en fibre carbone \n✔️ 2 ports Thunderbolt™ 4\n✔️ HDMI, USB 3.2, Lecteur MicroSD\n✔️ Webcam Full HD IR avec obturateur de confidentialité\n✔️ Lecteur d’empreintes digitales\n✔️ Windows 11 Pro\n\n🚀 Performances exceptionnelles pour la bureautique avancée, le télétravail, la programmation, les réunions en ligne, la comptabilité, la cybersécurité et le multitâche intensif.\n\n✨ Design élégant, autonomie remarquable et fonctionnalités de sécurité professionnelles pour travailler partout en toute confiance.\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "HP ProBook 640 G8 – Performance, Élégance & Fiabilité",
            slug: "hp-probook-640-g8-glc",
            price: 200000,
            brandId: hpBrand?.id,
            description: `💼 HP ProBook 640 G8 – Performance, Élégance & Fiabilité\n\nUn ordinateur portable professionnel de dernière génération, idéal pour les étudiants, entrepreneurs, entreprises et le télétravail.\n\n✅ Configuration :\n✔️ Intel Core i5 (11ᵉ Génération, jusqu’à 4.6 GHz)\n✔️ 16 Go DDR4 3200 MHz\n✔️ SSD NVMe 256 Go\n✔️ Intel UHD Graphics\n✔️ Écran 14” Full HD (1920 × 1080) IPS antireflet\n✔️ Clavier rétroéclairé\n✔️ Wi-Fi, Bluetooth et Webcam\n✔️ Windows 11 Pro Original\n\n🚀 Démarrage ultra rapide, multitâche fluide et excellente autonomie. Idéal pour la bureautique, les études, la programmation, la comptabilité, les réunions en ligne et les activités professionnelles.\n\n✨ Design fin, robuste et élégant, conçu pour un usage intensif.\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Latitude 5590 Workstation – Performance & Fiabilité",
            slug: "dell-latitude-5590-workstation-glc",
            price: 200000,
            brandId: dellBrand?.id,
            description: `🔥 Dell Latitude 5590 Workstation – Performance & Fiabilité\n\nUne machine puissante conçue pour les professionnels, étudiants en ingénierie, développeurs, graphistes et créateurs de contenu.\n\n✅ Configuration :\n✔️ Intel Core i7-8650U (8ᵉ Génération)\n✔️ 16 Go RAM DDR4 (extensible jusqu’à 64 Go)\n✔️ SSD NVMe 512 Go\n✔️ NVIDIA GeForce MX130 2 Go GDDR5 dédiée\n✔️ Écran 15,6” Full HD\n✔️ Clavier rétroéclairé\n✔️ Lecteur d’empreintes digitales\n✔️ Port USB-C, HDMI et plusieurs ports USB\n\n🚀 Idéal pour la programmation, Photoshop, Illustrator, Premiere Pro, AutoCAD, SolidWorks, les études d’ingénierie, le multitâche avancé et le gaming léger à modéré.\n\n⚡ Démarrage ultra rapide grâce au SSD et excellente fluidité au quotidien.\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Latitude 5531 – High Performance Workstation",
            slug: "dell-latitude-5531-glc",
            price: 329000,
            brandId: dellBrand?.id,
            description: `💼 Dell Latitude 5531 – High Performance Workstation\n\n🔥 Prix promo limité : 329,000 FCFA (offre spéciale 🔥)\n\n🔥 Core i7 12th Gen (Puissance Extrême – Niveau Pro)\n⚡ NVIDIA GeForce MX550 (2GB Dedicated Graphics)\n✳️ RAM 16GB DDR5 (Ultra rapide)\n✳️ SSD 512GB NVMe (Démarrage instantané)\n\n✨ Écran 15.6” Full HD • Design pro robuste\n\n✔️ Workstation moderne pour usage intensif\n✔️ Ultra fluide pour gros Excel, analyse & multitâche lourd\n✔️ Montage vidéo léger & design graphique sans stress\n✔️ Performance supérieure aux EliteBook & ThinkPad classiques\n💼 Idéal pour ingénieurs, analystes, créateurs, entrepreneurs & professionnels exigeants\n\n⚠️ Machine haut de gamme – niveau workstation professionnelle\n\n📍 Douala - Yaoundé - Buea`,
            images: [
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Precision 7750 – Workstation Mobile 17,3”",
            slug: "dell-precision-7750-i7-t1000-glc",
            price: 250000,
            brandId: dellBrand?.id,
            description: `🔥 Dell Precision 7750 – Workstation Mobile 17,3”\n\nLe Dell Precision 7750 est une station de travail professionnelle conçue pour les ingénieurs, architectes, développeurs, monteurs vidéo et créateurs de contenu. Avec son grand écran de 17,3 pouces et sa carte graphique professionnelle dédiée, il offre des performances exceptionnelles pour les tâches les plus exigeantes.\n\n✅ Configuration :\n✔️ Intel Core i7-10850H (10ᵉ Génération)\n✔️ 16 Go (extensible jusqu’à 128 Go)\n✔️ SSD NVMe 512 Go \n✔️ NVIDIA Quadro T1000 4 Go GDDR6 \n✔️ Écran 17,3” Full HD (1920 × 1080) antireflet\n✔️ Windows 11 Pro\n\n✨ Fonctionnalités Premium :\n✔️ Grand écran 17,3” pour un confort de travail maximal\n✔️ Châssis robuste de qualité professionnelle\n✔️ Jusqu’à 4 emplacements SSD NVMe\n✔️ Jusqu’à 128 Go de RAM\n✔️ Thunderbolt™, USB-A, HDMI, RJ-45, lecteur SD et Wi-Fi\n\n🚀 Idéal pour :\n✅ AutoCAD • Revit • SolidWorks • CATIA\n✅ Photoshop • Illustrator • Premiere Pro • DaVinci Resolve\n✅ Développement logiciel\n✅ Modélisation et rendu 3D\n✅ Intelligence artificielle et multitâche intensif\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60"
            ]
        },
        {
            name: "Dell Precision 7750 – Écran 17,3” | Intel Core i5",
            slug: "dell-precision-7750-i5-glc",
            price: 100000,
            brandId: dellBrand?.id,
            description: `💻 Dell Precision 7750 – Écran 17,3” | Intel Core i5\n\nLe Dell Precision 7750 est une station de travail grand format conçue pour les professionnels qui recherchent un grand écran, une excellente évolutivité et une fiabilité à toute épreuve.\n\n✅ Configuration :\n✔️ Intel Core i5-10400H (10ᵉ Génération – jusqu’à 4.6 GHz)\n✔️ Intel UHD Graphics 630\n✔️ Écran 17,3” Full HD (1920 × 1080) antireflet\n✔️ SSD NVMe 256Go\n✔️ RAM 8 Go évolutive jusqu’à 128 Go\n✔️ Windows 11 Pro\n\n✨ Fonctionnalités Premium :\n✔️ Grand écran 17,3” pour un confort de travail optimal\n✔️ Clavier complet avec pavé numérique\n✔️ Jusqu’à 4 emplacements SSD NVMe\n✔️ Jusqu’à 4 emplacements mémoire DDR4\n✔️ Châssis professionnel robuste\n✔️ USB-C / Thunderbolt™, USB-A, HDMI, RJ-45 et lecteur de carte SD (selon configuration)\n\n🚀 Idéal pour la programmation, la virtualisation, la gestion de bases de données, la bureautique avancée, la comptabilité, les études et le multitâche intensif.\n\n🔌 Chargeur inclus.\n🛡️ Garantie GLC.\n🚚 Livraison disponible partout au Cameroun.\n\n📍 Disponible chez Global Link Computers.`,
            images: [
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=60"
            ]
        }
    ];

    console.log(`📦 Insertion des ${fixedPriceProducts.length} produits à prix fixe (GLC uniquement)...`);

    for (const item of fixedPriceProducts) {
        await prisma.product.upsert({
            where: { slug: item.slug },
            update: {},
            create: {
                name: item.name,
                slug: item.slug,
                description: item.description,
                price: item.price,
                stock: 10,
                status: "AVAILABLE",
                storeId: glc.id,
                categoryId: laptopCategory?.id as string,
                brandId: item.brandId as string,
                images: {
                    create: item.images.map((url) => ({
                        imageUrl: url,
                    })),
                },
            },
        });
    }

    console.log("✅ Seed terminé avec succès !");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });