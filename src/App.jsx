import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { appData } from './data/appData'; // 1. Import appData (This was the missing line)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPage from './components/pages/DashboardPage';
import YieldPredictionPage from './components/pages/YieldPredictionPage';
import RecommendationsPage from './components/pages/RecommendationsPage';
import DiseaseDetectorPage from './components/pages/DiseaseDetectorPage';
import WeatherPage from './components/pages/WeatherPage';
// Removed MarketPage
import SchemesPage from './components/pages/SchemesPage';
import CommunityPage from './components/pages/CommunityPage';
import ChatbotWidget from './components/ChatbotWidget';
import Notifications from './components/Notifications';

function App() {
    const [currentPage, setCurrentPage] = useState('hero');
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [notifications, setNotifications] = useState([]);

    const handleShowPage = (pageId) => {
        setCurrentPage(pageId);
        showNotification(`✅ Navigated to ${pageId.replace('-', ' ')} page`, 'success');
        window.location.hash = pageId;
    };

    const handleChangeLanguage = (lang) => {
        setCurrentLanguage(lang);
        showNotification(`🌐 Language changed to ${appData.languages[lang].name}`, 'success');
    };

    const showNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                setCurrentPage(hash);
            } else {
                setCurrentPage('hero');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    // This line now works because appData is imported
    const translations = appData.languages[currentLanguage];

    const pageVariants = {
        initial: { opacity: 0, x: -20 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 20 },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        <>
            <Navbar 
                onNavigate={handleShowPage} 
                onChangeLanguage={handleChangeLanguage} 
                currentLanguage={currentLanguage} 
                translations={translations}
                activePage={currentPage}
            />
            <main>
                <AnimatePresence mode="wait">
                    {/* Page components wrapped in motion.div */}
                    {currentPage === 'hero' && <motion.div key="hero" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Hero onNavigate={handleShowPage} translations={translations} /></motion.div>}
                    {currentPage === 'dashboard' && <motion.div key="dashboard" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><DashboardPage translations={translations} /></motion.div>}
                    {currentPage === 'yield-prediction' && <motion.div key="yield-prediction" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><YieldPredictionPage showNotification={showNotification} translations={translations} /></motion.div>}
                    {currentPage === 'recommendations' && <motion.div key="recommendations" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><RecommendationsPage showNotification={showNotification} translations={translations} /></motion.div>}
                    {currentPage === 'disease-detector' && <motion.div key="disease-detector" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><DiseaseDetectorPage showNotification={showNotification} /></motion.div>}
                    {currentPage === 'weather' && <motion.div key="weather" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><WeatherPage showNotification={showNotification} translations={translations} /></motion.div>}
                    {/* Market page removed */}
                    {currentPage === 'schemes' && <motion.div key="schemes" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SchemesPage showNotification={showNotification} translations={translations} /></motion.div>}
                    {currentPage === 'community' && <motion.div key="community" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><CommunityPage translations={translations} /></motion.div>}
                </AnimatePresence>
            </main>
            <ChatbotWidget 
                translations={translations} 
                currentLanguage={currentLanguage} 
                onChangeLanguage={handleChangeLanguage}
                showNotification={showNotification}
            />
            <Notifications notifications={notifications} />
        </>
    );
}

export default App;