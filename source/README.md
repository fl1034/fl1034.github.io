# Portfolio · Magic UI

A customized version of the real [Magic UI Portfolio](https://github.com/magicuidesign/portfolio), upstream commit
`5ef12e4c8bd0de3e22e89c2181ee77a35925ec8b`. The original MIT license is preserved in `LICENSE`. Template provenance is
in `TEMPLATE-SOURCE.json` and the original README is in `docs/UPSTREAM-README.md`.

## Edit all site text

Edit **`public/portfolio.json`** (repository path: **`source/public/portfolio.json`**).
This is the single editable source for site copy. `public/portfolio.schema.json`
provides WebStorm completion and required-field validation. See
[`docs/EDITING-CONTENT.md`](docs/EDITING-CONTENT.md) for the field guide and workflow.

Run `npm run export:site` after editing. This builds the site and refreshes the
published files in the repository root, including the generated `portfolio.json`.
Do not edit both JSON copies separately. `npm run dev` reads the source public JSON;
refresh the browser after an edit. Restart dev to refresh build-time shell copy.

## Develop and build

Requires Node.js 20.9+ and npm. Node.js 22 LTS or newer is recommended for local development.

```sh
npm ci
npm run dev
```

For the static export:

```sh
npm run check
npm run lint
npm run build
```

The generated website is in `out/`. It needs a static web server, with no database, API keys, or server runtime. To
preview it locally:

```sh
python3 -m http.server 8000 --directory out
```

Open `http://localhost:8000`. On Windows, use `py -m http.server 8000 --directory out`. Opening `../index.html` directly
with a `file://` URL will not work because browsers restrict JSON fetching.

## GitHub Pages

Copy the **contents** of `out/` (or the ZIP's `..`) to your Pages publishing directory. Include `.nojekyll` and
the complete `_next/` folder. Select that publishing branch/folder in GitHub Pages settings.

The page uses relative asset paths and fragment navigation, so it can be hosted at a domain root or a repository
subpath. Keep `../index.html`, `portfolio.json`, `assets/`, and `_next/` beside one another. Serve the directory URL
with a
trailing slash. Content loads with JavaScript; the browser title updates from the JSON, while the exported initial
metadata is generic.

## Template changes

The template's monochrome theme, rounded project-card styling, badges, avatar, animated reveals, flickering header, and
magnifying dock are retained. The sample employment history, hackathons, blog, and author's content have been removed.
Project cards are expanded for the five required rubric sections, and light/dark mode, keyboard focus, reduced-motion
styles, and a print résumé are included.

The supplied project images are concept illustrations, not screenshots of completed applications. No live demos or
personal social accounts have been invented.
