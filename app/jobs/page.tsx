import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function JobsPage() {
  const jobs = await prisma.jobPosting.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
    },
  });

  return (
    <AppShell
      active="Jobs"
      description="Saved postings from your job intake form, ready for skill extraction and roadmap matching."
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

        {jobs.length ? (
          <div className="job-list">
            {jobs.map((job) => {
              const skills = job.jobSkills.map((jobSkill) => jobSkill.skill.name);

              return (
                <article key={job.id}>
                  <div>
                    <strong>{job.title}</strong>
                    <span>
                      {[job.company, job.location].filter(Boolean).join(" - ") ||
                        "No company or location added"}
                    </span>
                    <small>
                      {skills.length ? skills.join(", ") : "No skills extracted yet"}
                    </small>
                  </div>
                  <div className="job-actions">
                    <b>{formatDate(job.createdAt)}</b>
                    {job.sourceUrl ? (
                      <a href={job.sourceUrl} rel="noreferrer" target="_blank">
                        Source
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <strong>No job postings yet</strong>
              <span>Add your first posting so SkillSignal has something real to analyze.</span>
            </div>
            <Link className="card-action" href="/jobs/new">
              <FilePlus2 aria-hidden="true" />
              Add posting
            </Link>
          </div>
        )}
      </section>

      {jobs.length ? (
        <section className="route-card jobs-summary">
          <div className="card-heading">
            <span className="mini-label">Database</span>
            <h2>
              {jobs.length} saved posting{jobs.length === 1 ? "" : "s"}
            </h2>
          </div>
          <p className="card-copy">
            These are coming from Prisma now. The next backend step is to extract
            skills from each saved description and attach them to the posting.
          </p>
        </section>
      ) : null}
    </AppShell>
  );
}
