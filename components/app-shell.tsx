"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  LayoutDashboard,
  LineChart,
  Sparkles,
  UserRound,
} from "lucide-react";

export type AppPage = "Home" | "Dashboard" | "Jobs" | "Roadmap" | "Projects" | "Profile";

const navItems: { label: AppPage; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
  { label: "Roadmap", href: "/roadmap", icon: BookOpenCheck },
  { label: "Projects", href: "/projects", icon: GraduationCap },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function EdgeSidebar({ active }: { active: AppPage }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (event.clientX <= 28) {
        setIsOpen(true);
        return;
      }

      if (event.clientX > 330) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`edge-nav${isOpen ? " open" : ""}`}
      aria-label="Reveal navigation"
      onMouseEnter={() => setIsOpen(true)}
    >
      <button
        aria-label="Open navigation"
        className="edge-hotspot"
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        type="button"
      />
      <aside className="reveal-sidebar" aria-label="SkillSignal pages">
        <Link className="sidebar-brand" href="/">
          <span className="brand-icon">
            <Sparkles aria-hidden="true" />
          </span>
          <span>SkillSignal</span>
        </Link>
        <nav className="reveal-menu" aria-label="Application navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                aria-current={item.label === active ? "page" : undefined}
                className={item.label === active ? "active" : undefined}
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-note">
          <LineChart aria-hidden="true" />
          <span>Move left to navigate anytime.</span>
        </div>
      </aside>
    </div>
  );
}

export function AppShell({
  active,
  eyebrow,
  title,
  description,
  children,
}: {
  active: AppPage;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="app-route">
      <EdgeSidebar active={active} />
      <section className="route-surface">
        <header className="route-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
