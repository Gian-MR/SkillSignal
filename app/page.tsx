const routes = [
  "dash",
  "jobs",
  "profile",
  "projects",
  "roadmap",
] as const;

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="eyebrow">SkillSignal</p>
        <h1>Turn job-market signals into a focused learning roadmap.</h1>
        <p className="lede">
          Analyze roles, extract skill gaps, and plan practical projects for
          early-career developer growth.
        </p>
        <nav className="route-list" aria-label="SkillSignal sections">
          {routes.map((route) => (
            <a key={route} href={`/${route}`}>
              {route}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
