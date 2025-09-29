import React from 'react';

const Hero = ({ onNavigate, translations }) => {
    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">🌾 CropAI</div>
                    <h1 className="hero-title">{translations?.hero?.title || 'Smart AI-Powered Agricultural Intelligence'}</h1>
                    <p className="hero-description">{translations?.hero?.description || 'Revolutionize farming with AI predictions, disease detection, weather intelligence, and multilingual support'}</p>
                    <div className="hero-buttons">
                        <button className="btn btn--primary btn--lg" onClick={() => onNavigate('yield-prediction')}>{translations?.hero?.startButton || translations?.yieldPage?.buttonText || 'Start Yield Prediction'}</button>
                        <button className="btn btn--outline btn--lg" onClick={() => document.querySelector('.chatbot-header').click()}>{translations?.hero?.chatButton || translations?.chatbot?.title || 'Chat with AI Assistant'}</button>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat"><span className="hero-stat-value">+18%</span><span className="hero-stat-label">Avg yield</span></div>
                        <div className="hero-stat"><span className="hero-stat-value">94%</span><span className="hero-stat-label">Disease accuracy</span></div>
                        <div className="hero-stat"><span className="hero-stat-value">14d</span><span className="hero-stat-label">Forecast</span></div>
                    </div>
                    <div className="scroll-cue">↓</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;