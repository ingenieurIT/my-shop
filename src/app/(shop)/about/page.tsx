import { Container, PageHeader } from "@/components/layout";
import { APP } from "@/constants/app";
import { BadgeCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <PageHeader
                title="À propos de nous"
                breadcrumbItems={[{ label: "À propos" }]}
            />

            <Container className="max-w-4xl py-10">
                {/* En-tête avec le nom et le badge de certification */}
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {APP.NAME}
                    </h2>
                    {/* Badge de certification vert style WhatsApp */}
                    <BadgeCheck className="w-5 h-5" color="#25D366" />

                    {/*<span*/}
                    {/*    className="inline-flex items-center justify-center p-1 bg-teal-500 text-white rounded-full shadow-sm"*/}
                    {/*    title="Compte certifié et vérifié"*/}
                    {/*>*/}
                    {/*    <BadgeCheck className="w-5 h-5" />*/}
                    {/*</span>*/}
                </div>

                {/* Long paragraphe bien structuré */}
                <div className="space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <p>
                        Bienvenue sur <strong className="text-zinc-900 dark:text-zinc-200">{APP.NAME}</strong>, votre partenaire technologique de référence et pôle d&apos;excellence en ingénierie logicielle. Nous incarnons une vision moderne et rigoureuse du commerce numérique et des prestations informatiques, en combinant une expertise technique de pointe avec un sens aigu des affaires. Conçu pour répondre aux exigences des particuliers comme des professionnels, notre écosystème s&apos;impose comme une plateforme centralisée incontournable pour tous vos besoins technologiques.
                    </p>

                    <p>
                        Au-delà d&apos;une simple vitrine commerciale, <strong className="text-zinc-900 dark:text-zinc-200">{APP.NAME}</strong> se positionne comme un véritable cabinet de services technologiques globaux. Portés par une maîtrise approfondie du développement logiciel et des architectures modernes, nous accompagnons nos clients à chaque étape de leur transformation numérique et de leurs acquisitions matérielles.
                    </p>

                    {/* Énumération des services */}
                    <div className="my-8 p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200 mb-4">
                            Nos Pôles d&apos;Expertise & Services :
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">✓</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Vente de matériel haut de gamme :</strong> Équipements informatiques et électroniques rigoureusement sélectionnés (PC portables, composants, accessoires).
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">✓</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Maintenance & Support :</strong> Diagnostic, optimisation, réparation et suivi technique de vos parcs informatiques.
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">✓</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Conseil & Consultation à distance :</strong> Accompagnement sur-mesure pour vos choix technologiques et stratégies d&apos;achat.
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">✓</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Ingénierie & Développement :</strong> Conception sur-mesure de plateformes web, d&apos;applications et de solutions logicielles robustes.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <p>
                        Que vous cherchiez à acquérir du matériel de haute performance, à structurer un projet digital d&apos;envergure ou à bénéficier d&apos;une expertise technique fiable, <strong className="text-zinc-900 dark:text-zinc-200">{APP.NAME}</strong> à vous offrir des solutions sécurisées, rapides et taillées pour la réussite de vos affaires.
                    </p>
                </div>
            </Container>
        </>
    );
}