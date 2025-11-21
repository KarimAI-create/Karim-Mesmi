import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { AdUnit } from '../components/AdUnit';
import { AdFormat } from '../types';

export const LessonDetail: React.FC = () => {
  const { id } = useParams();

  // Logic to display specific content based on ID, but defaulting to Transitive for this demo request
  const isTransitiveLesson = id === '1' || !id;

  if (!isTransitiveLesson) {
      return (
          <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">Lesson Coming Soon!</h1>
              <Link to="/" className="text-primary hover:underline">Go Home</Link>
          </div>
      )
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-1" /> Back to Class
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-fun to-indigo-600 flex items-center justify-center p-6">
            <div className="text-center text-white">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">Grammar • Mr. Karim</span>
                <h1 className="text-3xl md:text-4xl font-bold">Transitive vs. Intransitive Verbs</h1>
            </div>
        </div>
        
        <div className="p-8 md:p-10 leading-relaxed text-gray-700">
            
            {/* Intro */}
            <p className="text-lg mb-6">
                Hello students! 👋 Today we are going to solve the mystery of verbs. Some verbs need a "friend" (an object) to make sense, and some are happy being alone. Let's learn how to spot them!
            </p>

            {/* Section 1: Transitive */}
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    1. Transitive Verbs (The "Needy" Verbs)
                </h2>
                <p className="mb-4">
                    A <strong>Transitive Verb</strong> transfers its action to something. It <em>needs</em> a Direct Object to complete the meaning. 
                </p>
                <p className="italic text-gray-600 mb-2">Ask yourself: "Verb WHAT?" or "Verb WHOM?"</p>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                    <p className="font-bold text-green-700 mb-1">✅ Correct:</p>
                    <p>Mr. Karim <span className="font-bold text-primary">bought</span> a <u>gift</u>.</p>
                    <p className="text-sm text-gray-500 mt-1">(Bought WHAT? A gift. "Gift" is the object.)</p>
                    
                    <div className="h-px bg-gray-200 my-3"></div>

                    <p className="font-bold text-red-600 mb-1">❌ Incorrect:</p>
                    <p>Mr. Karim <span className="font-bold text-primary">bought</span>.</p>
                    <p className="text-sm text-gray-500 mt-1">(Bought what? The sentence is incomplete! It needs an object.)</p>
                </div>
            </div>

            {/* Ad Unit */}
            <AdUnit format={AdFormat.Banner} slotId="11223344" className="my-8" />

            {/* Section 2: Intransitive */}
            <div className="mb-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                    2. Intransitive Verbs (The "Independent" Verbs)
                </h2>
                <p className="mb-4">
                    An <strong>Intransitive Verb</strong> does NOT need an object. The action stops with the subject. It stands alone perfectly!
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                    <p className="font-bold text-green-700 mb-1">✅ Examples:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The baby <span className="font-bold text-fun">cried</span>.</li>
                        <li>The sun <span className="font-bold text-fun">shines</span> brightly.</li>
                        <li>We <span className="font-bold text-fun">laughed</span>.</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-2 text-center font-medium">Notice: No object receives the action!</p>
                </div>
            </div>

            {/* Worksheet Section */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">📝 Worksheet: Practice Time!</h2>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">MR. KARIM'S CLASS</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl bg-gray-50">
                    <p className="mb-4 font-semibold">Identify if the bold verb is Transitive (T) or Intransitive (I):</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0">1</span>
                            <p>The students <span className="font-bold">finished</span> their homework.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0">2</span>
                            <p>The bird <span className="font-bold">flew</span> away.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0">3</span>
                            <p>Please <span className="font-bold">pass</span> the salt.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0">4</span>
                            <p>He <span className="font-bold">slept</span> all day.</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <details className="cursor-pointer">
                            <summary className="text-primary font-bold hover:text-blue-700 select-none">Click to see Answers</summary>
                            <div className="mt-2 p-4 bg-white rounded border border-gray-200 text-sm">
                                <ol className="list-decimal pl-5 space-y-1">
                                    <li><strong>Transitive</strong> (Object: homework)</li>
                                    <li><strong>Intransitive</strong> (No object, "away" is an adverb)</li>
                                    <li><strong>Transitive</strong> (Object: salt)</li>
                                    <li><strong>Intransitive</strong> (No object)</li>
                                </ol>
                            </div>
                        </details>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white text-center shadow-lg">
                <h3 className="text-xl font-bold mb-2">Want more practice?</h3>
                <p className="text-blue-100 mb-6">Let the AI generate a unique quiz specifically on this topic for you!</p>
                <Link to="/practice" className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 shadow-md">
                    Go to Quiz Generator
                </Link>
            </div>
            
            <div className="text-center mt-8">
                 <p className="text-gray-500 text-sm">Questions? Email Mr. Karim at <a href="mailto:karim.mesmi@hasqatar.com" className="text-primary hover:underline">karim.mesmi@hasqatar.com</a></p>
            </div>
        </div>
      </div>
    </div>
  );
};