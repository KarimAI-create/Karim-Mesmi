import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { chatWithTutor } from '../services/geminiService';
import { Message, AdFormat } from '../types';
import { AdUnit } from '../components/AdUnit';

export const Tutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'model', text: "Hello! I'm Professor Lingua. What would you like to practice today?", timestamp: Date.now() }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await chatWithTutor(history, userMsg.text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText || "I couldn't think of a response.", timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
        
        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-4 bg-primary text-white flex items-center gap-2">
            <Sparkles size={20} />
            <h2 className="font-bold">AI English Tutor</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
               <div className="flex gap-3 justify-start">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
                   <div className="flex gap-1">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a sentence to practice..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Ad Space for high engagement page */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 h-full">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 text-center">Sponsored Content</h3>
            <AdUnit format={AdFormat.Vertical} slotId="999888777" className="h-full" />
          </div>
        </div>

      </div>
    </div>
  );
};