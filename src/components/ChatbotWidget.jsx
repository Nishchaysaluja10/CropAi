import React, { useState, useEffect, useRef } from 'react';
import { appData } from '../data/appData'; // Import appData to access responses

const ChatbotWidget = ({ translations, currentLanguage, onChangeLanguage, showNotification }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        setMessages([{
            sender: 'bot',
            text: translations.chatbot.greeting
        }]);
    }, [translations.chatbot.greeting]);
    
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChatbot = () => {
        if (!isOpen) {
            showNotification('🤖 AI Agricultural Assistant activated! Ask me anything about farming.', 'info');
        }
        setIsOpen(!isOpen);
    };
    
    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: inputValue }];
        setMessages(newMessages);
        setInputValue('');

        setTimeout(() => {
            const botResponse = generateChatbotResponse(inputValue);
            setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 1500);
    };

    const handleQuickQuestion = (topicKey, topicText) => {
        const newMessages = [...messages, { sender: 'user', text: topicText }];
        setMessages(newMessages);

        setTimeout(() => {
            const botResponse = translations.chatbot.responses[topicKey];
            setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 1500);
    };

    const generateChatbotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        const responses = translations.chatbot.responses;

        if (lowerMessage.includes('disease') || lowerMessage.includes('pest') || lowerMessage.includes('infection')) return responses['crop disease'];
        if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) return responses['irrigation'];
        if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) return responses['fertilizer'];
        if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) return responses['weather'];
        return "I can help with diseases, irrigation, fertilizer, and weather. Please ask about one of these topics.";
    };

    return (
        <div className="chatbot-widget" id="chatbotWidget">
            <div className="chatbot-header" onClick={toggleChatbot}>
                <div className="chatbot-avatar">🤖</div>
                <div className="chatbot-info">
                    <div className="chatbot-title" data-translate="chatbot.title">{translations.chatbot.title}</div>
                    <div className="chatbot-status" data-translate="chatbot.online">{translations.chatbot.online}</div>
                </div>
                <div className={`chatbot-toggle ${isOpen ? 'rotated' : ''}`}>▼</div>
            </div>
            <div className={`chatbot-body ${!isOpen ? 'hidden' : ''}`} id="chatbotBody">
                <div className="language-selector">
                    <select className="form-control" id="chatLanguageSelect" value={currentLanguage} onChange={(e) => onChangeLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="or">ଓଡ଼ିଆ</option>
                    </select>
                </div>
                <div className="chat-messages" id="chatMessages" ref={chatMessagesRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}-message`}>
                            <div className="message-content">{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div className="quick-questions">
                    <button className="quick-btn" onClick={() => handleQuickQuestion('crop disease', translations.chatbot.disease)} data-translate="chatbot.disease">{translations.chatbot.disease}</button>
                    <button className="quick-btn" onClick={() => handleQuickQuestion('irrigation', translations.chatbot.irrigation)} data-translate="chatbot.irrigation">{translations.chatbot.irrigation}</button>
                    <button className="quick-btn" onClick={() => handleQuickQuestion('fertilizer', translations.chatbot.fertilizer)} data-translate="chatbot.fertilizer">{translations.chatbot.fertilizer}</button>
                    <button className="quick-btn" onClick={() => handleQuickQuestion('weather', translations.chatbot.weather)} data-translate="chatbot.weather">{translations.chatbot.weather}</button>
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="chatInput"
                        placeholder="Type your message..." 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="btn btn--primary btn--sm" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotWidget;