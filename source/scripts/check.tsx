import React from "react";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {renderToStaticMarkup} from "react-dom/server";
import {parseHTML} from "linkedom";
import {PortfolioView} from "@/components/portfolio-view";
import {TooltipProvider} from "@/components/ui/tooltip";
import {ThemeProvider} from "@/components/theme-provider";
import {validatePortfolio, safeWebUrl, safeImage, emailHref, type Portfolio} from "@/lib/portfolio";

const data: Portfolio = JSON.parse(readFileSync(new URL("../public/portfolio.json", import.meta.url), "utf8"));
validatePortfolio(data);

function render(value: Portfolio) {
    return parseHTML(renderToStaticMarkup(<ThemeProvider attribute="class"><TooltipProvider><PortfolioView
        data={value}/></TooltipProvider></ThemeProvider>)).document;
}

const doc = render(data);
assert.equal(doc.querySelectorAll(".project-card").length, 5);
for (const card of doc.querySelectorAll(".project-card")) {
    assert.equal(card.querySelectorAll("[data-project-section]").length, 5);
    for (const key of ["role", "reflection"]) assert.ok(card.querySelectorAll(`[data-project-section=${key}] li`).length > 1);
    assert.equal(card.querySelectorAll("[data-project-section=artifacts] li").length, 1);
    assert.ok(card.querySelector("img")?.getAttribute("alt"));
}
assert.equal(doc.querySelectorAll('a[href^="mailto:"]').length, 0, "Sample address must not be an active email destination");
const changed = structuredClone(data);
changed.profile.name = "Jordan Student";
changed.profile.email = "jordan@portfolio.dev";
changed.projects[0].demoUrl = "https://demo.portfolio.dev/";
changed.projects[0].description = "A longer project description. ".repeat(50);
const modified = render(changed);
assert.ok(modified.querySelector("main")?.textContent?.includes(changed.projects[0].description));
assert.ok(!modified.querySelector("main")?.textContent?.includes(data.profile.name));
assert.ok(!modified.querySelector("main")?.textContent?.includes(data.profile.email));
assert.equal(modified.querySelector('a[href^="mailto:"]')?.getAttribute("href"), "mailto:jordan@portfolio.dev");
assert.equal(modified.querySelector('#project-multipdf [data-project-section=artifacts] a')?.getAttribute("href"), changed.projects[0].demoUrl);
for (const link of modified.querySelectorAll('a[href^="#"]')) assert.ok(modified.getElementById(link.getAttribute("href")!.slice(1)), "Navigation target exists");
assert.equal(safeWebUrl("javascript:alert(1)"), undefined);
assert.equal(safeImage("//untrusted.example/image.png"), undefined);
assert.equal(emailHref("hello@example.com?bcc=other@example.com"), undefined);
assert.throws(() => validatePortfolio({profile: {}}));
console.log("Passed: five project sections, multiple bullets, complete long content, JSON email/name updates, navigation, demo links, URL safeguards, invalid content.");
