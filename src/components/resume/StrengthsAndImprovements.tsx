
import { Check, AlertTriangle, Trophy, Activity } from "lucide-react";

interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

export const StrengthsAndImprovements = ({ strengths, improvements }: StrengthsAndImprovementsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-resume-primary" />
          Strengths
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{strength}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-resume-primary" />
          Suggested Improvements
        </h3>
        <ul className="space-y-2">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
