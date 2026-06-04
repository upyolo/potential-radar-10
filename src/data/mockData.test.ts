import { describe, expect, test } from "bun:test";

import {
  demoBrand,
  demoResumeBatch,
  defaultJob,
  defaultCandidates,
  defaultAnalysis,
} from "./mockData";

describe("hackathon demo mock data", () => {
  test("contains the full resume-to-recommendation demo flow", () => {
    expect(demoBrand.name).toBe("璞见");
    expect(demoBrand.tagline).toBe("See People, Not Just Keywords.");
    expect(demoResumeBatch.resumes.length).toBe(defaultCandidates.length);
    expect(defaultJob.keywords.length).toBeGreaterThan(0);
    expect(defaultAnalysis.baseline_filter.passed_candidate_ids.length).toBeGreaterThan(0);
    expect(defaultAnalysis.rediscovered_candidates.length).toBeGreaterThan(0);
  });
});
