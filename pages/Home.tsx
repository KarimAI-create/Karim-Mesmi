import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, Mail, FileText } from 'lucide-react';
import { AdUnit } from '../components/AdUnit';
import { AdFormat } from '../types';

const lessons = [
  { id: '1', title: 'Transitive & Intransitive Verbs', category: 'Grammar', level: 'Intermediate', desc: 'The most important lesson! Learn which verbs need objects and which ones do not.' },
  { id: '2', title: 'Action vs. State Verbs', category: 'Vocabulary', level: 'Beginner', desc: 'Understand the difference between doing and being.' },
  { id: '3', title: 'Direct Objects', category: 'Grammar', level: 'Intermediate', desc: 'Find the receiver of the action in a sentence.' },
  { id: '4', title: 'Common Phrasal Verbs', category: 'Vocabulary', level: 'Advanced', desc: 'Fun multi-word verbs used in daily life.' },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold mb-4">
            Created by Mr. Karim
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Master English Grammar</h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">Welcome to your fun learning space! Today's focus: <br/> <span className="font-bold text-accent">Transitive & Intransitive Verbs</span>.</p>
          <div className="flex flex-wrap justify-center gap-4">
             <Link to="/lesson/1" className="bg-accent hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg flex items-center gap-2">
              <BookOpen size={20} /> Start Lesson
            </Link>
            <Link to="/practice" className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
              Take a Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Lessons */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-4">Classroom Lessons</h2>
          
          {/* Featured Lesson */}
          <div className="bg-gradient-to-br from-white to-blue-50 p-1 rounded-xl shadow-md mb-8 border-2 border-primary/20">
             <div className="bg-white p-6 rounded-lg h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    FEATURED
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Transitive & Intransitive Verbs</h3>
                <p className="text-gray-600 mb-4">
                    Does the verb need an object? Can it stand alone? Mr. Karim explains it all in this fun lesson with worksheets!
                </p>
                <div className="mt-auto">
                    <Link to="/lesson/1" className="w-full block text-center bg-primary text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Start Learning Now
                    </Link>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {lessons.slice(1).map((lesson) => (
              <div key={lesson.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold uppercase
                    ${lesson.category === 'Grammar' ? 'bg-blue-100 text-blue-700' : 
                      lesson.category === 'Vocabulary' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {lesson.category}
                  </span>
                  <span className="text-xs text-gray-500">{lesson.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{lesson.desc}</p>
                <Link to={`/lesson/${lesson.id}`} className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View Lesson <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          {/* In-feed Ad Unit */}
          <AdUnit format={AdFormat.Banner} slotId="1234567890" className="mt-8" />
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 flex-shrink-0 space-y-8">
          
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
             <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                <span className="text-2xl">👨‍🏫</span>
             </div>
             <h3 className="font-bold text-gray-800">Mr. Karim</h3>
             <p className="text-sm text-gray-500 mb-4">English Teacher</p>
             <p className="text-sm text-gray-600 mb-4">Have a request for a new lesson or worksheet?</p>
             <a href="mailto:karim.mesmi@hasqatar.com" className="flex items-center justify-center gap-2 w-full bg-fun text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Mail size={16} /> Send Email
             </a>
          </div>

          {/* Sidebar Ad */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase mb-2">Sponsored</span>
            <AdUnit format={AdFormat.Rectangle} slotId="0987654321" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/lesson/1" className="flex items-center gap-3 text-gray-600 hover:text-primary p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText size={20} className="text-accent" />
                  <span>Worksheets</span>
                </Link>
              </li>
              <li>
                <Link to="/practice" className="flex items-center gap-3 text-gray-600 hover:text-primary p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Star size={20} className="text-accent" />
                  <span>Take the Quiz</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};