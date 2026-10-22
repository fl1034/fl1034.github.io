"use client";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";

export function ModeToggle({className}: { className?: string }) {
    const {resolvedTheme, setTheme} = useTheme();
    return <Button type="button" variant="link" size="icon" className={className}
                   aria-label="Toggle light or dark theme"
                   onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        <SunIcon className="h-full w-full dark:hidden"/><MoonIcon className="hidden h-full w-full dark:block"/>
    </Button>;
}
