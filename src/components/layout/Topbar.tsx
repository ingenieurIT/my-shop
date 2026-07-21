import { Container } from "./Container";

export function Topbar() {
    return (
        <div className="bg-teal-600 text-white dark:bg-teal-700">
            <Container className="flex h-9 items-center justify-center text-center text-xs font-medium sm:text-sm">
                Livraison rapide dans tous les coins du pays !
            </Container>
        </div>
    );
}

export default Topbar;
