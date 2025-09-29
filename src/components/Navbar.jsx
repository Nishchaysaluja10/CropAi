import React from 'react';

const Navbar = ({ onNavigate, onChangeLanguage, currentLanguage, translations, activePage }) => {
    
    const handleNavClick = (e, pageId) => {
        e.preventDefault();
        onNavigate(pageId);
    };

    const handleLangChange = (e) => {
        onChangeLanguage(e.target.value);
    };

    // This component now directly uses the 'translations' prop for every link.
    // When the prop changes, React will automatically re-render this component with the new text.
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <h2>🌾 CropAI</h2>
                        </a>
                    </div>
                    <div className="nav-links">
                        <select className="language-selector" id="globalLanguageSelect" value={currentLanguage} onChange={handleLangChange}>
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="or">ଓଡ଼ିଆ</option>
                        </select>
                        <a href="#dashboard" onClick={(e) => handleNavClick(e, 'dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>{translations.nav.dashboard}</a>
                        <a href="#yield-prediction" onClick={(e) => handleNavClick(e, 'yield-prediction')} className={activePage === 'yield-prediction' ? 'active' : ''}>{translations.nav.yield}</a>
                        <a href="#recommendations" onClick={(e) => handleNavClick(e, 'recommendations')} className={activePage === 'recommendations' ? 'active' : ''}>{translations.nav.recommendations}</a>
                        <a href="#disease-detector" onClick={(e) => handleNavClick(e, 'disease-detector')} className={activePage === 'disease-detector' ? 'active' : ''}>{translations.nav.disease}</a>
                        <a href="#weather" onClick={(e) => handleNavClick(e, 'weather')} className={activePage === 'weather' ? 'active' : ''}>{translations.nav.weather}</a>
                        {/* Market link removed */}
                        <a href="#schemes" onClick={(e) => handleNavClick(e, 'schemes')} className={activePage === 'schemes' ? 'active' : ''}>{translations.nav.schemes}</a>
                        <a href="#community" onClick={(e) => handleNavClick(e, 'community')} className={activePage === 'community' ? 'active' : ''}>{translations.nav.community}</a>
                    </div>
                    <div className="nav-mobile-toggle">☰</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;