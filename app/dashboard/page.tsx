import { AppShell } from "@/components/app-shell";

const metrics = [
  { label: "Skill match", value: "74%", detail: "+12% this week" },
  { label: "Target roles", value: "18", detail: "6 new postings" },
  { label: "Projects due", value: "4", detail: "Week 2 focus" },
];

const tasks = [
  "Build dashboard shell",
  "Connect job posting analyzer",
  "Create profile skill inventory",
];

export default function DashboardPage() {
  return (
    <AppShell
      active="Dashboard"
      description="A quick command center for your market signals, roadmap progress, and next best action."
      eyebrow="Dashboard"
      title="Your career signal overview"
    >
      <div className="route-grid three">
        {metrics.map((metric) => (
          <article className="route-card metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>
      <div className="route-grid two">
        <section className="route-card">
          <div className="card-heading">
            <span className="mini-label">Roadmap</span>
            <h2>Priority tasks</h2>
          </div>
          <div className="simple-list">
            {tasks.map((task, index) => (
              <div key={task}>
                <span>{index + 1}</span>
                <strong>{task}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="route-card">
          <div className="card-heading">
            <span className="mini-label">Signals</span>
            <h2>What changed</h2>
          </div>
          <p className="card-copy">
            Frontend roles are showing stronger demand for testing, TypeScript,
            and portfolio projects with clear writeups.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
