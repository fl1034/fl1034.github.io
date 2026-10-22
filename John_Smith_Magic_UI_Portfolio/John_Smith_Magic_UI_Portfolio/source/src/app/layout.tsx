/* eslint-disable @next/next/no-css-tags -- Relative, self-hosted fonts keep the static export portable. */
import {ThemeProvider} from "@/components/theme-provider";
import {TooltipProvider} from "@/components/ui/tooltip";
import {FlickeringGrid} from "@/components/magicui/flickering-grid";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Student developer portfolio",
    description: "Student portfolio: education, programming skills, and AI projects.",
    icons: {icon: "assets/favicon.svg"}
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    return <html lang="en" suppressHydrationWarning>
    <head>
        <link rel="stylesheet" href="assets/fonts/geist.css"/>
    </head>
    <body className="font-sans min-h-screen bg-background antialiased relative">
    <ThemeProvider attribute="class" defaultTheme="light"><TooltipProvider delayDuration={0}>
        <a href="#main" className="skip-link">Skip to content</a>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[100px] overflow-hidden z-0 motion-reduce:hidden">
            <FlickeringGrid squareSize={2} gridGap={2} className="h-full w-full" style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)"
            }}/>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto py-12 pb-32 sm:pt-24 px-6">{children}</div>
        <noscript><p className="px-6">Enable JavaScript to load the portfolio content.</p></noscript>
    </TooltipProvider></ThemeProvider>
    </body>
    </html>;
}
