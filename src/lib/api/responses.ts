import { NextResponse } from "next/server";

export function ok(data: unknown, status = 200) {
    return NextResponse.json(data, { status });
}

export function badRequest(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
}

export function notFound() {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
}
