import Link from "next/link";
import { Globe, Mail, Send } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

import { Container } from "./Container";

const COMPANY_LINKS = [
    { title: "À propos", href: ROUTES.ABOUT },
    { title: "Boutiques", href: ROUTES.STORES },
    { title: "Contact", href: ROUTES.CONTACT },
];

const HELP_LINKS = [
    { title: "Catégories", href: ROUTES.CATEGORIES },
    { title: "Produits", href: ROUTES.PRODUCTS },
    { title: "Conditions générales", href: "#" },
];

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-slate-100 dark:border-zinc-900 dark:bg-black">
            <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Link<span className="text-teal-600 dark:text-teal-400">IT Deal</span>
                    </span>

                    <p className="mt-3 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                        {APP.DESCRIPTION}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <a
                            href="#"
                            aria-label="Site web"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 transition-colors hover:bg-teal-500/10 hover:text-teal-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-teal-500/20 dark:hover:text-teal-400"
                        >
                            <Globe className="h-4 w-4" />
                        </a>

                        <a
                            href="mailto:ivantchoumi2@gmail.com"
                            aria-label="Email"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 transition-colors hover:bg-teal-500/10 hover:text-teal-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-teal-500/20 dark:hover:text-teal-400"
                        >
                            <Mail className="h-4 w-4" />
                        </a>

                        <a
                            href="#"
                            aria-label="Nous contacter"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 transition-colors hover:bg-teal-500/10 hover:text-teal-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-teal-500/20 dark:hover:text-teal-400"
                        >
                            <Send className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Entreprise
                    </h3>

                    <ul className="mt-4 space-y-2.5">
                        {COMPANY_LINKS.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Aide
                    </h3>

                    <ul className="mt-4 space-y-2.5">
                        {HELP_LINKS.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Contact
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <li>Douala, Cameroun</li>
                        <li>
                            <a
                                href="tel:+237698178327"
                                className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                            >
                                +237 698 178 327
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:ivantchoumi2@gmail.com"
                                className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                            >
                                ivantchoumi2@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>

            <div className="border-t border-zinc-200 dark:border-zinc-900">
                <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-zinc-500 sm:flex-row dark:text-zinc-400">
                    <span>
                        © {new Date().getFullYear()} {APP.COMPANY}. Tous droits réservés.
                    </span>

                    <span>
                        Boutiques GLC &amp; ELS
                    </span>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
