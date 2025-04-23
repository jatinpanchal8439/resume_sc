
import React, { useState, useRef } from 'react';
import { Upload, FilePlus, X, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedFileTypes = ['.pdf', '.doc', '.docx'],
  maxFileSizeMB = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxFileSizeMB}MB`,
        variant: "destructive"
      });
      return false;
    }

    // Check file type
    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFileTypes.includes(fileExt)) {
      toast({
        title: "Invalid file type",
        description: `Accepted file types: ${acceptedFileTypes.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        handleFileUpload(droppedFile);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        handleFileUpload(selectedFile);
      }
    }
  };

  const handleFileUpload = (file: File) => {
    setFile(file);
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        onFileUpload(file);
        
        toast({
          title: "Upload complete",
          description: "Your resume has been uploaded successfully.",
          variant: "default"
        });
      }
    }, 150);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging ? 'border-resume-primary bg-blue-50' : 'border-gray-300 hover:border-resume-primary'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-blue-50 p-4 rounded-full">
                <Upload className="h-8 w-8 text-resume-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Upload your resume</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop your resume file here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Accepted formats: {acceptedFileTypes.join(', ')} (Max: {maxFileSizeMB}MB)
                </p>
              </div>
              <Button 
                onClick={openFileSelector}
                className="bg-resume-primary hover:bg-blue-700"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Select File
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-md">
                  <FileText className="h-6 w-6 text-resume-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRemoveFile}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isUploading ? (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-gray-500 text-right">{uploadProgress}% uploaded</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-resume-secondary">
                <Check className="h-4 w-4" />
                <span>File uploaded successfully</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptedFileTypes.join(',')}
        className="hidden"
      />
    </Card>
  );
};

export default FileUpload;
