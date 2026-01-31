import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { AmortizationSchedule } from './components/AmortizationSchedule';
import { AmortizationByPayment } from './components/AmortizationByPayment';
import { RemainingBalance } from './components/RemainingBalance';

function App() {
  const [currentTab, setCurrentTab] = useState('schedule');

  const renderContent = () => {
    switch (currentTab) {
      case 'schedule':
        return <AmortizationSchedule />;
      case 'payment':
        return <AmortizationByPayment />;
      case 'balance':
        return <RemainingBalance />;
      default:
        return <AmortizationSchedule />;
    }
  };

  const getTitle = () => {
    switch (currentTab) {
      case 'schedule': return 'Amortization Schedule';
      case 'payment': return 'Amortization by Payment';
      case 'balance': return 'Remaining Balance Check';
      default: return '';
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">{getTitle()}</h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
