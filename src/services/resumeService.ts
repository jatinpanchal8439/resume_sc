
import { ResumeAnalysis } from '@/types/resume';

// Mock function to analyze resume with improved matching algorithm
export const analyzeResume = async (resumeFile: File, jobDescription: string): Promise<ResumeAnalysis> => {
  // In a real app, this would send the file to a backend API
  console.log('Analyzing resume:', resumeFile.name);
  console.log('Job description:', jobDescription);
  
  // Simulate API delay with a shorter time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract keywords from job description (mock implementation)
  const mockKeywords = jobDescription.toLowerCase().split(' ')
    .filter(word => word.length > 3)
    .slice(0, 5)
    .map(keyword => ({
      keyword: keyword.charAt(0).toUpperCase() + keyword.slice(1),
      found: Math.random() > 0.3,
      importance: Math.floor(Math.random() * 5) + 5,
      context: `Found in resume context`
    }));

  // Return analysis with dynamic matching based on job description
  return {
    overallScore: Math.floor(Math.random() * 30) + 65,
    matchPercentage: Math.floor(Math.random() * 40) + 60,
    atsCompatible: Math.random() > 0.2,
    
    keywordMatches: [
      ...mockKeywords,
      { keyword: "React", found: true, importance: 10, context: "Used React for building interactive UIs" },
      { keyword: "TypeScript", found: true, importance: 9, context: "Implemented TypeScript for type-safety" },
      { keyword: "JavaScript", found: true, importance: 8, context: "Advanced JavaScript skills" },
    ],
    
    skillGaps: [
      { 
        skill: "Performance optimization", 
        importance: 8, 
        recommendation: "Add examples of performance optimization in your projects" 
      },
      { 
        skill: "Testing methodologies", 
        importance: 7, 
        recommendation: "Include experience with testing frameworks" 
      },
      { 
        skill: "Technical communication", 
        importance: 6, 
        recommendation: "Highlight examples of technical documentation or team collaboration" 
      },
    ],
    
    strengths: [
      "Strong technical foundation",
      "Clear project descriptions",
      "Good problem-solving examples",
      "Well-structured resume format",
      "Relevant experience highlighted"
    ],
    
    improvements: [
      "Add more quantifiable achievements",
      "Include specific technical metrics",
      "Expand on leadership experiences",
      "Add more industry-specific keywords",
      "Be more specific about project impacts"
    ]
  };
};
