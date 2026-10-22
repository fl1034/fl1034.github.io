# John Smith — Magic UI Portfolio

This website uses the actual Magic UI Portfolio template:
https://github.com/magicuidesign/portfolio

## Ready-built website

- `website/` contains the complete static website.
- Edit **`website/portfolio.json`** for all personal information and project content. No build is needed.
- Replace the photo and project illustrations in `website/assets/images/` as desired.
- Put your actual live-demo URLs in each project's `demoUrl` field. Empty links show as pending.
- Upload the **contents** of `website/` to GitHub Pages, including `.nojekyll` and `_next/`.

To preview locally, run this command from this unzipped folder:

```sh
python3 -m http.server 8000 --directory website
```

On Windows use `py` instead of `python3`. Open http://localhost:8000.
Do not double-click index.html: JSON loading needs a web server.

## Full source

`source/` contains the customized Next.js/React/TypeScript template, lockfile, license, and setup instructions. To
change the design, run `npm ci` and `npm run dev` there. `npm run build` creates a new static export in `out/`.

If rebuilding after editing the ready-built content, first copy `website/portfolio.json` to
`source/public/portfolio.json`. The two copies are not automatically synchronized.

Build, TypeScript, ESLint, content-rendering checks, and static asset checks passed. Browser visual verification was
unavailable. See `source/docs/VALIDATION.md` for details.
