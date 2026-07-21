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

function isBlockedHost(hostname: string) {
    return BLOCKED_HOSTNAME_PATTERNS.some((pattern) => pattern.test(hostname));
}

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    let target: URL;

    try {
        target = new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    if (target.protocol !== "http:" && target.protocol !== "https:") {
        return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
    }

    if (isBlockedHost(target.hostname)) {
        return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
    }

    try {
        const response = await fetch(target.toString(), {
            headers: { "User-Agent": "Mozilla/5.0" },
            signal: AbortSignal.timeout(10000),
            cache: "force-cache",
        });

        if (!response.ok || !response.body) {
            return NextResponse.json(
                { error: "Failed to fetch image" },
                { status: 502 }
            );
        }

        const contentType = response.headers.get("content-type") ?? "";

        if (!contentType.startsWith("image/")) {
            return NextResponse.json({ error: "Not an image" }, { status: 415 });
        }

        return new NextResponse(response.body, {
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
