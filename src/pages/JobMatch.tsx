
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import ResumeAnalysisResult from '@/components/ResumeAnalysisResult';
import { analyzeResume } from '@/services/resumeService';
import { useToast } from '@/components/ui/use-toast';
import { ResumeAnalysis } from '@/types/resume';

const JobMatch = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
    setAnalysisResult(null);
  };

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text);
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      toast({
        title: "No resume uploaded",
        description: "Please upload your resume first",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "No job description",
        description: "Please enter a job description for better matching",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(resumeFile, jobDescription);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Match Analysis</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter Job Description</h2>
          <JobDescriptionInput onJobDescriptionChange={handleJobDescriptionChange} />
        </div>
        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={handleAnalyzeResume}
            disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
            className="bg-resume-primary hover:bg-blue-700 min-w-[200px]"
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
        {(isAnalyzing || analysisResult) && (
          <div className="mt-8">
            <ResumeAnalysisResult analysis={analysisResult} isLoading={isAnalyzing} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatch;
