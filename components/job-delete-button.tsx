"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type JobDeleteButtonProps = {
  jobId: string;
  jobTitle: string;
};

export function JobDeleteButton({ jobId, jobTitle }: JobDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteJob() {
    const shouldDelete = window.confirm(`Delete "${jobTitle}"?`);

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/jobs?id=${encodeURIComponent(jobId)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete request failed.");
      }

      router.refresh();
    } catch {
      window.alert("Could not delete this job posting. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      aria-label={`Delete ${jobTitle}`}
      className="delete-job-button"
      disabled={isDeleting}
      onClick={deleteJob}
      title="Delete job"
      type="button"
    >
      <Trash2 aria-hidden="true" />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
