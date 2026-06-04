export type Candidate = {
  id: string;
  alias: string;
  name: string;
  school: string;
  major: string;
  grade: string;
  target: string;
  keywordHits: number;
  keywordTotal: number;
  resume: string;
};

export type JobDescription = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  fullJD: string;
  keywords: string[];
};

export type Confidence = "high" | "medium" | "low";
export type Recommendation = "high" | "medium" | "low";

export type CapabilityEvidence = {
  capability: string;
  evidence_from_resume: string;
  confidence: Confidence;
};

export type RediscoveredCandidate = {
  candidate_id: string;
  recommendation_level: Recommendation;
  why_missed_by_keywords: string;
  recommendation_reason: string;
  capability_evidence: CapabilityEvidence[];
  risks: string[];
  interview_questions: string[];
};

export type AnalysisResult = {
  job_profile: {
    core_tasks: string[];
    required_capabilities: { name: string; weight: number }[];
    evidence_keywords: string[];
  };
  baseline_filter: {
    rules: string[];
    passed_candidate_ids: string[];
    filtered_candidate_ids: string[];
  };
  rediscovered_candidates: RediscoveredCandidate[];
};

export type CandidateStatus = "pending" | "hit" | "missed" | "rediscovered";