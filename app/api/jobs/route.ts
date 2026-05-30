import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type JobPayload = {
  title?: unknown;
  company?: unknown;
  location?: unknown;
  sourceUrl?: unknown;
  description?: unknown;
};

function cleanOptional(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getTitle(payload: JobPayload) {
  const explicitTitle = cleanOptional(payload.title);

  if (explicitTitle) {
    return explicitTitle;
  }

  if (typeof payload.description !== "string") {
    return "Untitled job posting";
  }

  const firstLine = payload.description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return firstLine || "Untitled job posting";
}

export async function GET() {
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

  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  let payload: JobPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const description = cleanOptional(payload.description);

  if (!description) {
    return NextResponse.json(
      { error: "Job description is required." },
      { status: 400 },
    );
  }

  const job = await prisma.jobPosting.create({
    data: {
      title: getTitle(payload),
      company: cleanOptional(payload.company),
      location: cleanOptional(payload.location),
      sourceUrl: cleanOptional(payload.sourceUrl),
      description,
    },
  });

  return NextResponse.json({ job }, { status: 201 });
}
