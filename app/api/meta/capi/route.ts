import { NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/meta/capi";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { eventName, eventId, eventSourceUrl, userData, customData } = body;

        if (!eventName || !eventId) {
            return NextResponse.json(
                { success: false, error: "eventName and eventId are required." },
                { status: 400 }
            );
        }

        // Extract client IP and User Agent headers for Meta CAPI
        const clientIp =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "";
        const userAgent = req.headers.get("user-agent") || "";

        const combinedUserData = {
            ...userData,
            clientIp: userData?.clientIp || clientIp,
            userAgent: userData?.userAgent || userAgent,
        };

        const result = await sendCapiEvent({
            eventName,
            eventId,
            eventSourceUrl: eventSourceUrl || req.headers.get("referer") || "https://thebemen.com",
            userData: combinedUserData,
            customData,
        });

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: result.data });
    } catch (error: any) {
        console.error("Meta CAPI Route Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
