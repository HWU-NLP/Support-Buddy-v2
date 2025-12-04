import React, { useState } from 'react';
import './multi-toggle.css';

interface Option {
    icon?: string;
    label: string;
    onClick: () => void;
    title: string;
}

interface MultiToggleProps {
    selectedIndex: number;
    options: Option[];
}

const MultiToggle: React.FC<MultiToggleProps> = ({ options, selectedIndex }) => {
    
    return (
        <div className={`multi-toggle`}>            
            <div className="multi-toggle-thumb"
                style={{
                    transform: `translateX(${selectedIndex * 100 }%)`,
                }}
            />
            <div className="multi-toggle-options">
                {options.map((option, index) => (
                <span className={`multi-toggle-option ${index === selectedIndex ? 'active' : ''}`} key={index}
                    onClick={option.onClick}
                    title={option.title}
                    aria-label={option.title}
                >
                    <i className={option.icon}></i>
                    <span dangerouslySetInnerHTML={{ __html: option.label }}></span>
                    </span>
                ))}
            </div>
        </div>
    );
};


export default MultiToggle;