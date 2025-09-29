import React, { useState, useMemo } from 'react';

const RecommendationsPage = ({ translations }) => {
    const [filters, setFilters] = useState({ crop: 'Rice', location: 'Bhubaneswar', season: 'Kharif' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id]: value }));
    };

    const recs = useMemo(() => {
        const { crop, location, season } = filters;
        const baseYield = crop === 'Rice' ? 24 : crop === 'Wheat' ? 20 : 18;
        const seasonBoost = season === 'Kharif' ? 1.08 : 1.04;
        const locationBoost = location === 'Bhubaneswar' ? 1.05 : 1.02;
        const predicted = Math.round(baseYield * seasonBoost * locationBoost);

        return [
            {
                title: translations.recommendationsPage.sections.optimalPlanting,
                body: `${crop} • ${season} • ${location}. Plant between June 15 - July 15.`,
                impact: `+${Math.round((seasonBoost - 1) * 100)}% ${translations.recommendationsPage.sections.expectedImpact.toLowerCase()}`
            },
            {
                title: translations.recommendationsPage.sections.irrigation,
                body: season === 'Kharif' ? 'Schedule: 25–30 mm every 5–7 days based on rainfall.' : 'Schedule: 35–40 mm every 7–10 days; reduce during cold spells.',
                impact: '+10% water efficiency'
            },
            {
                title: translations.recommendationsPage.sections.fertilizer,
                body: crop === 'Rice' ? 'Apply 120:60:40 NPK kg/ha split (Basal/Tillering/Panicle initiation).' : 'Apply 100:50:40 NPK kg/ha split across growth stages.',
                impact: '+12% nutrient use efficiency'
            },
            {
                title: translations.recommendationsPage.sections.pest,
                body: crop === 'Rice' ? 'Scout weekly for leaf blight; use Mancozeb 75% WP if symptoms appear.' : 'Watch for rust; apply Propiconazole 0.1% at first signs.',
                impact: '−30% disease risk'
            },
            {
                title: 'AI Yield Projection',
                body: `Projected yield: ${predicted} q/acre under recommended schedule.`,
                impact: '+15–20% outcome'
            }
        ];
    }, [filters, translations]);

    return (
        <div className="page" id="recommendations-page">
            <div className="container">
                <h2 className="page-title">{translations.recommendationsPage.title}</h2>
                <div className="recommendations-dashboard">
                    <div className="recommendation-filters">
                        <select className="form-control" id="crop" value={filters.crop} onChange={handleChange}>
                            <option value="Rice">Rice</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Maize">Maize</option>
                        </select>
                        <select className="form-control" id="location" value={filters.location} onChange={handleChange}>
                            <option value="Bhubaneswar">Bhubaneswar</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>
                        <select className="form-control" id="season" value={filters.season} onChange={handleChange}>
                            <option value="Kharif">{translations.recommendationsPage.filters.kharif}</option>
                            <option value="Rabi">{translations.recommendationsPage.filters.rabi}</option>
                        </select>
                    </div>
                    <div className="recommendations-content">
                        <div className="recommendation-section">
                            <h3>🌱 {translations.recommendationsPage.sections.cultivation}</h3>
                            {recs.map((r, idx) => (
                                <div key={idx} className="rec-card">
                                    <h4>{r.title}</h4>
                                    <p>{r.body}</p>
                                    <div className="rec-impact">{translations.recommendationsPage.sections.expectedImpact}: <span className="impact-positive">{r.impact}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationsPage;