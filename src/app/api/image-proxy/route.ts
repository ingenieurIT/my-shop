import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_HOSTNAME_PATTERNS = [
    /^localhost$/i,
    /^127\./,
    /^0\.0\.0\.0$/,
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[0-1])\./,
    /^169\.254\./,
    /^::1$/,
];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_REDIRECTS = 3;

function isBlockedHost(hostname: string) {
    return BLOCKED_HOSTNAME_PATTERNS.some((pattern) => pattern.test(hostname));
}

function isValidTarget(url: string): URL | null {
    let target: URL;
    try {
        target = new URL(url);
    } catch {
        return null;
    }
    if (target.protocol !== "http:" && target.protocol !== "https:") return null;
    if (isBlockedHost(target.hostname)) return null;
    return target;
}

async function fetchWithControlledRedirects(startUrl: string) {
    let currentUrl = startUrl;

    for (let i = 0; i <= MAX_REDIRECTS; i++) {
        const target = isValidTarget(currentUrl);
        if (!target) {
            throw new Error("Blocked or invalid host in redirect chain");
        }

        const response = await fetch(target.toString(), {
            headers: { "User-Agent": "Mozilla/5.0" },
            signal: AbortSignal.timeout(10000),
            redirect: "manual",
        });

        // 3xx -> follow manually after re-validating the target
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("location");
            if (!location) throw new Error("Redirect with no location");
            currentUrl = new URL(location, target).toString();
            continue;
        }

        return response;
    }

    throw new Error("Too many redirects");
}

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const target = isValidTarget(url);
    if (!target) {
        return NextResponse.json({ error: "Invalid or blocked url" }, { status: 400 });
    }

    try {
        const response = await fetchWithControlledRedirects(url);

        if (!response.ok || !response.body) {
            return NextResponse.json(
                { error: "Failed to fetch image" },
                { status: 502 }
            );
        }

        const contentType = response.headers.get("content-type") ?? "";

        if (!contentType.startsWith("image/") || contentType === "image/svg+xml") {
            return NextResponse.json({ error: "Not an allowed image type" }, { status: 415 });
        }

        const contentLength = response.headers.get("content-length");
        if (contentLength && Number(contentLength) > MAX_IMAGE_BYTES) {
            return NextResponse.json({ error: "Image too large" }, { status: 413 });
        }

        // Stream while enforcing a hard byte cap even if content-length is absent/wrong
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let total = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            total += value.byteLength;
            if (total > MAX_IMAGE_BYTES) {
                return NextResponse.json({ error: "Image too large" }, { status: 413 });
            }
            chunks.push(value);
        }

        const buffer = Buffer.concat(chunks);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400, immutable",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch {
        return NextResponse.json({ error: "Fetch error" }, { status: 502 });
    }
}