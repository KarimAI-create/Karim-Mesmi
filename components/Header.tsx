import React from 'react';
import { BookOpen, MessageCircle, Award, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold bg-blue-50' : 'text-gray-600 hover:text-primary';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800 tracking-tight leading-none">Mr. Karim's</span>
            <span className="text-xs text-gray-500 font-medium">English Class</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${isActive('/')}`}>
            Lessons
          </Link>
          <Link to="/tutor" className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${isActive('/tutor')}`}>
            <MessageCircle size={18} />
            AI Tutor
          </Link>
          <Link to="/practice" className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${isActive('/practice')}`}>
            <Award size={18} />
            Practice
          </Link>
          <a 
            href="mailto:karim.mesmi@hasqatar.com" 
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-fun text-white hover:bg-purple-700 transition-colors shadow-sm font-medium text-sm ml-2"
          >
            <Mail size={16} />
            Contact Mr. Karim
          </a>
        </nav>
      </div>
    </header>
  );
};