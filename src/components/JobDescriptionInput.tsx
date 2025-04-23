
import React, { useState } from 'react';
import { Briefcase, X, Copy, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface JobDescriptionInputProps {
  onJobDescriptionChange: (jobDescription: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onJobDescriptionChange }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJobDescription(value);
    onJobDescriptionChange(value);
  };

  const handleClear = () => {
    setJobDescription('');
    onJobDescriptionChange('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      onJobDescriptionChange(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const sampleJobDescription = `Senior Frontend Developer

ABOUT THE ROLE:
We are looking for a Senior Frontend Developer to join our growing team. In this role, you will be responsible for building user interfaces for our web applications using React and TypeScript.

REQUIREMENTS:
- 5+ years of experience in frontend development
- Strong proficiency in JavaScript, TypeScript, React, and Redux
- Experience with modern frontend build tools (Webpack, Babel, etc.)
- Excellent understanding of responsive design and cross-browser compatibility
- Good understanding of web accessibility standards
- Experience with testing frameworks like Jest and React Testing Library
- Ability to write clean, maintainable, and efficient code
- Strong problem-solving skills and attention to detail
- Experience with CI/CD pipelines and version control systems (Git)

NICE TO HAVE:
- Experience with Next.js
- Knowledge of backend technologies (Node.js, Python, etc.)
- Experience with performance optimization techniques
- Familiarity with design systems and component libraries
- Experience working in an Agile environment`;

  const handleUseSample = () => {
    setJobDescription(sampleJobDescription);
    onJobDescriptionChange(sampleJobDescription);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-resume-primary" />
            <CardTitle className="text-lg font-semibold">Job Description</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUseSample}
              className="text-xs"
            >
              Use Sample
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePaste}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Paste
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClear}
              disabled={!jobDescription}
              className="text-xs text-gray-500"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        <CardDescription>
          Paste the job description to analyze how well your resume matches the requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste job description here..."
          className="min-h-[200px] font-light"
          value={jobDescription}
          onChange={handleInputChange}
        />
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
