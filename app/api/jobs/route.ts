import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { extractSkillsFromJobDescription } from "@/lib/skill-extractor";

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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Job posting id is required." },
      { status: 400 },
    );
  }

  try {
    await prisma.jobPosting.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete job posting", error);

    return NextResponse.json(
      { error: "Could not delete this job posting. Please try again." },
      { status: 500 },
    );
  }
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

  try {
    const extractedSkills = await extractSkillsFromJobDescription(description);

    const job = await prisma.jobPosting.create({
      data: {
        title: getTitle(payload),
        company: cleanOptional(payload.company),
        location: cleanOptional(payload.location),
        sourceUrl: cleanOptional(payload.sourceUrl),
        description,
        jobSkills: extractedSkills.length
          ? {
              create: extractedSkills.map((extractedSkill) => ({
                confidence: extractedSkill.confidence,
                skill: {
                  connectOrCreate: {
                    where: { name: extractedSkill.name },
                    create: {
                      name: extractedSkill.name,
                      category: extractedSkill.category,
                    },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        jobSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Failed to save and analyze job posting", error);

    return NextResponse.json(
      { error: "Could not save this job posting. Please try again." },
      { status: 500 },
    );
  }
}
