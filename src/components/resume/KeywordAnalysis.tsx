
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { KeywordMatch } from "@/types/resume";

interface KeywordAnalysisProps {
  keywordMatches: KeywordMatch[];
}

export const KeywordAnalysis = ({ keywordMatches }: KeywordAnalysisProps) => {
  const sortedKeywords = [...keywordMatches].sort((a, b) => b.importance - a.importance);
  const foundKeywords = sortedKeywords.filter(k => k.found);
  const missingKeywords = sortedKeywords.filter(k => !k.found);

  return (
    <div>
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-resume-primary" />
        Keyword Matches ({foundKeywords.length}/{sortedKeywords.length})
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-xs text-gray-500 mb-2">Found Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {foundKeywords.map((keyword, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge 
                      variant="outline" 
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                      {keyword.keyword}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Importance: {keyword.importance}/10</p>
                    {keyword.context && <p className="text-xs mt-1">{keyword.context}</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {foundKeywords.length === 0 && (
              <span className="text-sm text-gray-500">No matching keywords found</span>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs text-gray-500 mb-2">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge 
                      variant="outline" 
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      {keyword.keyword}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Importance: {keyword.importance}/10</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {missingKeywords.length === 0 && (
              <span className="text-sm text-gray-500">No missing keywords</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
