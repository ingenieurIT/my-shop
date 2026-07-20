export type MockCategory = {
    id: string;
    name: string;
    slug: string;
};

export type MockBrand = {
    id: string;
    name: string;
    slug: string;
};

export type MockProduct = {
    id: string;
    name: string;
    slug: string;
    price: number;
    oldPrice?: number;
    image: string;
    categorySlug: string;
    brandSlug: string;
    specs: string[];
};

export const MOCK_CATEGORIES: MockCategory[] = [
    { id: "cat-1", name: "Ordinateurs portables", slug: "laptop" },
    { id: "cat-2", name: "Ordinateurs de bureau", slug: "desktop" },
    { id: "cat-3", name: "Gaming", slug: "gaming" },
    { id: "cat-4", name: "Moniteurs", slug: "monitor" },
    { id: "cat-5", name: "Accessoires", slug: "accessories" },
    { id: "cat-6", name: "Réseau", slug: "network" },
];

export const MOCK_BRANDS: MockBrand[] = [
    { id: "brand-1", name: "HP", slug: "hp" },
    { id: "brand-2", name: "Dell", slug: "dell" },
    { id: "brand-3", name: "Asus", slug: "asus" },
    { id: "brand-4", name: "Acer", slug: "acer" },
    { id: "brand-5", name: "Lenovo", slug: "lenovo" },
];

export const MOCK_PRODUCTS: MockProduct[] = [
    {
        id: "prod-1",
        name: "Lenovo IdeaPad D330 10GL Intel CDC N4020",
        slug: "lenovo-ideapad-d330-10gl",
        price: 285000,
        oldPrice: 320000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Lenovo+IdeaPad",
        categorySlug: "laptop",
        brandSlug: "lenovo",
        specs: ["RAM - 8 Go", "Processeur - Intel i7", "Écran - 15 pouces"],
    },
    {
        id: "prod-2",
        name: "Dell Inspiron 15 3000",
        slug: "dell-inspiron-15-3000",
        price: 310000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Dell+Inspiron",
        categorySlug: "laptop",
        brandSlug: "dell",
        specs: ["RAM - 8 Go", "Processeur - Intel i5", "Écran - 15 pouces"],
    },
    {
        id: "prod-3",
        name: "Asus VivoBook 15",
        slug: "asus-vivobook-15",
        price: 265000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Asus+VivoBook",
        categorySlug: "laptop",
        brandSlug: "asus",
        specs: ["RAM - 8 Go", "Processeur - Intel i5", "Écran - 15 pouces"],
    },
    {
        id: "prod-4",
        name: "HP Pavilion 14",
        slug: "hp-pavilion-14",
        price: 298000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=HP+Pavilion",
        categorySlug: "laptop",
        brandSlug: "hp",
        specs: ["RAM - 8 Go", "Processeur - Intel i7", "Écran - 14 pouces"],
    },
    {
        id: "prod-5",
        name: "Acer Aspire 5",
        slug: "acer-aspire-5",
        price: 254000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Acer+Aspire",
        categorySlug: "laptop",
        brandSlug: "acer",
        specs: ["RAM - 8 Go", "Processeur - AMD Ryzen 5", "Écran - 15 pouces"],
    },
    {
        id: "prod-6",
        name: "Lenovo ThinkPad E14",
        slug: "lenovo-thinkpad-e14",
        price: 340000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=ThinkPad+E14",
        categorySlug: "laptop",
        brandSlug: "lenovo",
        specs: ["RAM - 16 Go", "Processeur - Intel i7", "Écran - 14 pouces"],
    },
    {
        id: "prod-7",
        name: "Moniteur Dell 24 pouces",
        slug: "dell-monitor-24",
        price: 95000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Dell+Monitor",
        categorySlug: "monitor",
        brandSlug: "dell",
        specs: ["Full HD", "IPS", "75 Hz"],
    },
    {
        id: "prod-8",
        name: "Tour Gaming Asus ROG",
        slug: "asus-rog-gaming-tower",
        price: 620000,
        image: "https://placehold.co/480x360/e4e4e7/3f3f46/png?text=Asus+ROG",
        categorySlug: "gaming",
        brandSlug: "asus",
        specs: ["RTX 4060", "16 Go RAM", "1 To SSD"],
    },
];
