"use client";

import {useRef, useState, type FormEvent} from "react";
import {emailHref} from "@/lib/portfolio";

export function ContactForm({email}: {email: string}) {
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
            setStatus("Enter your name, a valid email address, subject, and message. Spaces alone are not enough.");
            setDraft(null);
            return;
        }
        setDraft({subject, body: `${message}\n\nFrom: ${name}\nReply to: ${from}`});
        setStatus("Your draft is ready. Open your email app to review and send it.");
    }

    async function copy() {
        if (!draft) return;
        const text = `To: ${email}\nSubject: ${draft.subject}\n\n${draft.body}`;
        try {
            await navigator.clipboard.writeText(text);
            setStatus("Draft copied. Paste it into your email app to send it.");
        } catch {
            preview.current?.focus();
            preview.current?.select();
            setStatus("Select and copy the draft below, then paste it into your email app.");
        }
    }

    return <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <form onSubmit={prepare} onChange={() => {setDraft(null); setStatus("");}} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">Your name<input className={inputClass} name="name" autoComplete="name" required maxLength={100}/></label>
                <label className="text-sm font-medium">Your email<input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254}/></label>
            </div>
            <label className="block text-sm font-medium">Subject<input className={inputClass} name="subject" required maxLength={160}/></label>
            <label className="block text-sm font-medium">Message<textarea className={inputClass} name="message" required rows={5} maxLength={4000}/></label>
            <p className="text-xs leading-relaxed text-muted-foreground">Prepare a message for {email}. You’ll review and send it from your email app.</p>
            <button type="submit" disabled={!recipient} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85 disabled:opacity-50">Prepare email draft</button>
        </form>
        <p role="status" className="mt-4 text-sm text-muted-foreground">{status}</p>
        {draft && recipient && <div className="mt-4 space-y-3 border-t border-border pt-4">
            <label className="block text-sm font-medium">Review your draft<textarea ref={preview} readOnly rows={8} className={inputClass} value={`To: ${email}\nSubject: ${draft.subject}\n\n${draft.body}`}/></label>
            <div className="flex flex-wrap gap-3">
                <a className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85" href={`${recipient}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>Open email app</a>
                <button type="button" onClick={copy} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">Copy draft</button>
            </div>
        </div>}
    </div>;
}
