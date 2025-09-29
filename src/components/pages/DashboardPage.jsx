import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';
import { appData } from '../../data/appData';

const DashboardPage = ({ translations }) => { // Accept translations prop
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const context = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(context, {
            type: 'bar',
            data: {
                labels: ['Odisha', 'Punjab', 'Gujarat', 'Maharashtra', 'UP', 'MP'],
                datasets: [
                    {
                        label: 'Yield Index',
                        data: [78, 92, 85, 88, 74, 80],
                        backgroundColor: 'rgba(107, 168, 47, 0.5)',
                        borderColor: '#6ba82f',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } },
                plugins: { legend: { display: false } }
            }
        });

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, []);

    // Simple derived weather snapshot for dashboard
    const forecast = appData.weather_14_days['Bhubaneswar']?.slice(0, 3) || [];

    return (
        <div className="page" id="dashboard-page">
            <div className="container">
                <h2 className="page-title">{translations.dashboard.title}</h2>
                <div className="metrics-grid">
                    <motion.div className="metric-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <div className="metric-value">12,458</div>
                        <div className="metric-label">{translations.dashboard.card1Label}</div>
                        <div className="metric-change">{translations.dashboard.card1Sub}</div>
                    </motion.div>
                    <motion.div className="metric-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                        <div className="metric-value">18%</div>
                        <div className="metric-label">{translations.dashboard.card2Label}</div>
                        <div className="metric-change">{translations.dashboard.card2Sub}</div>
                    </motion.div>
                    <motion.div className="metric-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div className="metric-value">124</div>
                        <div className="metric-label">{translations.dashboard.card3Label}</div>
                        <div className="metric-change">{translations.dashboard.card3Sub}</div>
                    </motion.div>
                    <motion.div className="metric-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                        <div className="metric-value">₹2.1 Cr</div>
                        <div className="metric-label">{translations.dashboard.card4Label}</div>
                        <div className="metric-change">{translations.dashboard.card4Sub}</div>
                    </motion.div>
                </div>
                <motion.div className="dashboard-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <h3>{translations.dashboard.chartTitle}</h3>
                    <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
                        <canvas ref={chartRef}></canvas>
                    </div>
                </motion.div>
                <motion.div className="dashboard-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <h3>Quick Weather Snapshot</h3>
                    <div className="stories-grid">
                        {forecast.map((d, i) => (
                            <div key={i} className="story-card" style={{ textAlign: 'center' }}>
                                <div className="forecast-date" style={{ marginBottom: 8 }}>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Day ' + (i + 1)}</div>
                                <div className="forecast-icon-day" style={{ fontSize: '28px' }}>{d.icon}</div>
                                <div className="forecast-temps-day" style={{ marginTop: 6 }}><span className="forecast-high">{d.high}</span><span className="forecast-low">{d.low}</span></div>
                                <div className="forecast-rain" style={{ marginTop: 6 }}>{d.rain} rain</div>
                                <div className="forecast-advice" style={{ marginTop: 6 }}>{d.advice}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardPage;