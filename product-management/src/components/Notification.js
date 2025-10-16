import React from 'react';

const Notification = ({ message, type }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center`}>
                <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Notification;