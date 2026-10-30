/* eslint-disable @next/next/no-css-tags -- Relative, self-hosted fonts keep the static export portable. */
import {ThemeProvider} from "@/components/theme-provider";
import {TooltipProvider} from "@/components/ui/tooltip";
import {FlickeringGrid} from "@/components/magicui/flickering-grid";
import {formatText} from "@/lib/portfolio";
import type {Metadata} from "next";
import "./globals.css";
import content from "../../public/portfolio.json";

export const metadata: Metadata = {
    title: formatText(content.ui.metadata.title, {name: content.profile.name, role: content.profile.role}),
    description: content.ui.metadata.description,
    icons: {icon: "assets/favicon.svg"}
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    return <html lang={content.ui.language} suppressHydrationWarning>
    <head>
        <link rel="stylesheet" href="assets/fonts/geist.css"/>
    </head>
    <body className="font-sans min-h-screen bg-background antialiased relative">
    <ThemeProvider attribute="class" defaultTheme="light"><TooltipProvider delayDuration={0}>
        <a href="#main" className="skip-link">{content.ui.shell.skipLink}</a>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[100px] overflow-hidden z-0 motion-reduce:hidden">
            <FlickeringGrid squareSize={2} gridGap={2} className="h-full w-full" style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)"
            }}/>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto py-12 pb-32 sm:pt-24 px-6">{children}</div>
        <noscript><p className="px-6">{content.ui.shell.noScript}</p></noscript>
    </TooltipProvider></ThemeProvider>
    </body>
    </html>;
}
