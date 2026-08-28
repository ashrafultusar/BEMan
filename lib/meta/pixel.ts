"use client";

import { hashUserData } from "./hash";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2099027197385101";

/**
 * Generate a unique eventId for deduplication between Pixel and CAPI
 */
export function generateEventId(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return `evt_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    }
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

/**
 * Trigger Meta Pixel Event with eventId for deduplication & Advanced Matching
 */
export const trackPixelEvent = async (
    eventName: string,
    customData: Record<string, any> = {},
    eventId?: string,
    userData?: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
    }
) => {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn(`[Meta Pixel] fbq is not loaded. Event skipped: ${eventName}`);
        return;
    }

    const options: Record<string, any> = {};
    if (eventId) {
        options.eventID = eventId;
    }

    // Handle Advanced Matching if user data provided
    if (userData) {
        const hashedUser = await hashUserData(userData);
        window.fbq("init", FB_PIXEL_ID, hashedUser);
    }

    window.fbq("track", eventName, customData, options);
    console.log(`[Meta Pixel Tracked] ${eventName}`, { customData, options });
};

/**
 * E-commerce ViewContent Event
 */
export const fbqViewContent = (params: {
    content_name: string;
    content_ids: string[];
    content_type?: string;
    value: number;
    currency?: string;
    category?: string;
}, eventId?: string) => {
    trackPixelEvent("ViewContent", {
        content_name: params.content_name,
        content_ids: params.content_ids,
        content_type: params.content_type || "product",
        value: params.value,
        currency: params.currency || "BDT",
        content_category: params.category || "Apparel",
    }, eventId);
};

/**
 * E-commerce AddToCart Event
 */
export const fbqAddToCart = (params: {
    content_name: string;
    content_ids: string[];
    content_type?: string;
    value: number;
    currency?: string;
    size?: string;
    quantity?: number;
}, eventId?: string) => {
    trackPixelEvent("AddToCart", {
        content_name: params.content_name,
        content_ids: params.content_ids,
        content_type: params.content_type || "product",
        value: params.value,
        currency: params.currency || "BDT",
        num_items: params.quantity || 1,
        size: params.size,
    }, eventId);
};

/**
 * E-commerce InitiateCheckout Event
 */
export const fbqInitiateCheckout = (params: {
    content_ids: string[];
    content_type?: string;
    value: number;
    currency?: string;
    num_items: number;
}, eventId?: string) => {
    trackPixelEvent("InitiateCheckout", {
        content_ids: params.content_ids,
        content_type: params.content_type || "product",
        value: params.value,
        currency: params.currency || "BDT",
        num_items: params.num_items,
    }, eventId);
};

/**
 * E-commerce Purchase Event
 */
export const fbqPurchase = (
    params: {
        content_ids: string[];
        content_type?: string;
        value: number;
        currency?: string;
        order_id: string;
        num_items: number;
    },
    eventId: string,
    userData?: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
    }
) => {
    trackPixelEvent("Purchase", {
        content_ids: params.content_ids,
        content_type: params.content_type || "product",
        value: params.value,
        currency: params.currency || "BDT",
        order_id: params.order_id,
        num_items: params.num_items,
    }, eventId, userData);
};

/**
 * Custom Lead/Contact Event for WhatsApp order clicks
 */
export const fbqContact = (params: {
    content_name: string;
    content_id: string;
    value: number;
    currency?: string;
}, eventId?: string) => {
    trackPixelEvent("Contact", {
        content_name: params.content_name,
        content_ids: [params.content_id],
        content_type: "product",
        value: params.value,
        currency: params.currency || "BDT",
        contact_method: "WhatsApp",
    }, eventId);
};

