import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  CircleGauge,
  ClipboardList,
  Sparkles,
  Target,
} from "lucide-react";
import { EdgeSidebar } from "@/components/app-shell";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Jobs", href: "/jobs" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Projects", href: "/projects" },
];

const stats = [
  { label: "Skill match", value: "74%", trend: "+12%", tone: "indigo" },
  { label: "Target roles", value: "18", trend: "6 new", tone: "emerald" },
  { label: "Projects due", value: "4", trend: "Week 2", tone: "amber" },
];

export default function Home() {
  return (
    <main className="skill-page">
      <EdgeSidebar active="Home" />
      <header className="app-nav" aria-label="Primary navigation">
        <Link className="brand-mark" href="/" aria-label="SkillSignal home">
          <span className="brand-icon">
            <Sparkles aria-hidden="true" />
          </span>
          <span>SkillSignal</span>
        </Link>
        <nav className="nav-links" aria-label="Page sections">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/dashboard">
          Open dashboard
          <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className="hero-section" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI career intelligence for early developers</p>
          <h1>Turn job-market noise into a focused skill roadmap.</h1>
          <p className="lede">
            SkillSignal compares target roles against your current profile,
            spots missing proof, and turns the next step into pages you can
            build out one feature at a time.
          </p>
          <div className="hero-actions" aria-label="Hero actions">
            <Link className="primary-action" href="/dashboard">
              View dashboard
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-action" href="/roadmap">
              See roadmap
              <ChevronRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-proof" aria-label="Product highlights">
            <span>
              <Target aria-hidden="true" />
              Role-aligned gaps
            </span>
            <span>
              <CircleGauge aria-hidden="true" />
              Weekly momentum
            </span>
            <span>
              <ClipboardList aria-hidden="true" />
              Project proof
            </span>
          </div>
        </div>

        <aside className="hero-visual" aria-label="SkillSignal dashboard preview">
          <div className="signal-toolbar">
            <div>
              <span className="mini-label">Today&apos;s signal</span>
              <strong>Frontend roles are asking for stronger testing proof</strong>
            </div>
            <span className="signal-score">+18%</span>
          </div>
          <div className="signal-grid">
            {stats.map((stat) => (
              <div className={`stat-tile stat-${stat.tone}`} key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.trend}</small>
              </div>
            ))}
          </div>
          <div className="market-card">
            <div className="market-heading">
              <span>
                <BarChart3 aria-hidden="true" />
                Skill demand
              </span>
              <small>Last 30 days</small>
            </div>
            <div className="bar-list" aria-label="Skill demand bars">
              <span style={{ "--bar-size": "88%" } as CSSProperties}>
                React
              </span>
              <span style={{ "--bar-size": "72%" } as CSSProperties}>
                TypeScript
              </span>
              <span style={{ "--bar-size": "54%" } as CSSProperties}>
                Testing
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
