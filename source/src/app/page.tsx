"use client";
import {useEffect, useState} from "react";
import {PortfolioView} from "@/components/portfolio-view";
import content from "../../public/portfolio.json";
import {validatePortfolio, type Portfolio} from "@/lib/portfolio";

export default function Page() {
    const [data, setData] = useState<Portfolio | null>(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        fetch(new URL("portfolio.json", document.baseURI), {cache: "no-store", signal: controller.signal})
            .then(response => {
                if (!response.ok) throw new Error("Content unavailable");
                return response.json();
            })
            .then(value => {
                validatePortfolio(value);
                setData(value);
            })
            .catch(err => {
                if (err.name !== "AbortError") setError(true);
            });
        return () => controller.abort();
    }, []);
    if (error) return <main id="main" role="alert"><h1 className="text-2xl font-semibold">{content.ui.shell.errorTitle}</h1><p className="mt-4 text-muted-foreground">{content.ui.shell.errorDescription}</p></main>;
    if (!data) return <main id="main" aria-busy="true" className="min-h-[50vh]"><p className="text-muted-foreground"
                                                                                   role="status">{content.ui.shell.loading}</p>
    </main>;
    return <PortfolioView data={data}/>;
}
