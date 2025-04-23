
export interface KeywordMatch {
  keyword: string;
  found: boolean;
  importance: number;
  context?: string;
}

export interface SkillGap {
  skill: string;
  importance: number;
  recommendation: string;
}

export interface ResumeAnalysis {
  overallScore: number;
  matchPercentage: number;
  keywordMatches: KeywordMatch[];
  skillGaps: SkillGap[];
  strengths: string[];
  improvements: string[];
  atsCompatible: boolean;
}
