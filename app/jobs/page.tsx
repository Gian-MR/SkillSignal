import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const jobs = [
  { role: "Frontend Developer Intern", match: "82%", skills: "React, TypeScript, Testing" },
  { role: "Junior Full-Stack Developer", match: "69%", skills: "SQL, API design, React" },
  { role: "Web UI Developer", match: "76%", skills: "Accessibility, CSS, Components" },
];

export default function JobsPage() {
  return (
    <AppShell
      active="Jobs"
      description="A basic place to collect postings, compare requirements, and decide which roles are worth chasing."
      eyebrow="Job signals"
      title="Track the roles shaping your roadmap"
    >
      <section className="route-card">
        <div className="card-heading with-action">
          <div>
            <span className="mini-label">Saved roles</span>
            <h2>Early matches</h2>
          </div>
          <Link className="card-action" href="/jobs/new">
            <FilePlus2 aria-hidden="true" />
            Add posting
          </Link>
        </div>
        <div className="job-list">
          {jobs.map((job) => (
            <article key={job.role}>
              <div>
                <strong>{job.role}</strong>
                <span>{job.skills}</span>
              </div>
              <b>{job.match}</b>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
