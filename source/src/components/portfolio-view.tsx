/* eslint-disable @next/next/no-img-element -- Static portfolio assets retain their original proportions. */
"use client";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ProjectCard} from "@/components/project-card";
import {ContactForm} from "@/components/contact-form";
import {Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import {SectionIndex} from "@/components/section-index";
import Navbar from "@/components/navbar";
import {ArrowDown, ArrowUpRight, MapPin, Github, Mail} from "lucide-react";
import {emailHref, safeImage, safeWebUrl, type Portfolio} from "@/lib/portfolio";

export function PortfolioView({data}: { data: Portfolio }) {
    const {profile, about, education, projects, skills, resume, contact, site} = data;
    const l = site.labels;
    const ui = data.ui;
    const initials = profile.name.split(/\s+/).map(s => s[0]).slice(0, 2).join("");
    const sampleEmail = profile.email.endsWith("@example.com");
    const mail = emailHref(profile.email);
    const github = profile.socialLinks.find(link => link.label === "GitHub");
    const githubUrl = github && safeWebUrl(github.url);
    return <>
        <main id="main" className="min-h-dvh flex flex-col gap-16 relative">
            <section id="hero" className="scroll-mt-8">
                <div className="gap-6 flex flex-col sm:flex-row justify-between">
                    <div className="gap-3 flex flex-col order-2 sm:order-1 max-w-xl">
                        <h1><BlurFadeText delay={0.04}
                                          className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
                                          yOffset={8} text={profile.name}/></h1>
                        <BlurFade delay={0.08}>
                            <p className="text-lg text-foreground font-medium leading-relaxed">{profile.role}</p>
                            <p className="text-muted-foreground text-lg leading-relaxed">{profile.headline}</p>
                        </BlurFade>
                        <BlurFade delay={0.12} className="flex flex-wrap items-center gap-x-4 gap-y-3">
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                <MapPin aria-hidden="true" className="size-3.5 shrink-0"/>{profile.location}
                            </p>
                            <div className="flex items-center gap-2">
                                {githubUrl && <Tooltip><TooltipTrigger asChild>
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={github.label}
                                       className="header-contact-link">
                                        <Github className="size-3.5" aria-hidden="true"/><span>{github.label}</span>
                                    </a>
                                </TooltipTrigger><TooltipContent>{github.label}</TooltipContent></Tooltip>}
                                {!sampleEmail && mail && <Tooltip><TooltipTrigger asChild>
                                    <a href={mail} aria-label={`${l.contactEmail}${ui.format.labelSeparator}${profile.email}`}
                                       className="header-contact-link">
                                        <Mail className="size-3.5" aria-hidden="true"/><span>{l.contactEmail}</span>
                                    </a>
                                </TooltipTrigger><TooltipContent>{profile.email}</TooltipContent></Tooltip>}
                            </div>
                        </BlurFade>
                        <BlurFade delay={0.16} className="flex flex-wrap gap-3 pt-3">
                            <a href="#projects"
                               className="inline-flex gap-2 items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85">{l.viewProjects}<ArrowDown
                                className="size-3.5" aria-hidden="true"/></a>
                            <a href={safeImage(resume.downloadUrl)} download
                               className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">{l.viewResume}</a>
                        </BlurFade>
                    </div>
                    <BlurFade delay={0.04} className="order-1 sm:order-2 shrink-0">
                        <figure className="space-y-3 text-center w-28 sm:w-32">
                            <Avatar className="size-28 sm:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                                <AvatarImage className="object-cover" alt={profile.photo.alt} src={safeImage(profile.photo.src)}/>
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            {profile.photo.caption && <figcaption
                                className="text-xs text-muted-foreground">{profile.photo.caption}</figcaption>}
                        </figure>
                    </BlurFade>
                </div>
            </section>
            <section id="about" className="scroll-mt-8 space-y-5">
                <BlurFade delay={0.12}><h2 className="text-xl font-semibold">{l.about}</h2></BlurFade>
                <BlurFade delay={0.16} className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{about.introduction}</p>
                    {about.story.map((text, i) => <p key={i}>{text}</p>)}
                </BlurFade>
            </section>
            <section id="education" className="scroll-mt-8 space-y-6">
                <BlurFade><h2 className="text-xl font-semibold">{l.education}</h2></BlurFade>
                {education.map(item => <BlurFade key={item.institution}>
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                        <div className="w-36 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-2">
                            <img src={safeImage(item.logo.src)} alt={item.logo.alt} width="300" height="155"
                                 className="block h-auto w-full object-contain" loading="lazy"/>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1"><h3
                                className="font-semibold">{item.institution}</h3><p
                                className="text-xs tabular-nums text-muted-foreground pt-1">{item.startYear}{ui.format.yearSeparator}{item.endYear}</p>
                            </div>
                            <p className="text-sm">{item.qualification}</p><p
                            className="text-sm text-muted-foreground">{item.completion}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.learning.join(ui.format.listSeparator)}</p>
                        </div>
                    </div>
                </BlurFade>)}
            </section>
            <section id="projects" className="scroll-mt-8 space-y-8">
                <BlurFade className="flex flex-col gap-4 items-center text-center">
                    <div aria-hidden="true" className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent"/>
                    <h2 className="text-2xl font-medium tracking-normal sm:text-[2rem] leading-tight">{ui.projectsHeading}</h2>
                </BlurFade>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-start">
                    {projects.map((project, i) => <BlurFade key={project.id} delay={0.04 + (i % 2) * 0.05} inView
                                                            className="h-full"><ProjectCard project={project}
                                                                                            labels={l} labelSeparator={ui.format.labelSeparator}/></BlurFade>)}
                </div>
            </section>
            <section id="skills" className="scroll-mt-8 space-y-6">
                <BlurFade><h2 className="text-xl font-semibold">{l.skills}</h2></BlurFade>
                <article className="relative overflow-hidden rounded-2xl border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-sky-500/15 p-6 space-y-4 shadow-sm">
                    <h3 className="text-xl font-semibold tracking-normal">{skills.featured.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{skills.featured.description}</p>
                    <a className="inline-block text-sm font-medium underline underline-offset-4" href={`#evidence-${skills.featured.evidenceId}`}>{skills.featured.evidenceLabel}</a>
                </article>
                {skills.groups.map(group => <BlurFade key={group.name} inView className="space-y-3">
                    <h3 className="text-sm font-semibold">{group.name}</h3>
                    <ul className="flex flex-wrap gap-2">{group.items.map(item => <li key={item}><span
                        className="border bg-background border-border ring-2 ring-border/20 rounded-xl min-h-8 px-3 py-1 inline-flex items-center text-sm font-medium">{item}</span>
                    </li>)}</ul>
                </BlurFade>)}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">{l.technicalEvidence}</h3>
                    <div className="grid gap-4 sm:grid-cols-2">{skills.technicalEvidence.map(item =>
                        <article key={item.projectId} className="rounded-xl border border-border bg-card p-5 space-y-3">
                            <h4 className="font-medium text-sm"><a className="underline underline-offset-4" href={`#project-${item.projectId}`}>{item.title}</a></h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                        </article>)}</div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">{l.softEvidence}</h3>
                    {skills.softEvidence.map(item => <article id={`evidence-${item.id}`} key={item.id}
                        className="rounded-xl border border-border bg-card p-5 space-y-3 scroll-mt-8">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.skills}</p>
                        {item.paragraphs.map((paragraph, i) => <p key={i} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>)}
                        <a className="inline-block text-sm underline underline-offset-4" href={`#project-${item.projectId}`}>{l.evidenceProject}</a>
                    </article>)}
                </div>
                <BlurFade inView className="space-y-3"><h3 className="text-sm font-semibold">{l.certifications}</h3><p
                    className="text-sm text-muted-foreground leading-relaxed">{skills.certifications}</p></BlurFade>
            </section>
            <section id="contact" className="scroll-mt-8 space-y-5 border-t border-border pt-10">
                <BlurFade inView className="space-y-5">
                    <h2 className="text-2xl font-medium tracking-normal sm:text-[2rem] leading-tight">{l.contact}</h2>
                    <p className="text-muted-foreground leading-relaxed">{contact.invitation}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{contact.availability}</p>
                    <div>{!sampleEmail && mail ? <a href={mail}
                                                    className="text-lg font-medium underline underline-offset-4 break-all">{profile.email}</a> :
                        <p className="text-lg font-medium break-all">{profile.email}</p>}
                        {sampleEmail &&
                            <p className="mt-2 text-xs text-muted-foreground">{contact.sampleEmailNotice}</p>}
                    </div>
                    <ContactForm email={profile.email} copy={ui.contact}/>
                    <div className="flex gap-4 flex-wrap">{profile.socialLinks.map(item => {
                        const url = safeWebUrl(item.url);
                        return url ? <a key={item.label} href={url} target="_blank" rel="noopener noreferrer"
                                        className="text-sm inline-flex gap-1 items-center underline underline-offset-4">{item.label}<ArrowUpRight
                            className="size-3" aria-hidden="true"/></a> : null;
                    })}</div>
                </BlurFade>
            </section>
            <footer
                className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground border-t border-border pt-6">
                <p>{profile.name}{ui.format.listSeparator}{site.footer}</p><p>{ui.footer.creditPrefix}{" "}<a href={safeWebUrl(ui.footer.creditUrl)}
                                                                       target="_blank" rel="noopener noreferrer"
                                                                       className="underline underline-offset-4">{ui.footer.creditName}</a></p>
            </footer>
        </main>
        <SectionIndex items={site.sectionNavigation} label={ui.navigation.sectionIndex}/>
        <Navbar items={site.navigation} copy={ui.navigation}/>
    </>;
}
