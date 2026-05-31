import { openai, skillExtractionModel } from "@/lib/ai";

export type ExtractedSkill = {
  name: string;
  category: string;
  confidence: number;
};

type SkillExtractionResponse = {
  skills: ExtractedSkill[];
};

const skillExtractionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    skills: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: {
            type: "string",
            description: "Short canonical skill name, such as React or Technical Writing.",
          },
          category: {
            type: "string",
            enum: ["Technical", "Soft", "Other"],
          },
          confidence: {
            type: "number",
            description: "A value from 0 to 1 representing how clearly the posting requests this skill.",
          },
        },
        required: ["name", "category", "confidence"],
      },
    },
  },
  required: ["skills"],
};

function cleanSkillName(name: string) {
  return name.replace(/\s+/g, " ").trim();
}

function clampConfidence(confidence: number) {
  if (!Number.isFinite(confidence)) {
    return 0;
  }

  return Math.min(1, Math.max(0, confidence));
}

function normalizeSkills(skills: ExtractedSkill[]) {
  const seen = new Set<string>();
  const normalized: ExtractedSkill[] = [];

  for (const skill of skills) {
    const name = cleanSkillName(skill.name);
    const key = name.toLowerCase();

    if (!name || seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push({
      name,
      category: skill.category,
      confidence: clampConfidence(skill.confidence),
    });

    if (normalized.length >= 20) {
      break;
    }
  }

  return normalized;
}

export async function extractSkillsFromJobDescription(
  description: string,
): Promise<ExtractedSkill[]> {
  if (!description.trim()) {
    return [];
  }

  try {
    const response = await openai.responses.create({
      model: skillExtractionModel,
      reasoning: { effort: "minimal" },
      instructions:
        "Extract skills from job postings for an early-career career roadmap app. Include clearly requested skills and strongly implied skills. Prefer concise, reusable skill names. Do not include company names, benefits, locations, or generic job duties.",
      input: description,
      max_output_tokens: 1200,
      text: {
        format: {
          type: "json_schema",
          name: "job_skill_extraction",
          strict: true,
          schema: skillExtractionSchema,
        },
      },
    });

    if (!response.output_text) {
      console.warn("AI skill extraction returned no output.", response.incomplete_details);

      return [];
    }

    const parsed = JSON.parse(response.output_text) as SkillExtractionResponse;

    return normalizeSkills(parsed.skills);
  } catch (error) {
    console.warn("AI skill extraction failed.", error);

    return [];
  }
}
