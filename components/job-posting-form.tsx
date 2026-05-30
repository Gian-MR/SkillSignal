"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Link as LinkIcon,
  LoaderCircle,
  MapPin,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";

const exampleDescription = `Frontend Developer Intern

We are looking for an early-career developer who can build accessible React interfaces, write clean TypeScript, collaborate with designers, and test user flows with React Testing Library.

Responsibilities:
- Build reusable UI components
- Work with REST APIs
- Improve accessibility and keyboard behavior
- Write tests for critical interactions

Nice to have:
- Prisma or SQL experience
- Deployed portfolio projects
- Clear technical writing`;

export function JobPostingForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "ready" | "analyzing">("idle");

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
  const hasEnoughDetail = wordCount >= 60;
  const hasContext = Boolean(title || company || sourceUrl);
  const readiness = [hasEnoughDetail, hasContext, Boolean(description.trim())].filter(Boolean).length;

  function loadExample() {
    setTitle("Frontend Developer Intern");
    setCompany("SkillSignal Demo Co.");
    setLocation("Remote");
    setSourceUrl("https://example.com/frontend-intern");
    setDescription(exampleDescription);
    setStatus("idle");
  }

  function resetForm() {
    setTitle("");
    setCompany("");
    setLocation("");
    setSourceUrl("");
    setDescription("");
    setStatus("idle");
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    setDescription(text);
    setStatus("idle");
    event.target.value = "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!description.trim()) {
      setStatus("idle");
      return;
    }

    setStatus("analyzing");
    window.setTimeout(() => setStatus("ready"), 650);
  }

  return (
    <form className="job-form-shell" onSubmit={handleSubmit}>
      <section className="job-form-card" aria-label="Add job posting form">
        <div className="form-grid">
          <label className="field">
            <span>
              <BriefcaseBusiness aria-hidden="true" />
              Job title
              <small>Optional</small>
            </span>
            <input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Senior Frontend Engineer"
              value={title}
            />
          </label>

          <label className="field">
            <span>
              <Building2 aria-hidden="true" />
              Company
              <small>Optional</small>
            </span>
            <input
              onChange={(event) => setCompany(event.target.value)}
              placeholder="TechCorp"
              value={company}
            />
          </label>

          <label className="field">
            <span>
              <MapPin aria-hidden="true" />
              Location
              <small>Optional</small>
            </span>
            <input
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Remote, San Francisco"
              value={location}
            />
          </label>

          <label className="field">
            <span>
              <LinkIcon aria-hidden="true" />
              Source URL
              <small>Optional</small>
            </span>
            <input
              onChange={(event) => setSourceUrl(event.target.value)}
              placeholder="https://..."
              type="url"
              value={sourceUrl}
            />
          </label>
        </div>

        <label className="field description-field">
          <span>
            <ClipboardList aria-hidden="true" />
            Job description
            <small>Required</small>
          </span>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
              setStatus("idle");
            }}
            placeholder="Paste the full job description here..."
            required
            value={description}
          />
        </label>

        <div className="form-footer">
          <div className="form-actions">
            <button className="analyze-button" type="submit">
              {status === "analyzing" ? (
                <LoaderCircle aria-hidden="true" className="spin-icon" />
              ) : (
                <Sparkles aria-hidden="true" />
              )}
              {status === "analyzing" ? "Analyzing..." : "Analyze job"}
            </button>
            <button
              className="utility-button"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <Upload aria-hidden="true" />
              Upload file
            </button>
            <button className="utility-button" onClick={loadExample} type="button">
              <FileText aria-hidden="true" />
              Load example
            </button>
            <button className="icon-utility" onClick={resetForm} type="button" aria-label="Clear form">
              <RotateCcw aria-hidden="true" />
            </button>
          </div>
          <input
            accept=".txt,.md"
            className="file-input"
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
          />
          <p className="form-count">{wordCount} words</p>
        </div>
      </section>

      <aside className="job-insight-card" aria-label="Job posting quality">
        <span className="mini-label">Input quality</span>
        <h2>{readiness}/3 ready</h2>
        <p>
          Add enough description text and at least one context field so the
          analyzer can separate hard requirements from nice-to-have skills.
        </p>
        <div className="readiness-list">
          <span className={description.trim() ? "done" : undefined}>
            <CheckCircle2 aria-hidden="true" />
            Description pasted
          </span>
          <span className={hasEnoughDetail ? "done" : undefined}>
            <CheckCircle2 aria-hidden="true" />
            60+ words of detail
          </span>
          <span className={hasContext ? "done" : undefined}>
            <CheckCircle2 aria-hidden="true" />
            Role context added
          </span>
        </div>
        {status === "ready" ? (
          <div className="analysis-preview">
            <strong>Ready for backend</strong>
            <span>This form can now connect to `/api/jobs` when the API is added.</span>
          </div>
        ) : null}
      </aside>
    </form>
  );
}
