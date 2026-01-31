import React, { useState } from 'react';
import { calculateAmortizationByPayment, type AmortizationByPaymentResult } from '../utils/calculations';

export const AmortizationByPayment: React.FC = () => {
    const [data, setData] = useState<{
        principal: number | '';
        annualRate: number | '';
        monthlyPayment: number | '';
    }>({
        principal: 1000000,
        annualRate: 6,
        monthlyPayment: 7000,
    });
    const [result, setResult] = useState<AmortizationByPaymentResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = () => {
        try {
            setError(null);
            const principal = Number(data.principal) || 0;
            const annualRate = Number(data.annualRate) || 0;
            const monthlyPayment = Number(data.monthlyPayment) || 0;

            const res = calculateAmortizationByPayment(principal, annualRate, monthlyPayment);
            setResult(res);
        } catch (err: any) {
            setResult(null);
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div>
            <div className="glass-panel p-6 mb-8" style={{ padding: '2rem' }}>
                <h2 className="page-subtitle" style={{ marginBottom: '1.5rem' }}>Calculate based on monthly budget</h2>

                <div className="calculator-grid">
                    <div className="input-panel">
                        <div className="form-group">
                            <label className="form-label">Loan Amount (THB)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={data.principal}
                                onChange={(e) => setData({ ...data, principal: e.target.value === '' ? '' : Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Annual Interest Rate (%)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={data.annualRate}
                                step="0.1"
                                onChange={(e) => setData({ ...data, annualRate: e.target.value === '' ? '' : Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Monthly Payment (THB)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={data.monthlyPayment}
                                onChange={(e) => setData({ ...data, monthlyPayment: e.target.value === '' ? '' : Number(e.target.value) })}
                            />
                        </div>
                        <button className="btn-primary w-full" style={{ width: '100%' }} onClick={handleCalculate}>
                            Calculate Timeline
                        </button>
                        {error && <div style={{ color: 'var(--color-error)', marginTop: '1rem' }}>{error}</div>}
                    </div>

                    <div className="result-panel">
                        {result && (
                            <>
                                <div className="summary-cards">
                                    <div className="summary-card glass-panel">
                                        <div className="summary-value" style={{ fontSize: '1.2rem' }}>{result.summary.years.toFixed(2)} Years</div>
                                        <div className="summary-label">({result.summary.months} Months)</div>
                                    </div>
                                    <div className="summary-card glass-panel">
                                        <div className="summary-value">{result.summary.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                        <div className="summary-label">Total Interest</div>
                                    </div>
                                </div>

                                <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto', maxHeight: '500px' }}>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Payment</th>
                                                <th>Principal Paid</th>
                                                <th>Interest Paid</th>
                                                <th>Remaining Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.schedule.map((item) => (
                                                <tr key={item.month}>
                                                    <td>{item.month}</td>
                                                    <td>{item.payment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td>{item.principalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td>{item.interestPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td>{item.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        {!result && !error && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                                Enter details to see how long it takes to pay off.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
