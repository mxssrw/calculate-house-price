import React, { useState } from 'react';
import { calculateAmortizationSchedule, type AmortizationScheduleResult } from '../utils/calculations';

export const AmortizationSchedule: React.FC = () => {
    const [data, setData] = useState<{
        principal: number | '';
        annualRate: number | '';
        years: number | '';
    }>({
        principal: 1000000,
        annualRate: 6,
        years: 30,
    });
    const [result, setResult] = useState<AmortizationScheduleResult | null>(null);

    const handleCalculate = () => {
        const principal = Number(data.principal) || 0;
        const annualRate = Number(data.annualRate) || 0;
        const years = Number(data.years) || 0;

        const res = calculateAmortizationSchedule(principal, annualRate, years);
        setResult(res);
    };

    return (
        <div>
            <div className="glass-panel p-6 mb-8" style={{ padding: '2rem' }}>
                <h2 className="page-subtitle" style={{ marginBottom: '1.5rem' }}>Calculate based on loan term</h2>

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
                            <label className="form-label">Loan Term (Years)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={data.years}
                                onChange={(e) => setData({ ...data, years: e.target.value === '' ? '' : Number(e.target.value) })}
                            />
                        </div>
                        <button className="btn-primary w-full" style={{ width: '100%' }} onClick={handleCalculate}>
                            Calculate Schedule
                        </button>
                    </div>

                    <div className="result-panel">
                        {result && (
                            <>
                                <div className="summary-cards">
                                    <div className="summary-card glass-panel">
                                        <div className="summary-value">{result.summary.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                        <div className="summary-label">Monthly Payment</div>
                                    </div>
                                    <div className="summary-card glass-panel">
                                        <div className="summary-value">{result.summary.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                        <div className="summary-label">Total Interest</div>
                                    </div>
                                    {/* <div className="summary-card glass-panel">
                                        <div className="summary-value">{result.summary.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                        <div className="summary-label">Final Balance</div>
                                    </div> */}
                                </div>

                                <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Principal Paid</th>
                                                <th>Interest Paid</th>
                                                <th>Remaining Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.schedule.map((item) => (
                                                <tr key={item.month}>
                                                    <td>{item.month}</td>
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
                        {!result && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                                Enter details and click calculate to see the schedule.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
