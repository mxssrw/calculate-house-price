import React from 'react';
import { Calendar, Wallet, TrendingUp } from 'lucide-react';

interface SidebarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
    const tabs = [
        { id: 'schedule', label: 'Amortization Schedule', icon: Calendar },
        { id: 'payment', label: 'By Monthly Payment', icon: Wallet },
        { id: 'balance', label: 'Remaining Balance', icon: TrendingUp },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--color-accent)', borderRadius: '8px', color: 'white' }}>🏦</span>
                <strong>MortgageCalc</strong>
            </div>
            <nav className="nav-menu">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <Icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
            <div className="sidebar-footer">
                <p>Powered by 3422</p>
            </div>
        </aside>
    );
};
