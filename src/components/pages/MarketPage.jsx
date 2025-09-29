import React from 'react';
import { appData } from '../../data/appData';
import Chart from 'chart.js/auto';

const MarketPage = () => {
    const [marketPrices, setMarketPrices] = React.useState(appData.market_prices);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

        // Build a simple synthetic trend from the first crop's price so the chart isn't empty
        const seed = marketPrices?.[0]
            ? parseFloat(marketPrices[0].price.replace(/[₹,]/g, ''))
            : 2000;
        const data = labels.map((_, idx) => {
            const noise = Math.sin(idx / 3) * 20 + (Math.random() - 0.5) * 15;
            return Math.max(0, Math.round(seed + noise));
        });

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Price (₹/quintal)',
                        data,
                        borderColor: '#4a7c23',
                        backgroundColor: 'rgba(107, 168, 47, 0.15)',
                        tension: 0.35,
                        fill: true,
                        pointRadius: 0,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false },
                    x: { display: false }
                }
            }
        });

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, [marketPrices]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            // Simulate market changes
            const newPrices = marketPrices.map(item => {
                const change = (Math.random() - 0.5) * 1.5;
                const currentPrice = parseFloat(item.price.replace(/[₹,]/g, ''));
                const newPrice = Math.round(currentPrice * (1 + change / 100));
                return {
                    ...item,
                    price: `₹${newPrice.toLocaleString()}`,
                    change: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
                    trend: change > 0 ? 'up' : 'down',
                };
            });
            setMarketPrices(newPrices);
        }, 5000);
        return () => clearInterval(interval);
    }, [marketPrices]);

    return (
        <div className="page" id="market-page">
            <div className="container">
                <h2 className="page-title">Market Intelligence & Price Tracking</h2>
                <div className="market-dashboard">
                    <div className="price-overview">
                        <div className="price-cards-grid">
                            {marketPrices.map((item, index) => (
                                <div key={index} className="price-card-market">
                                    <div className="crop-name-market">{item.crop}</div>
                                    <div className="crop-price-market">{item.price}{item.unit}</div>
                                    <div className={`price-change-market ${item.trend}`}>{item.change}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="market-analysis">
                        <div className="price-trends">
                            <h3>Price Trends (30 Days)</h3>
                            <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPage;