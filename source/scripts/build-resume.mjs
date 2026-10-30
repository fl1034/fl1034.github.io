import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {PDFDocument, StandardFonts, rgb, PDFString} from 'pdf-lib';

const content = JSON.parse(await readFile(new URL('../public/portfolio.json', import.meta.url), 'utf8'));
const {profile, resume, education, ui, site} = content;
const pdf = await PDFDocument.create();
pdf.setTitle(`${profile.name} | ${site.labels.resume}`);
pdf.setAuthor(profile.name);
pdf.setSubject(resume.summary);
const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const page = pdf.addPage([612, 792]);
const ink = rgb(.12, .16, .22), muted = rgb(.28, .33, .39), accent = rgb(.20, .26, .49);
const margin = 42, width = 528;
let y = 750;

function link(text, url, x, baseline, font, size) {
    const span = font.widthOfTextAtSize(text, size);
    const annotation = pdf.context.register(pdf.context.obj({
        Type: 'Annot', Subtype: 'Link', Rect: [x, baseline - 2, x + span, baseline + size],
        Border: [0, 0, 0], A: {Type: 'Action', S: 'URI', URI: PDFString.of(url)},
    }));
    page.node.addAnnot(annotation);
}
function paragraph(text, {size = 9.5, font = regular, color = ink, indent = 0, after = 4, url} = {}) {
    const words = text.split(/\s+/);
    let line = '';
    const lines = [];
    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) > width - indent && line) {
            lines.push(line); line = word;
        } else line = candidate;
    }
    if (line) lines.push(line);
    for (const row of lines) {
        if (y < 45) throw new Error('Resume exceeds one page. Shorten the JSON copy or adjust the layout.');
        page.drawText(row, {x: margin + indent, y, font, size, color});
        if (url) link(row, url, margin + indent, y, font, size);
        y -= size * 1.35;
    }
    y -= after;
}
function heading(text) {
    y -= 8;
    paragraph(text, {size: 10, font: bold, color: accent, after: 5});
    page.drawLine({start: {x: margin, y: y + 8}, end: {x: 570, y: y + 8}, thickness: .5, color: rgb(.8, .82, .86)});
    y -= 6;
}
paragraph(profile.name, {size: 23, font: bold, after: 2});
paragraph(`${profile.role}${ui.format.listSeparator}${profile.location}`, {size: 10, color: muted});
paragraph(profile.email, {color: accent, url: `mailto:${profile.email}`, after: 2});
paragraph(`${resume.portfolioLabel}${ui.format.labelSeparator}${resume.portfolioUrl}`, {color: accent, url: resume.portfolioUrl});
heading(resume.summaryHeading);
paragraph(resume.summary);
heading(resume.skillsHeading);
for (const item of resume.skillLines) paragraph(`${item.label}${ui.format.labelSeparator}${item.text}`);
heading(resume.projectsHeading);
for (const entry of resume.projects) {
    const project = content.projects.find(p => p.id === entry.projectId);
    if (!project) throw new Error(`Unknown resume project: ${entry.projectId}`);
    paragraph(project.name, {font: bold, color: accent, url: project.demoUrl, after: 2});
    for (const text of entry.bullets) paragraph(`• ${text}`, {indent: 8, after: 3});
    y -= 3;
}
heading(resume.educationHeading);
for (const item of education) {
    paragraph(`${item.institution}${ui.format.listSeparator}${item.qualification}`, {font: bold});
    paragraph(`${item.startYear}${ui.format.yearSeparator}${item.endYear}${ui.format.listSeparator}${item.completion}`, {color: muted});
    paragraph(item.learning.join(ui.format.listSeparator), {color: muted});
}
page.drawText(site.footer, {x: margin, y: 27, font: regular, size: 8, color: muted});
// A stable output path is also the configured download URL.
if (!/^assets\/[a-zA-Z0-9_-]+\.pdf$/.test(resume.downloadUrl)) throw new Error('Resume downloadUrl must name a PDF inside assets/.');
const output = new URL(`../public/${resume.downloadUrl}`, import.meta.url);
await mkdir(new URL('.', output), {recursive: true});
await writeFile(output, await pdf.save());
console.log(`Built one-page resume: ${resume.downloadUrl}`);
