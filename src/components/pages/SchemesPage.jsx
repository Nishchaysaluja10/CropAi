import React, { useState } from 'react';
import { appData } from '../../data/appData';

const SchemesPage = ({ showNotification }) => {
    const [filters, setFilters] = useState({ state: 'all', category: 'all' });

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id]: value }));
    };
    
    const applyForScheme = (schemeName) => {
        showNotification(`🚀 Redirecting to ${schemeName} application portal...`, 'info');
    };

    const filteredSchemes = appData.government_schemes.filter(scheme => {
        const stateMatch = filters.state === 'all' || scheme.state === 'all' || scheme.state === filters.state;
        const categoryMatch = filters.category === 'all' || scheme.category === filters.category;
        return stateMatch && categoryMatch;
    });

    return (
        <div className="page" id="schemes-page">
            <div className="container">
                <h2 className="page-title">Government Schemes & Benefits</h2>
                <div className="schemes-dashboard">
                    <div className="schemes-filter">
                        <select className="form-control" id="state" value={filters.state} onChange={handleFilterChange}>
                            <option value="all">All States</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Maharashtra">Maharashtra</option>
                        </select>
                        <select className="form-control" id="category" value={filters.category} onChange={handleFilterChange}>
                            <option value="all">All Categories</option>
                            <option value="income">Income Support</option>
                            <option value="insurance">Insurance</option>
                            <option value="subsidy">Subsidy</option>
                        </select>
                    </div>
                    <div className="schemes-grid" id="schemesGrid">
                        {filteredSchemes.map((scheme, index) => (
                            <div key={index} className="scheme-card-detailed">
                                <div className="scheme-header-detailed">
                                    <h3 className="scheme-title">{scheme.name}</h3>
                                    <div className="scheme-amount-badge">{scheme.amount}</div>
                                </div>
                                <p className="scheme-description">{scheme.description}</p>
                                <div className="scheme-details">
                                    <div className="scheme-detail-item">
                                        <div className="detail-label">Eligibility</div>
                                        <div className="detail-value">{scheme.eligibility}</div>
                                    </div>
                                    <div className="scheme-detail-item">
                                        <div className="detail-label">Application</div>
                                        <div className="detail-value">{scheme.application}</div>
                                    </div>
                                    <div className="scheme-detail-item">
                                        <div className="detail-label">Category</div>
                                        <div className="detail-value" style={{ textTransform: 'capitalize' }}>{scheme.category}</div>
                                    </div>
                                </div>
                                <button className="btn btn--primary" onClick={() => applyForScheme(scheme.name)}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemesPage;