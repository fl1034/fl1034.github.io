"use client";

import {useEffect, useState} from "react";

type IndexItem = {id: string; label: string};

export function SectionIndex({items, label}: {items: IndexItem[]; label: string}) {
    const [active, setActive] = useState<string | undefined>(items.at(0)?.id);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const sections = items.map(item => ({
                id: item.id, element: document.getElementById(item.id),
            })).filter(item => item.element !== null);
            let current = sections.at(0)?.id;
            const threshold = Math.min(200, window.innerHeight * 0.25);
            for (const section of sections) {
                if (section.element!.getBoundingClientRect().top <= threshold) current = section.id;
            }
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                current = sections.at(-1)?.id;
            }
            setActive(current);
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        schedule();
        window.addEventListener("scroll", schedule, {passive: true});
        window.addEventListener("resize", schedule);
        const observer = new ResizeObserver(schedule);
        observer.observe(document.body);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            observer.disconnect();
        };
    }, [items]);

    return <nav className="section-index" aria-label={label}>
        <ul>{items.map(item => <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
                {item.label}
            </a>
        </li>)}</ul>
    </nav>;
}
