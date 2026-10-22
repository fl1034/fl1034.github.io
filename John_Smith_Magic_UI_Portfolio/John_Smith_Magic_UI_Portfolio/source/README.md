# John Smith · Magic UI Portfolio

A customized version of the real [Magic UI Portfolio](https://github.com/magicuidesign/portfolio), upstream commit
`5ef12e4c8bd0de3e22e89c2181ee77a35925ec8b`. The original MIT license is preserved in `LICENSE`. Template provenance is
in `TEMPLATE-SOURCE.json` and the original README is in `docs/UPSTREAM-README.md`.

## Edit the content

**All personal information is in `public/portfolio.json`.** Do not edit the JSX to change your name, email, education,
skills, or projects.

- `profile.email` controls the displayed email, contact link, and printed résumé. The sample `@example.com` address is
  deliberately displayed without an active email link. Replace it with your address to enable the link.
- `profile.photo.src` selects your photo. Put the image in `public/assets/images/`, update the relative path, and change
  its alt text/caption. The supplied image is a placeholder.
- `profile.socialLinks` contains GitHub and LinkedIn URLs. Empty links are hidden.
- Each project has a name/description, technologies, one live-demo artifact, role/challenge bullets, and reflection
  bullets. Set each `demoUrl` to your own published demo. An empty URL displays “link pending.” Upstream repositories
  are credited as learning sources, not presented as John's own repositories.
- The two advanced capstones remain marked as planned. The guided project narratives are sample content.
- Paragraphs and bullets grow naturally; the cards do not truncate text.
- Keep JSON commas and double quotes valid. `public/portfolio.schema.json` provides editor assistance.

The site fetches this JSON at runtime. **In the ready-built website, edit `website/portfolio.json`; no rebuild is needed
for content changes.** Treat the source and built JSON copies as alternative workflows: if rebuilding later, copy your
latest JSON back to `source/public/portfolio.json` first.

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

Open `http://localhost:8000`. On Windows, use `py -m http.server 8000 --directory out`. Opening `index.html` directly
with a `file://` URL will not work because browsers restrict JSON fetching.

## GitHub Pages

Copy the **contents** of `out/` (or the ZIP's `website/`) to your Pages publishing directory. Include `.nojekyll` and
the complete `_next/` folder. Select that publishing branch/folder in GitHub Pages settings.

The page uses relative asset paths and fragment navigation, so it can be hosted at a domain root or a repository
subpath. Keep `index.html`, `portfolio.json`, `assets/`, and `_next/` beside one another. Serve the directory URL with a
trailing slash. Content loads with JavaScript; the browser title updates from the JSON, while the exported initial
metadata is generic.

## Template changes

The template's monochrome theme, rounded project-card styling, badges, avatar, animated reveals, flickering header, and
magnifying dock are retained. The sample employment history, hackathons, blog, and author's content have been removed.
Project cards are expanded for the five required rubric sections, and light/dark mode, keyboard focus, reduced-motion
styles, and a print résumé are included.

The supplied project images are concept illustrations, not screenshots of completed applications. No live demos or
personal social accounts have been invented.
