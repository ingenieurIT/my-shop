import {
    BatteryFull,
    Camera,
    Cpu,
    Gauge,
    HardDrive,
    MemoryStick,
    Monitor,
    Sparkles,
    Weight,
    Wifi,
    type LucideIcon,
} from "lucide-react";

const PATTERNS: [RegExp, LucideIcon][] = [
    [/processeur|cpu|processor/i, Cpu],
    [/ram|m[ée]moire|memory/i, MemoryStick],
    [/stockage|disque|ssd|hdd|storage/i, HardDrive],
    [/[ée]cran|display|screen/i, Monitor],
    [/carte graphique|gpu|graphique|nvidia|geforce|radeon/i, Sparkles],
    [/batterie|battery|autonomie/i, BatteryFull],
    [/poids|weight/i, Weight],
    [/r[ée]seau|wifi|connectivit[ée]/i, Wifi],
    [/cam[ée]ra|webcam/i, Camera],
    [/vitesse|fr[ée]quence|hz|ghz/i, Gauge],
];

export function getSpecIcon(key: string): LucideIcon {
    const match = PATTERNS.find(([pattern]) => pattern.test(key));
    return match ? match[1] : Sparkles;
}
