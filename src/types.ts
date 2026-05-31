export type ThesisSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "NONPROFIT_FOUNDATION"
  | "PROPTECH"
  | "ROBOTICS"
  | "EXECUTIVE_INTELLIGENCE";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type PriorityBand = "MUST_FIX" | "SHORE_UP" | "DEFEND";

export interface ThesisItem {
  id: string;
  theme: string;
  sector: ThesisSector;
  executiveBuyer: string;
  categoryClaim: string;
  investorQuestion: string;
  priorityBand: PriorityBand;
  coherenceScore: number;
  marketTailwindScore: number;
  investorClarityScore: number;
  evidenceState: EvidenceState;
  wedgeSummary: string;
  whyNowThesis: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface ThesisExport {
  generatedAt: string;
  items: ThesisItem[];
}

export type FindingCode =
  | "missing-evidence"
  | "weak-wedge"
  | "timing-fragility"
  | "category-defensible"
  | "narrative-drift";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  sector: ThesisSector;
  theme: string;
  message: string;
}

export interface ThesisReport {
  generatedAt: string;
  items: number;
  averageCoherence: number;
  averageTailwind: number;
  averageInvestorClarity: number;
  defensibleThemes: number;
  missingEvidenceItems: number;
  narrativeRiskScore: number;
  findingsList: Finding[];
  ok: boolean;
}
