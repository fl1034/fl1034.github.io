# Feitian Li — Portfolio

## Edit the text in WebStorm

Open **[`source/public/portfolio.json`](source/public/portfolio.json)**. It contains
all site copy, including decorative labels, form messages, accessibility labels,
metadata, loading/error text, and the 404 page. WebStorm uses the adjacent JSON schema.

See **[Editing guide](source/docs/EDITING-CONTENT.md)** for the field map and templates.

```sh
cd source
npm ci                 # first time only
npm run dev            # preview locally
# After editing:
npm run check
npm run export:site    # rebuild and refresh the published files at repository root
```

The root `portfolio.json` is generated from the source copy. Edit only
`source/public/portfolio.json`. Commit the source and regenerated files, then push
`master` to deploy via GitHub Pages.

Project screenshots live in `source/public/assets/images/`. Text embedded in those
images belongs to the separate demo apps; changing it requires a new screenshot.

The site uses the [Magic UI Portfolio](https://github.com/magicuidesign/portfolio)
template. Its MIT license and provenance are preserved in `source/`.
