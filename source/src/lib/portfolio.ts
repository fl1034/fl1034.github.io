import type content from "../../public/portfolio.json";

export type Portfolio = typeof content;
export type Project = Portfolio["projects"][number];

export function safeWebUrl(value: string): string | undefined {
    try {
        const url = new URL(value);
        return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
    } catch {
        return undefined;
    }
}

export function safeImage(value: string): string | undefined {
    if (!value || value.startsWith("//") || value.includes("\\")) return undefined;
    if (/^[a-z][a-z\d+.-]*:/i.test(value)) return safeWebUrl(value);
    return value;
}

export function emailHref(email: string): string | undefined {
    return /^[^\s@?\r\n]+@[^\s@?\r\n]+\.[^\s@?\r\n]+$/.test(email) ? `mailto:${encodeURIComponent(email).replace(/%40/g, "@")}` : undefined;
}

export function validatePortfolio(value: unknown): asserts value is Portfolio {
    if (!value || typeof value !== "object") throw new Error("Invalid portfolio");
    const data = value as Portfolio;
    if (typeof data.profile?.name !== "string" || typeof data.profile.email !== "string" || !Array.isArray(data.projects) || !Array.isArray(data.education) || !Array.isArray(data.skills?.groups) || !data.about || !data.site?.labels || !Array.isArray(data.site.navigation) || !data.contact || !data.resume || !data.ui?.contact || !data.ui.navigation || !data.ui.footer || !data.ui.format || !data.ui.metadata) throw new Error("Missing content");
    for (const p of data.projects) if (typeof p.name !== "string" || !Array.isArray(p.technologies) || !Array.isArray(p.roleAndChallenge) || !Array.isArray(p.reflection) || !p.image || !p.source) throw new Error("Invalid project");
}

/** Replace named slots once, leaving visitor input literal (including $ and braces). */
export function formatText(template: string, values: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (slot, key: string) => values[key] ?? slot);
}
