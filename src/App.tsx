import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { GrievanceProvider } from './context/GrievanceContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';

import { HomePage } from './pages/HomePage';
import { LodgeGrievancePage } from './pages/LodgeGrievancePage';
import { SuccessPage } from './pages/SuccessPage';
import { MyGrievancesPage } from './pages/MyGrievancesPage';
import { TrackGrievancePage } from './pages/TrackGrievancePage';
import { AppealPage } from './pages/AppealPage';
import { HelpPage } from './pages/HelpPage';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <GrievanceProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-900">
              <Header />
              <main className="flex-1 w-full py-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/lodge" element={<LodgeGrievancePage />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/my-grievances" element={<MyGrievancesPage />} />
                  <Route path="/track" element={<TrackGrievancePage />} />
                  <Route path="/appeal" element={<AppealPage />} />
                  <Route path="/help" element={<HelpPage />} />
                </Routes>
              </main>
              <Footer />
              <LoginModal />
            </div>
          </Router>
        </GrievanceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
