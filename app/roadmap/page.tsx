import { AppShell } from "@/components/app-shell";

const roadmap = [
  { week: "Week 2", task: "Build dashboard shell", status: "In progress" },
  { week: "Week 2", task: "Add job analyzer basics", status: "Next" },
  { week: "Week 3", task: "Create portfolio project planner", status: "Queued" },
  { week: "Week 4", task: "Prepare first application sprint", status: "Queued" },
];

export default function RoadmapPage() {
  return (
    <AppShell
      active="Roadmap"
      description="A starter roadmap for turning gaps into weekly tasks and portfolio proof."
      eyebrow="Roadmap"
      title="Plan the work that closes the gap"
    >
      <section className="route-card">
        <div className="card-heading">
          <span className="mini-label">Timeline</span>
          <h2>Learning and shipping plan</h2>
        </div>
        <div className="timeline-list">
          {roadmap.map((item) => (
            <article key={`${item.week}-${item.task}`}>
              <span>{item.week}</span>
              <div>
                <strong>{item.task}</strong>
                <small>{item.status}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
