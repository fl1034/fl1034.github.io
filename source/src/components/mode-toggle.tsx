"use client";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";

export function ModeToggle({className, label}: { className?: string; label: string }) {
    const {resolvedTheme, setTheme} = useTheme();
    return <Button type="button" variant="link" size="icon" className={className}
                   aria-label={label}
                   onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        <SunIcon className="h-full w-full dark:hidden"/><MoonIcon className="hidden h-full w-full dark:block"/>
    </Button>;
}
