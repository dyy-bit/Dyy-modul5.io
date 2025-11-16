import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem('tradingJournal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tradingJournal', JSON.stringify(entries));
  }, [entries]);

  const calculateFibonacci = (highValue, lowValue) => {
    const range = highValue - lowValue;
    
    const levels = {
      high: highValue,
      fib_0: highValue,
      fib_236: highValue - (range * 0.236),
      fib_382: highValue - (range * 0.382),
      fib_50: highValue - (range * 0.5),
      fib_618: highValue - (range * 0.618),
      fib_786: highValue - (range * 0.786),
      fib_100: lowValue,
      low: lowValue,
    };

    const decisions = {
      fib_0: 'Strong Resistance - Consider SELL',
      fib_236: 'Resistance Zone - Watch for SELL signals',
      fib_382: 'Key Resistance - Potential SELL',
      fib_50: 'Equilibrium - Wait for confirmation',
      fib_618: 'Golden Ratio - Strong BUY zone',
      fib_786: 'Deep Support - Consider BUY',
      fib_100: 'Strong Support - Strong BUY opportunity',
    };

    return { levels, decisions };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const highValue = parseFloat(high);
    const lowValue = parseFloat(low);

    if (!symbol || isNaN(highValue) || isNaN(lowValue)) {
      alert('Please fill in all required fields with valid numbers');
      return;
    }

    if (highValue <= lowValue) {
      alert('High must be greater than Low');
      return;
    }

    const { levels, decisions } = calculateFibonacci(highValue, lowValue);

    const newEntry = {
      id: editingId || Date.now(),
      symbol,
      date,
      high: highValue,
      low: lowValue,
      range: highValue - lowValue,
      levels,
      decisions,
      notes,
      createdAt: editingId ? entries.find(e => e.id === editingId).createdAt : new Date().toISOString(),
    };

    if (editingId) {
      setEntries(entries.map(entry => entry.id === editingId ? newEntry : entry));
      setEditingId(null);
    } else {
      setEntries([newEntry, ...entries]);
    }

    resetForm();
  };

  const resetForm = () => {
    setSymbol('');
    setHigh('');
    setLow('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setEditingId(null);
  };

  const handleEdit = (entry) => {
    setSymbol(entry.symbol);
    setHigh(entry.high.toString());
    setLow(entry.low.toString());
    setDate(entry.date);
    setNotes(entry.notes);
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const getPositionColor = (decision) => {
    if (decision.includes('BUY')) return 'text-green-600 font-semibold';
    if (decision.includes('SELL')) return 'text-red-600 font-semibold';
    return 'text-yellow-600 font-semibold';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Trading Journal</h1>
          <p className="text-slate-600">Track your trades with automatic Fibonacci level calculations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            {editingId ? 'Edit Entry' : 'New Entry'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Symbol / Pair *
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g., BTC/USDT, EUR/USD"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  High Price *
                </label>
                <input
                  type="number"
                  step="any"
                  value={high}
                  onChange={(e) => setHigh(e.target.value)}
                  placeholder="Enter high price"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Low Price *
                </label>
                <input
                  type="number"
                  step="any"
                  value={low}
                  onChange={(e) => setLow(e.target.value)}
                  placeholder="Enter low price"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes about this trade..."
                rows="3"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                {editingId ? 'Update Entry' : 'Add Entry'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-slate-500 text-white font-medium rounded-lg hover:bg-slate-600 transition shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Journal Entries</h2>
          
          {entries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-600 text-lg">No entries yet. Create your first trading journal entry above!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{entry.symbol}</h3>
                      <p className="text-blue-100 text-sm mt-1">{entry.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-green-600 font-medium mb-1">High</p>
                      <p className="text-2xl font-bold text-green-700">{entry.high.toFixed(8)}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <p className="text-sm text-red-600 font-medium mb-1">Low</p>
                      <p className="text-2xl font-bold text-red-700">{entry.low.toFixed(8)}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium mb-1">Range</p>
                      <p className="text-2xl font-bold text-blue-700">{entry.range.toFixed(8)}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Fibonacci Levels & Trading Decisions</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Level</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Trading Decision</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">0% (High)</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_0.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_0)}`}>
                              {entry.decisions.fib_0}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">23.6%</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_236.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_236)}`}>
                              {entry.decisions.fib_236}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">38.2%</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_382.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_382)}`}>
                              {entry.decisions.fib_382}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 bg-yellow-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">50.0%</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_50.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_50)}`}>
                              {entry.decisions.fib_50}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 bg-green-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">61.8% (Golden)</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_618.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_618)}`}>
                              {entry.decisions.fib_618}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">78.6%</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_786.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_786)}`}>
                              {entry.decisions.fib_786}
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">100% (Low)</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{entry.levels.fib_100.toFixed(8)}</td>
                            <td className={`px-4 py-3 text-sm ${getPositionColor(entry.decisions.fib_100)}`}>
                              {entry.decisions.fib_100}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {entry.notes && (
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Notes</h4>
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{entry.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
