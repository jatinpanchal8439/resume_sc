
import { Progress } from "@/components/ui/progress";

interface ScoreIndicatorProps {
  score: number;
}

export const ScoreIndicator = ({ score }: ScoreIndicatorProps) => {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Overall Match Score</h3>
        <span className="text-2xl font-bold">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Poor Match</span>
        <span>Perfect Match</span>
      </div>
    </div>
  );
};
