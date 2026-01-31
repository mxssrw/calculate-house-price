import React from 'react';

interface SidebarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
    const tabs = [
        { id: 'schedule', label: 'Amortization Schedule' },
        { id: 'payment', label: 'By Monthly Payment' },
        { id: 'balance', label: 'Remaining Balance' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span style={{ fontSize: '1.5rem' }}>🏦</span>
                <strong>MortgageCalc</strong>
            </div>
            <nav className="nav-menu">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};
