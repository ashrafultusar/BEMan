import { sha256Hash, normalizePhone } from "./hash";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID || "2099027197385101";
const CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";

export interface CapiUserData {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    clientIp?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
}

export interface CapiCustomData {
    currency?: string;
    value?: number;
    content_type?: string;
    content_ids?: string[];
    contents?: Array<{
        id: string;
        quantity: number;
        item_price?: number;
    }>;
    order_id?: string;
    num_items?: number;
    [key: string]: any;
}

export interface SendCapiEventOptions {
    eventName: "Purchase" | "AddToCart" | "InitiateCheckout" | "ViewContent" | string;
    eventId: string;
    eventSourceUrl?: string;
    userData?: CapiUserData;
    customData?: CapiCustomData;
}

/**
 * Send event to Meta Conversions API (CAPI) server-side
 */
export async function sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl,
    userData = {},
    customData = {},
}: SendCapiEventOptions): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const accessToken = process.env.META_CAPI_ACCESS_TOKEN || CAPI_ACCESS_TOKEN;

        if (!accessToken) {
            console.warn("[Meta CAPI] Warning: META_CAPI_ACCESS_TOKEN is missing in environment variables. CAPI request skipped.");
            return { success: false, error: "META_CAPI_ACCESS_TOKEN missing" };
        }

        // Advanced Matching Hashing
        const hashedEmail = userData.email ? await sha256Hash(userData.email) : undefined;
        const hashedPhone = userData.phone ? await sha256Hash(normalizePhone(userData.phone)) : undefined;
        const hashedFirstName = userData.firstName ? await sha256Hash(userData.firstName) : undefined;
        const hashedLastName = userData.lastName ? await sha256Hash(userData.lastName) : undefined;
        const hashedCity = userData.city ? await sha256Hash(userData.city) : undefined;

        // Split first and last name if only full name was passed
        let fn = hashedFirstName;
        let ln = hashedLastName;
        if (!ln && userData.firstName && userData.firstName.includes(" ")) {
            const parts = userData.firstName.trim().split(" ");
            fn = await sha256Hash(parts[0]);
            ln = await sha256Hash(parts.slice(1).join(" "));
        }

        const payloadUserData: Record<string, any> = {
            ...(hashedEmail && { em: [hashedEmail] }),
            ...(hashedPhone && { ph: [hashedPhone] }),
            ...(fn && { fn: [fn] }),
            ...(ln && { ln: [ln] }),
            ...(hashedCity && { ct: [hashedCity] }),
            ...(userData.clientIp && { client_ip_address: userData.clientIp }),
            ...(userData.userAgent && { client_user_agent: userData.userAgent }),
            ...(userData.fbp && { fbp: userData.fbp }),
            ...(userData.fbc && { fbc: userData.fbc }),
        };

        const eventPayload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId,
                    event_source_url: eventSourceUrl || "https://thebemen.com",
                    action_source: "website",
                    user_data: payloadUserData,
                    custom_data: {
                        currency: customData.currency || "BDT",
                        value: customData.value || 0,
                        content_type: customData.content_type || "product",
                        content_ids: customData.content_ids || [],
                        contents: customData.contents || [],
                        ...(customData.order_id && { order_id: customData.order_id }),
                        ...(customData.num_items && { num_items: customData.num_items }),
                    },
                },
            ],
        };

        const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${accessToken}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventPayload),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("[Meta CAPI Error]", result);
            return { success: false, error: result.error?.message || "CAPI Request failed" };
        }

        console.log(`[Meta CAPI Success] Event: ${eventName}, EventID: ${eventId}`, result);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("[Meta CAPI Exception]", error);
        return { success: false, error: error.message || "Failed to dispatch CAPI event" };
    }
}
