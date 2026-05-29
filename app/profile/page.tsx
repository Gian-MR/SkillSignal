import { AppShell } from "@/components/app-shell";

const skills = [
  { name: "React", level: "Advanced" },
  { name: "TypeScript", level: "Growing" },
  { name: "Testing", level: "Needs proof" },
  { name: "SQL", level: "Needs practice" },
];

export default function ProfilePage() {
  return (
    <AppShell
      active="Profile"
      description="A starter profile for the skills, goals, and evidence SkillSignal should use when building recommendations."
      eyebrow="Profile"
      title="Define the developer you are becoming"
    >
      <div className="route-grid two">
        <section className="route-card">
          <div className="card-heading">
            <span className="mini-label">Goal</span>
            <h2>Frontend developer internship</h2>
          </div>
          <p className="card-copy">
            Focus on React, TypeScript, testing confidence, and practical
            deployed projects with clear documentation.
          </p>
        </section>
        <section className="route-card">
          <div className="card-heading">
            <span className="mini-label">Skills</span>
            <h2>Current inventory</h2>
          </div>
          <div className="skill-pills">
            {skills.map((skill) => (
              <span key={skill.name}>
                <strong>{skill.name}</strong>
                {skill.level}
              </span>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
