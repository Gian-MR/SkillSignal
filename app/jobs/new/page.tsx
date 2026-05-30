import { AppShell } from "@/components/app-shell";
import { JobPostingForm } from "@/components/job-posting-form";

export default function NewJobPage() {
  return (
    <AppShell
      active="Add Job"
      description="Paste a posting, add a little context, and prepare it for skill extraction and roadmap matching."
      eyebrow="Add job posting"
      title="Capture a role before the signal gets lost"
    >
      <JobPostingForm />
    </AppShell>
  );
}
