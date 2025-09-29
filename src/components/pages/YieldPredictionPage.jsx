import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// 1. Accept the 'translations' prop here
const YieldPredictionPage = ({ showNotification, translations }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const [formData, setFormData] = useState({
        city: 'Bhubaneswar',
        cropType: 'Rice',
        fieldSize: 5,
        soilType: 'Alluvial',
        irrigationType: 'Drip',
        previousYield: 25,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const calculateAdvancedYield = () => {
        setIsLoading(true);
        setResults(null);
        setTimeout(() => {
            const productivityIncrease = 15 + Math.random() * 10;
            const predictedYield = parseFloat(formData.previousYield) * (1 + productivityIncrease / 100);
            const revenue = predictedYield * 2850 * parseFloat(formData.fieldSize);

            setResults({
                predictedYield: predictedYield.toFixed(2),
                fieldSize: formData.fieldSize,
                productivityIncrease: productivityIncrease.toFixed(1),
                expectedRevenue: `₹${Math.round(revenue).toLocaleString()}`,
                additionalIncome: `₹${Math.round(revenue * (productivityIncrease / (100+productivityIncrease))).toLocaleString()}`,
                confidence: `${Math.floor(90 + Math.random() * 9)}%`,
            });
            setIsLoading(false);
            showNotification(`🌾 Yield prediction completed for ${formData.cropType}!`, 'success');
        }, 2000);
    };

    useEffect(() => {
        if (results && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['25°C', '28°C', '31°C', '34°C', '37°C'],
                    datasets: [{
                        label: 'Yield (quintals/acre)',
                        data: [8.5, 9.2, 9.8, 9.4, 8.1],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Temperature vs Yield Correlation' } } }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy() };
    }, [results]);

    return (
        <div className="page" id="yield-prediction-page">
            <div className="container">
                {/* 2. Use the translations object for all text */}
                <h2 className="page-title">{translations.yieldPage.title}</h2>
                <div className="yield-calculator-advanced">
                    <div className="calc-form-grid">
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.cityLabel}</label>
                            <select className="form-control" id="city" value={formData.city} onChange={handleInputChange}>
                                <option value="Bhubaneswar">Bhubaneswar, Odisha</option>
                                <option value="Mumbai">Mumbai, Maharashtra</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.cropLabel}</label>
                            <select className="form-control" id="cropType" value={formData.cropType} onChange={handleInputChange}>
                                <option value="Rice">Rice (धान / ଧାନ)</option>
                                <option value="Wheat">Wheat (गेहूं / ଗହମ)</option>
                                <option value="Maize">Maize (मक्का / ମକା)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.sizeLabel}</label>
                            <input type="number" className="form-control" id="fieldSize" value={formData.fieldSize} onChange={handleInputChange} min="0.1" step="0.1" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.soilLabel}</label>
                            <select className="form-control" id="soilType" value={formData.soilType} onChange={handleInputChange}>
                                <option value="Alluvial">Alluvial</option>
                                <option value="Black Cotton">Black Cotton</option>
                                <option value="Red Laterite">Red Laterite</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.irrigationLabel}</label>
                            <select className="form-control" id="irrigationType" value={formData.irrigationType} onChange={handleInputChange}>
                                <option value="Drip">Drip Irrigation</option>
                                <option value="Sprinkler">Sprinkler</option>
                                <option value="Flood">Flood Irrigation</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">{translations.yieldPage.prevYieldLabel}</label>
                            <input type="number" className="form-control" id="previousYield" value={formData.previousYield} onChange={handleInputChange} min="0" step="0.1" />
                        </div>
                    </div>
                    <button className="btn btn--primary btn--lg btn--full-width" onClick={calculateAdvancedYield} disabled={isLoading}>
                        <span className="btn-text">{isLoading ? translations.yieldPage.calculatingText : translations.yieldPage.buttonText}</span>
                        {isLoading && <div className="loading-spinner"></div>}
                    </button>
                    {results && (
                        <div className="yield-results-advanced">
                            <div className="results-header">
                                <h3>{translations.yieldPage.resultsTitle}</h3>
                                <div className="confidence-display">
                                    <span>{translations.yieldPage.confidence}: </span>
                                    <span className="confidence-value">{results.confidence}</span>
                                </div>
                            </div>
                            <div className="results-grid-advanced">
                                <div className="result-card-large">
                                    <div className="result-title">{translations.yieldPage.predictedYield}</div>
                                    <div className="result-value-large">{results.predictedYield} quintals</div>
                                    <div className="result-subtitle">{translations.yieldPage.forField} <span>{results.fieldSize}</span> {translations.yieldPage.acres}</div>
                                </div>
                                <div className="result-card-large">
                                    <div className="result-title">{translations.yieldPage.productivityIncrease}</div>
                                    <div className="result-value-large productivity-increase">+{results.productivityIncrease}%</div>
                                    <div className="result-subtitle">{translations.yieldPage.comparedTo}</div>
                                </div>
                                <div className="result-card-large">
                                    <div className="result-title">{translations.yieldPage.expectedRevenue}</div>
                                    <div className="result-value-large">{results.expectedRevenue}</div>
                                    <div className="result-subtitle">{translations.yieldPage.additionalIncomeLabel}: <span>{results.additionalIncome}</span></div>
                                </div>
                            </div>
                            <div className="weather-yield-correlation">
                                <h4>{translations.yieldPage.weatherImpactTitle}</h4>
                                <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YieldPredictionPage;