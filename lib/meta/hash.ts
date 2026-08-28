import crypto from "crypto";

/**
 * SHA-256 hashing utility for Meta Advanced Matching.
 * Handles both Node.js environment (server) and browser environment (client).
 */
export async function sha256Hash(value: string | number | undefined | null): Promise<string> {
    if (!value) return "";

    // Normalize string: convert to lowercase and trim spaces
    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return "";

    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
        // Browser Web Crypto API
        const encoder = new TextEncoder();
        const data = encoder.encode(normalized);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } else {
        // Node.js Crypto module
        return crypto.createHash("sha256").update(normalized).digest("hex");
    }
}

/**
 * Normalizes phone numbers to standard format before hashing.
 * Converts 017XXXXXXXX -> 88017XXXXXXXX (Bangladesh format) or digits only.
 */
export function normalizePhone(phone: string | number | undefined | null): string {
    if (!phone) return "";
    let digits = String(phone).replace(/\D/g, "");

    if (digits.startsWith("01") && digits.length === 11) {
        digits = "88" + digits; // Add BD country code
    }
    return digits;
}

/**
 * Hash Customer Advanced Matching Data for Meta
 */
export async function hashUserData(userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    zip?: string;
    country?: string;
}) {
    const email = userData.email ? await sha256Hash(userData.email) : undefined;
    const phone = userData.phone ? await sha256Hash(normalizePhone(userData.phone)) : undefined;
    const fn = userData.firstName ? await sha256Hash(userData.firstName) : undefined;
    const ln = userData.lastName ? await sha256Hash(userData.lastName) : undefined;
    const ct = userData.city ? await sha256Hash(userData.city) : undefined;
    const zp = userData.zip ? await sha256Hash(userData.zip) : undefined;
    const country = userData.country ? await sha256Hash(userData.country || "bd") : await sha256Hash("bd");

    return {
        ...(email && { em: email }),
        ...(phone && { ph: phone }),
        ...(fn && { fn }),
        ...(ln && { ln }),
        ...(ct && { ct }),
        ...(zp && { zp }),
        ...(country && { country }),
    };
}
