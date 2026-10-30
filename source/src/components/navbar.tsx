"use client";
import {Dock, DockIcon} from "@/components/magicui/dock";
import {ModeToggle} from "@/components/mode-toggle";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipArrow, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Home, FolderCode, Code2, Mail, User, FileText} from "lucide-react";

import type {Portfolio} from "@/lib/portfolio";

const icons: Record<string, typeof Home> = {
    hero: Home,
    about: User,
    projects: FolderCode,
    skills: Code2,
    resume: FileText,
    contact: Mail
};
export default function Navbar({items, copy}: { items: { id: string; label: string }[]; copy: Portfolio["ui"]["navigation"] }) {
    return <nav aria-label={copy.label}
                className="portfolio-dock pointer-events-none fixed inset-x-0 bottom-4 z-30">
        <Dock magnification={48}
              className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
            {items.map(item => {
                const Icon = icons[item.id] || Home;
                return <Tooltip key={item.id}>
                    <TooltipTrigger asChild><a href={`#${item.id}`} aria-label={item.label} className="rounded-full">
                        <DockIcon
                            className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"><Icon
                            className="size-full" aria-hidden="true"/></DockIcon>
                    </a></TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8}
                                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm">
                        <p>{item.label}</p><TooltipArrow className="fill-primary"/></TooltipContent>
                </Tooltip>;
            })}
            <Separator orientation="vertical" className="h-2/3 m-auto w-px bg-border"/>
            <DockIcon
                className="rounded-3xl size-full bg-background border border-border text-muted-foreground hover:text-foreground"><ModeToggle
                className="size-full" label={copy.themeToggle}/></DockIcon>
        </Dock>
    </nav>;
}
