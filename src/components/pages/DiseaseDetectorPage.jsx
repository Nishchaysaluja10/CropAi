import React from 'react';
import { appData } from '../../data/appData';

const DiseaseDetectorPage = ({ showNotification }) => {
    const [analysis, setAnalysis] = React.useState({
        inProgress: false,
        progress: 0,
        statusText: '',
        results: null
    });
    const fileInputRef = React.useRef(null);

    const startAnalysis = (disease) => {
        setAnalysis({ inProgress: true, progress: 0, statusText: 'Initializing...', results: null });
        const progressInterval = setInterval(() => {
            setAnalysis(prev => {
                const newProgress = prev.progress + Math.random() * 15;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setAnalysis({ inProgress: false, progress: 100, results: disease });
                        showNotification(`🔬 Disease analysis complete: ${disease.name} detected`, 'success');
                    }, 500);
                    return { ...prev, progress: 100, statusText: 'Finalizing diagnosis...' };
                }
                let newStatus = prev.statusText;
                if (newProgress < 30) newStatus = 'Preprocessing image...';
                else if (newProgress < 60) newStatus = 'Running deep learning analysis...';
                else if (newProgress < 90) newStatus = 'Comparing with disease database...';
                return { ...prev, progress: newProgress, statusText: newStatus };
            });
        }, 100);
    };

    const onPickFile = () => fileInputRef.current?.click();

    const onFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        showNotification(`📷 Loaded image: ${file.name}`, 'info');
        const idx = Math.abs((file.name.charCodeAt(0) || 0) % appData.diseases_database.length);
        startAnalysis(appData.diseases_database[idx]);
        e.target.value = '';
    };

    const analyzeSampleDisease = (diseaseIndex) => {
        startAnalysis(appData.diseases_database[diseaseIndex]);
    };

    return (
        <div className="page" id="disease-detector-page">
            <div className="container">
                <h2 className="page-title">AI Disease Detection & Diagnosis</h2>
                <div className="disease-detector-advanced">
                    <div className="detector-interface">
                        <div className="upload-section">
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                            <div className="upload-area" onClick={onPickFile}>
                                <div className="upload-icon">📷</div>
                                <h3>Upload Crop Image</h3>
                                <p>Take a clear photo or try sample images below</p>
                            </div>
                            <div className="sample-images-grid">
                                <div className="sample-image" onClick={() => analyzeSampleDisease(0)}>
                                    <div className="sample-icon">🌿</div>
                                    <div className="sample-label">Rice Blight</div>
                                </div>
                                <div className="sample-image" onClick={() => analyzeSampleDisease(1)}>
                                    <div className="sample-icon">🍃</div>
                                    <div className="sample-label">Brown Spot</div>
                                </div>
                                <div className="sample-image" onClick={() => analyzeSampleDisease(2)}>
                                    <div className="sample-icon">🥔</div>
                                    <div className="sample-label">Late Blight</div>
                                </div>
                                <div className="sample-image" onClick={() => analyzeSampleDisease(3)}>
                                    <div className="sample-icon">✅</div>
                                    <div className="sample-label">Healthy</div>
                                </div>
                            </div>
                        </div>
                        
                        {(analysis.inProgress || analysis.results) && (
                             <div className="detection-results">
                                {analysis.inProgress && (
                                    <div className="analysis-progress">
                                        <div className="progress-spinner"></div>
                                        <h3>AI Analysis in Progress</h3>
                                        <p>{analysis.statusText}</p>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${analysis.progress}%`}}></div>
                                        </div>
                                    </div>
                                )}
                                {analysis.results && !analysis.inProgress && (
                                    <div className="disease-diagnosis">
                                        <div className="diagnosis-header">
                                            <h3>{analysis.results.name}</h3>
                                            <div className="confidence-badge">{analysis.results.confidence}</div>
                                        </div>
                                        <div className="diagnosis-details">
                                            <div className="diagnosis-section">
                                                <h4>Symptoms</h4>
                                                <ul>
                                                    {analysis.results.symptoms.map((s, i) => (<li key={i}>{s}</li>))}
                                                </ul>
                                            </div>
                                            <div className="diagnosis-section">
                                                <h4>Treatment</h4>
                                                <ul>
                                                    {analysis.results.treatment.map((t, i) => (<li key={i}>{t}</li>))}
                                                </ul>
                                            </div>
                                            <div className="diagnosis-section">
                                                <h4>Prevention</h4>
                                                <ul>
                                                    {analysis.results.prevention.map((p, i) => (<li key={i}>{p}</li>))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetectorPage;