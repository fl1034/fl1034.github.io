/* eslint-disable @next/next/no-img-element */
import {Badge} from "@/components/ui/badge";
import {ArrowUpRight} from "lucide-react";
import {safeImage, safeWebUrl, type Project, type Portfolio} from "@/lib/portfolio";

/** Expanded from the original Magic UI ProjectCard; content is never truncated. */
export function ProjectCard({project, labels, labelSeparator}: { project: Project; labels: Portfolio["site"]["labels"]; labelSeparator: string }) {
    const demo = safeWebUrl(project.demoUrl), source = safeWebUrl(project.source.url);
    return <article id={`project-${project.id}`}
                    className="project-card flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200 bg-card">
        <div className="relative shrink-0 border-b border-border">
            <img src={safeImage(project.image.src)} alt={project.image.alt} width="1000" height="650" loading="lazy"
                 className="w-full aspect-[1000/650] object-cover"/>
        </div>
        <div className="p-6 flex flex-col gap-6">
            <section data-project-section="description" className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight leading-snug">{project.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                {source && <p className="text-xs text-muted-foreground leading-relaxed">{labels.source} <a
                    className="underline underline-offset-4 hover:text-foreground" href={source} target="_blank"
                    rel="noopener noreferrer">{project.source.label}</a></p>}
            </section>
            <section data-project-section="technologies" className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wide uppercase">{labels.technologies}</h4>
                <ul className="flex flex-wrap gap-1.5" aria-label={labels.technologies}>{project.technologies.map(tag =>
                    <li key={tag}><Badge variant="outline"
                                         className="text-[11px] font-medium border-border px-2 py-1 whitespace-normal text-left">{tag}</Badge>
                    </li>)}</ul>
            </section>
            <section data-project-section="artifacts" className="space-y-2">
                <div>{demo ?
                        <a className="inline-flex items-center gap-1 underline underline-offset-4 text-foreground"
                           href={demo} target="_blank" rel="noopener noreferrer">{labels.demo}<ArrowUpRight
                            className="size-3.5" aria-hidden="true"/></a> : <span>{labels.demoPending}</span>}</div>
            </section>
            <section data-project-section="role" className="space-y-3">
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{project.roleAndChallenge.map((item, i) => <p key={i}>{item.label && <strong
                    className="font-medium text-foreground">{item.label}{labelSeparator}</strong>}{item.text}</p>)}</div>
            </section>
            <section data-project-section="reflection" className="space-y-3">
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{project.reflection.map((item, i) => <p key={i}>{item.label && <strong
                    className="font-medium text-foreground">{item.label}{labelSeparator}</strong>}{item.text}</p>)}</div>
            </section>
        </div>
    </article>;
}
