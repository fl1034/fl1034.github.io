"use client";

import {useRef, useState, type FormEvent} from "react";
import {emailHref, formatText, type Portfolio} from "@/lib/portfolio";

export function ContactForm({email, copy: c}: {email: string; copy: Portfolio["ui"]["contact"]}) {
    const [draft, setDraft] = useState<{subject: string; body: string} | null>(null);
    const [status, setStatus] = useState("");
    const preview = useRef<HTMLTextAreaElement>(null);
    const recipient = emailHref(email);
    const inputClass = "mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

    function prepare(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const name = String(values.get("name") ?? "").trim();
        const from = String(values.get("email") ?? "").trim();
        const subject = String(values.get("subject") ?? "").trim();
        const message = String(values.get("message") ?? "").trim();
        if (!name || !subject || !message || !emailHref(from)) {
            setStatus(c.invalid);
            setDraft(null);
            return;
        }
        setDraft({subject, body: formatText(c.bodyTemplate, {message, name, email: from})});
        setStatus(c.ready);
    }

    async function copy() {
        if (!draft) return;
        const text = formatText(c.previewTemplate, {email, subject: draft.subject, body: draft.body});
        try {
            await navigator.clipboard.writeText(text);
            setStatus(c.copied);
        } catch {
            preview.current?.focus();
            preview.current?.select();
            setStatus(c.copyFallback);
        }
    }

    return <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <form noValidate onSubmit={prepare} onChange={() => {setDraft(null); setStatus("");}} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">{c.name}<input className={inputClass} name="name" autoComplete="name" required maxLength={100}/></label>
                <label className="text-sm font-medium">{c.email}<input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254}/></label>
            </div>
            <label className="block text-sm font-medium">{c.subject}<input className={inputClass} name="subject" required maxLength={160}/></label>
            <label className="block text-sm font-medium">{c.message}<textarea className={inputClass} name="message" required rows={5} maxLength={4000}/></label>
            <p className="text-xs leading-relaxed text-muted-foreground">{formatText(c.note, {email})}</p>
            <button type="submit" disabled={!recipient} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85 disabled:opacity-50">{c.prepare}</button>
        </form>
        <p role="status" className="mt-4 text-sm text-muted-foreground">{status}</p>
        {draft && recipient && <div className="mt-4 space-y-3 border-t border-border pt-4">
            <label className="block text-sm font-medium">{c.review}<textarea ref={preview} readOnly rows={8} className={inputClass} value={formatText(c.previewTemplate, {email, subject: draft.subject, body: draft.body})}/></label>
            <div className="flex flex-wrap gap-3">
                <a className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85" href={`${recipient}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>{c.open}</a>
                <button type="button" onClick={copy} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">{c.copy}</button>
            </div>
        </div>}
    </div>;
}
