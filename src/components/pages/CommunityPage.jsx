import React from 'react';
import { appData } from '../../data/appData';

const CommunityPage = ({ translations }) => {
    return (
        <div className="page" id="community-page">
            <div className="container">
                <h2 className="page-title">{translations.communityPage.title}</h2>
                <div className="community-dashboard">
                    <div className="success-stories">
                        <h3>{translations.communityPage.successStories}</h3>
                        <div className="stories-grid">
                            {appData.farmer_stories.map((farmer, index) => (
                                <div key={index} className="story-card">
                                    <div className="story-header">
                                        <div className="farmer-avatar">{farmer.avatar}</div>
                                        <div className="farmer-info">
                                            <h4>{farmer.name}</h4>
                                            <div className="farmer-location">{farmer.location} • {farmer.crop}</div>
                                        </div>
                                    </div>
                                    <div className="improvement-badge">{farmer.improvement}</div>
                                    <div className="farmer-story">"{farmer.story}"</div>
                                    <div style={{ marginTop: '12px', color: '#6ba82f', fontWeight: 'bold' }}>
                                        {translations.communityPage.additionalIncome}: {farmer.income_increase}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="soil-health-section">
                        <h3>{translations.communityPage.soilHealth}</h3>
                        <div className="soil-health-dashboard">
                             {/* Soil health grid */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;