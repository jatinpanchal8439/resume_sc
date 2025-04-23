import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FileUpload from '@/components/FileUpload';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import ResumeAnalysisResult from '@/components/ResumeAnalysisResult';
import { analyzeResume } from '@/services/resumeService';
import { useToast } from '@/components/ui/use-toast';
import { ResumeAnalysis } from '@/types/resume';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
    // Reset analysis when a new file is uploaded
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

  const toggleHowItWorks = () => {
    setShowHowItWorks(!showHowItWorks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-resume-dark mb-4">
            Resume<span className="text-resume-primary">Insight</span>Pro
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-powered resume analysis to help you land your dream job. 
            Match your resume against job descriptions and get instant feedback.
          </p>
          
          <Button 
            variant="link" 
            onClick={toggleHowItWorks} 
            className="mt-4 text-resume-primary flex items-center gap-1 mx-auto"
          >
            How it works
            {showHowItWorks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showHowItWorks && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4 text-left max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">How ResumeInsightPro Works</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-resume-primary text-white w-6 h-6 rounded-full flex items-center justify-center">1</div>
                  <div>
                    <h3 className="font-medium">Upload Your Resume</h3>
                    <p className="text-gray-600 text-sm">Upload your resume in PDF, DOC, or DOCX format.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-resume-primary text-white w-6 h-6 rounded-full flex items-center justify-center">2</div>
                  <div>
                    <h3 className="font-medium">Enter Job Description</h3>
                    <p className="text-gray-600 text-sm">Paste the job description you're applying for.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-resume-primary text-white w-6 h-6 rounded-full flex items-center justify-center">3</div>
                  <div>
                    <h3 className="font-medium">Get Instant Analysis</h3>
                    <p className="text-gray-600 text-sm">Our AI analyzes your resume against the job description and provides a detailed report.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-resume-primary text-white w-6 h-6 rounded-full flex items-center justify-center">4</div>
                  <div>
                    <h3 className="font-medium">Optimize Your Resume</h3>
                    <p className="text-gray-600 text-sm">Follow our recommendations to improve your resume and increase your chances of getting hired.</p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="text-resume-primary h-5 w-5" />
              Upload Your Resume
            </h2>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Enter Job Description</h2>
            <JobDescriptionInput onJobDescriptionChange={handleJobDescriptionChange} />
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
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
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose ResumeInsightPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-resume-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Our advanced AI analyzes your resume against job descriptions to identify strengths and weaknesses.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-resume-primary"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">ATS Compatibility Check</h3>
              <p className="text-gray-600">Ensure your resume gets past Applicant Tracking Systems with our compatibility analysis.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-resume-primary"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">Get tailored suggestions to improve your resume for specific job positions.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-resume-dark">ResumeInsight<span className="text-resume-primary">Pro</span></span>
              <p className="text-sm text-gray-500 mt-1">© 2023 ResumeInsightPro. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-resume-primary">About</a>
              <a href="#" className="text-gray-500 hover:text-resume-primary">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-resume-primary">Terms</a>
              <a href="#" className="text-gray-500 hover:text-resume-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
