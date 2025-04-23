
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { FileText, User } from 'lucide-react';

const MobileMenu = () => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/job-match')}
          >
            Job Match
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/history')}
          >
            History
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/about')}
          >
            About
          </Button>
          <hr className="my-2" />
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={() => navigate('/auth')}
          >
            <User className="w-4 h-4" /> Sign In
          </Button>
          <Button 
            className="w-full justify-start gap-2 bg-resume-primary hover:bg-blue-700"
            onClick={() => navigate('/job-match')}
          >
            <FileText className="w-4 h-4" /> Enhance Resume
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
