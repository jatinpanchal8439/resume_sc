import { ResumeAnalysis } from '@/types/resume';

export const generateReport = (analysis: ResumeAnalysis): void => {
  // Create report content
  const reportContent = `
Resume Analysis Report
Generated on: ${new Date().toLocaleDateString()}

Overall Match Score: ${analysis.overallScore}%
ATS Compatibility: ${analysis.atsCompatible ? 'Compatible' : 'Not Compatible'}

Strengths:
${analysis.strengths.map(strength => `- ${strength}`).join('\n')}

Areas for Improvement:
${analysis.improvements.map(improvement => `- ${improvement}`).join('\n')}

Keyword Analysis:
Found Keywords (${analysis.keywordMatches.filter(k => k.found).length}):
${analysis.keywordMatches
  .filter(k => k.found)
  .map(k => `- ${k.keyword} (Importance: ${k.importance}/10)`)
  .join('\n')}

Missing Keywords (${analysis.keywordMatches.filter(k => !k.found).length}):
${analysis.keywordMatches
  .filter(k => !k.found)
  .map(k => `- ${k.keyword} (Importance: ${k.importance}/10)`)
  .join('\n')}
`;

  // Create blob and download
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume-analysis-report.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
