# Validation

- TypeScript checks, production static export, ESLint, and content rendering checks are used for this package.
- `npm run check` checks all five project sections, multiple role/reflection bullets, full long descriptions,
  JSON-driven name/email changes, demo links, navigation targets, and unsafe URL rejection.
- The exported assets are checked for relative paths and missing local files.
- Browser visual verification was unavailable in the creation environment; responsive layout and interaction appearance
  have not been checked in a browser here.
- The creation environment required a temporary compatibility shim for unavailable Node RSS telemetry. It only affected
  build memory reporting; it is not included in this package or needed on normal local systems.
