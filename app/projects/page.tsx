import { AppShell } from "@/components/app-shell";

const projects = [
  { name: "Testing proof lab", focus: "React Testing Library", state: "Planned" },
  { name: "SQL job tracker", focus: "Prisma and Postgres", state: "Drafting" },
  { name: "Accessible component kit", focus: "ARIA and keyboard UX", state: "Queued" },
];

export default function ProjectsPage() {
  return (
    <AppShell
      active="Projects"
      description="A simple board for projects that prove the skills employers keep asking for."
      eyebrow="Projects"
      title="Turn skill gaps into portfolio evidence"
    >
      <div className="route-grid three">
        {projects.map((project) => (
          <article className="route-card project-card" key={project.name}>
            <span>{project.state}</span>
            <h2>{project.name}</h2>
            <p>{project.focus}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
