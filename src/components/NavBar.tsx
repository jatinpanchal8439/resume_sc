
import React from 'react';
import { FileText, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-200 bg-white py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-resume-primary" />
          <span className="text-xl font-bold text-resume-dark">ResumeInsight<span className="text-resume-primary">Pro</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-resume-primary transition-colors">Home</Link>
          <Link to="/job-match" className="text-gray-700 hover:text-resume-primary transition-colors">Job Match</Link>
          <Link to="/history" className="text-gray-700 hover:text-resume-primary transition-colors">History</Link>
          <Link to="/about" className="text-gray-700 hover:text-resume-primary transition-colors">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
            onClick={() => navigate('/auth')}
          >
            <User className="w-4 h-4" /> Sign In
          </Button>
          <Button 
            className="bg-resume-primary hover:bg-blue-700 text-white hidden md:flex items-center gap-2"
            onClick={() => navigate('/job-match')}
          >
            <FileText className="w-4 h-4" /> Enhance Resume
          </Button>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
