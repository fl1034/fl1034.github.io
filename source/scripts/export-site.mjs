import {cp, readdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const source = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(source, 'out');
const root = path.dirname(source);
const entries = await readdir(output, {withFileTypes: true});
// Replace only generated bundles; preserve source, Git metadata and user files.
await rm(path.join(root, '_next'), {recursive: true, force: true});
for (const entry of entries) await cp(path.join(output, entry.name), path.join(root, entry.name), {recursive: true});
console.log('Published files refreshed. Edit source/public/portfolio.json, not the generated root copy.');
