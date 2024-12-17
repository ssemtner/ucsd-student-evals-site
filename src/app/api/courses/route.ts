import { getCourses } from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    const page = url.searchParams.get("page") || "1";
    const res = await getCourses(query, parseInt(page));

    return NextResponse.json(res);
}
