import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Tutor } from './pages/Tutor';
import { Practice } from './pages/Practice';
import { LessonDetail } from './pages/LessonDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LinguaSphere. All rights reserved.</p>
            <p className="mt-2">Helping students learn English worldwide.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;