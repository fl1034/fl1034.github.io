# Editing the portfolio in WebStorm

**Edit `source/public/portfolio.json`.** Open the repository root in WebStorm, then
open that file. Its `$schema` points to the adjacent `portfolio.schema.json` for
completion and validation. All site-owned copy comes from this JSON.

| Section | Contents |
| --- | --- |
| `profile` | Name, role, location, email, photo path, alt text and optional caption |
| `about`, `education`, `skills`, `resume`, `contact` | Main page content and downloadable résumé |
| `projects` | Five cards: titles, descriptions, image alt text, tags, contribution/reflection paragraphs, credits and links |
| `site.labels`, `site.navigation`, `site.footer` | Section headings, buttons, tooltips, menus and footer line |
| `ui.projectsHeading`, `ui.footer` | Large project heading and template credit |
| `ui.contact` | All form labels, hints, validation/status messages, actions and email templates |
| `ui.shell` | Skip link, JavaScript notice, loading and content-error messages |
| `ui.notFound` | Decorative 404 number, title, explanation and home button |
| `ui.navigation` | Navigation accessibility label and theme-toggle label |
| `ui.metadata`, `ui.language` | Browser/search title, description, title template and document language |
| `ui.format` | Decorative list dots, year dashes and label punctuation |
| `ui.iconTitles` | Accessible titles of bundled icons |

Keep IDs stable: they are anchor targets, not prose. Paths and URLs are configuration.
Use valid JSON, keep required keys, and change array entries to add or remove list items.
Templates have named slots: `{name}`, `{role}`, `{email}`, `{message}`, `{subject}`,
and `{body}`. Keep the slots you want to insert; surrounding text is freely editable.
The contact form uses the JSON validation message instead of browser-supplied copy.

Text inside the screenshots is baked into images from the separate demo apps; replace
those screenshots to change it. All portfolio HTML text and image alt text is in JSON.

## Preview and refresh

From the repository root:

```sh
cd source
npm ci                 # first time only
npm run dev            # preview; refresh after editing JSON
```

For a complete refresh, from `source/`:

```sh
npm run check
npm run export:site
```

`export:site` builds `source/out/`, then refreshes the published files in the repository
root. Root `portfolio.json` and `portfolio.schema.json` are generated copies: do not
edit them separately. Build-time copy (metadata, loading/error messages, skip link,
404 page, no-JavaScript notice and bundled icon titles) requires a rebuild. Regular
page and form copy is fetched at runtime from the corresponding public JSON.

Commit the source and generated files, then push `master` to deploy GitHub Pages.
The export command does not perform Git operations.

## Project case studies and skill evidence

Projects are ordered in the JSON. Each keeps five content groups: description,
technologies, demo artifact, contribution/challenge narrative, and reflection.
`roleAndChallenge` paragraphs use an empty `label` for uninterrupted prose;
`reflection` labels introduce the takeaway and explain the demo artifact.
Write context, your contribution, actions, and outcomes naturally—STAR headings
are not required. Keep approximate observations distinct from measured benchmarks.

`skills.technicalEvidence` connects two technical examples to project IDs.
`skills.softEvidence` contains two retrospective decision/debugging records,
including editable titles, skill labels, paragraphs, and project links. These
records summarize the author's account; they are not original test logs.
Keep `projectId` values matched to an existing project. Update `site.footer`
with the actual date when revising the published portfolio.

## Downloadable résumé and featured skill

`skills.featured` controls the prominent AI coding agents and harnesses panel.
`skills.groups` contains the language list and other technical groups.

The on-page interactive résumé has been removed. The hero download link uses
`resume.downloadUrl`; résumé prose, skill lines, project bullets, and headings
live under `resume`. Shared identity and education come from `profile` and
`education`. Project names and links are resolved through `projectId`.

`npm run resume:build` generates `public/assets/feitian-li-resume.pdf` with
selectable text and clickable links. Every production build regenerates it
automatically. After editing résumé content during development, run this command
to refresh the PDF. The generator fails if copy exceeds its one-page layout, so
excess text cannot silently disappear. Do not edit the generated PDF directly.

The education logo is configured through `education[].logo.src` and `.alt`.
The Saskatchewan Polytechnic ribbon logo is sourced from the institution’s
official website: https://saskpolytech.ca/_assets/img/Saskatchewan_Polytechnic_Logo.webp.
Its original proportions and colors are preserved on both themes.
