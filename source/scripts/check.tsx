import React from "react";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {renderToStaticMarkup} from "react-dom/server";
import {parseHTML} from "linkedom";
import {PortfolioView} from "@/components/portfolio-view";
import {TooltipProvider} from "@/components/ui/tooltip";
import {ThemeProvider} from "@/components/theme-provider";
import {formatText, validatePortfolio, safeWebUrl, safeImage, emailHref, type Portfolio} from "@/lib/portfolio";

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
    for (const key of ["role", "reflection"]) assert.ok(card.querySelectorAll(`[data-project-section=${key}] p`).length >= 1);
    assert.equal(card.querySelectorAll("[data-project-section=artifacts] a").length, 1);
    assert.ok(card.querySelector("img")?.getAttribute("alt"));
}
assert.equal(doc.querySelectorAll('a[href^="mailto:"]').length, data.profile.email.endsWith("@example.com") ? 0 : 1, "Contact link matches the configured address");
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
assert.equal(modified.querySelector(`#project-${changed.projects[0].id} [data-project-section=artifacts] a`)?.getAttribute("href"), changed.projects[0].demoUrl);
for (const link of modified.querySelectorAll('a[href^="#"]')) assert.ok(modified.getElementById(link.getAttribute("href")!.slice(1)), "Navigation target exists");
assert.equal(safeWebUrl("javascript:alert(1)"), undefined);
assert.equal(safeImage("//untrusted.example/image.png"), undefined);
assert.equal(emailHref("hello@example.com?bcc=other@example.com"), undefined);
assert.throws(() => validatePortfolio({profile: {}}));
console.log("Passed: five project sections, readable narratives, complete long content, JSON email/name updates, navigation, demo links, URL safeguards, invalid content.");

const editedCopy = structuredClone(data);
editedCopy.ui.projectsHeading = "Edited project heading";
editedCopy.ui.footer.creditPrefix = "Edited credit";
editedCopy.ui.footer.creditName = "Edited template name";
editedCopy.ui.navigation.themeToggle = "Edited theme control";
editedCopy.ui.contact.prepare = "Edited contact action";
editedCopy.ui.format.labelSeparator = " → ";
const editedDoc = render(editedCopy);
for (const text of [editedCopy.ui.projectsHeading, editedCopy.ui.footer.creditPrefix,
    editedCopy.ui.footer.creditName, editedCopy.ui.contact.prepare]) {
    assert.ok(editedDoc.querySelector('main')?.textContent?.includes(text), `Edited copy is rendered: ${text}`);
}
assert.ok(editedDoc.querySelector('[aria-label="Edited theme control"]'));
assert.ok(editedDoc.querySelector('#about .font-medium')?.textContent?.includes(" → "));
assert.equal(formatText("{message} / {name}", {message: "$& {name}", name: "Alex"}), "$& {name} / Alex");
console.log("Passed: editable UI copy, decorative separators, accessibility labels, literal template input.");

for (const project of data.projects) {
    const card = doc.getElementById(`project-${project.id}`)!;
    for (const item of [...project.roleAndChallenge, ...project.reflection]) {
        assert.ok(card.textContent?.includes(item.text), "Complete case-study text is rendered");
    }
}
for (const evidence of data.skills.softEvidence) {
    const record = doc.getElementById(`evidence-${evidence.id}`)!;
    assert.ok(record, "Soft-skill record is present");
    for (const paragraph of evidence.paragraphs) assert.ok(record.textContent?.includes(paragraph));
    assert.ok(doc.getElementById(`project-${evidence.projectId}`), "Evidence links to an existing project");
}
console.log("Passed: complete project narratives and linked soft-skill records.");

assert.equal(doc.querySelector('#resume'), null, "Duplicate interactive resume is removed");
assert.equal(doc.querySelector('a[download]')?.getAttribute('href'), data.resume.downloadUrl);
assert.ok(doc.querySelector('#skills')?.textContent?.includes(data.skills.featured.title));
for (const skill of ['Rust', 'C/C++', 'JavaScript / TypeScript', 'Go']) {
    assert.ok(doc.querySelector('#skills')?.textContent?.includes(skill));
}
console.log("Passed: downloadable resume, requested languages, featured agent skills.");
