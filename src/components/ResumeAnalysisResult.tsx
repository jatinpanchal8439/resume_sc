
import React from 'react';
import { Circle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateReport } from '@/utils/reportGenerator';
import { ResumeAnalysis } from '@/types/resume';
import { LoadingSkeleton } from './resume/LoadingSkeleton';
import { ScoreIndicator } from './resume/ScoreIndicator';
import { StrengthsAndImprovements } from './resume/StrengthsAndImprovements';
import { KeywordAnalysis } from './resume/KeywordAnalysis';

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysis | null;
  isLoading: boolean;
}

const ResumeAnalysisResult: React.FC<ResumeAnalysisResultProps> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Resume Analysis Results</CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              className={`px-3 py-1 ${analysis.atsCompatible ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {analysis.atsCompatible ? 'ATS Compatible' : 'Not ATS Compatible'}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Circle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    ATS (Applicant Tracking System) compatibility means your resume can be properly parsed by automated systems used by employers.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ScoreIndicator score={analysis.overallScore} />
        <StrengthsAndImprovements 
          strengths={analysis.strengths} 
          improvements={analysis.improvements} 
        />
        <KeywordAnalysis keywordMatches={analysis.keywordMatches} />
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          onClick={() => generateReport(analysis)}
        >
          Download Report
        </Button>
        <Button className="bg-resume-primary hover:bg-blue-700">Optimize Resume</Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeAnalysisResult;
