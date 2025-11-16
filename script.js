// Fibonacci Calculator for Trading Journal
class FibonacciCalculator {
    constructor() {
        this.retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        this.extensionLevels = [1.272, 1.414, 1.618, 2.0, 2.618, 3.618, 4.236];
        this.journalEntries = this.loadJournalEntries();
    }

    // Calculate Fibonacci Retracement Levels
    calculateRetracement(high, low, trend) {
        const range = high - low;
        const levels = [];

        this.retracementLevels.forEach(level => {
            let price;
            if (trend === 'uptrend') {
                // For uptrend: calculate from high
                price = high - (range * level);
            } else {
                // For downtrend: calculate from low
                price = low + (range * level);
            }

            levels.push({
                level: level,
                percentage: (level * 100).toFixed(1) + '%',
                price: price,
                position: this.getRetracementPosition(level, trend),
                recommendation: this.getRetracementRecommendation(level, trend)
            });
        });

        return levels;
    }

    // Calculate Fibonacci Extension Levels
    calculateExtension(high, low, trend) {
        const range = high - low;
        const levels = [];

        this.extensionLevels.forEach(level => {
            let price;
            if (trend === 'uptrend') {
                // For uptrend: extensions above high
                price = high + (range * (level - 1));
            } else {
                // For downtrend: extensions below low
                price = low - (range * (level - 1));
            }

            levels.push({
                level: level,
                percentage: (level * 100).toFixed(1) + '%',
                price: price,
                position: this.getExtensionPosition(level, trend),
                target: this.getExtensionTarget(level)
            });
        });

        return levels;
    }

    getRetracementPosition(level, trend) {
        if (level === 0) return trend === 'uptrend' ? 'High' : 'Low';
        if (level === 1) return trend === 'uptrend' ? 'Low' : 'High';
        return `${(level * 100).toFixed(1)}% Retracement`;
    }

    getRetracementRecommendation(level, trend) {
        const recommendations = {
            uptrend: {
                0: '🔴 Resistance - Take Profit Area',
                0.236: '🟢 Weak Support - Light Buy Zone',
                0.382: '🟢 Moderate Support - Good Buy Zone',
                0.5: '🟢 Strong Support - Ideal Buy Zone',
                0.618: '🟢 Golden Ratio - Strong Buy Zone',
                0.786: '🟡 Critical Support - Last Buy Zone',
                1: '🔴 Major Support - Stop Loss Area'
            },
            downtrend: {
                0: '🔴 Support - Take Profit Area',
                0.236: '🔴 Weak Resistance - Light Sell Zone',
                0.382: '🔴 Moderate Resistance - Good Sell Zone',
                0.5: '🔴 Strong Resistance - Ideal Sell Zone',
                0.618: '🔴 Golden Ratio - Strong Sell Zone',
                0.786: '🟡 Critical Resistance - Last Sell Zone',
                1: '🟢 Major Resistance - Stop Loss Area'
            }
        };

        return recommendations[trend][level] || '-';
    }

    getExtensionPosition(level, trend) {
        return `${(level * 100).toFixed(1)}% Extension`;
    }

    getExtensionTarget(level) {
        const targets = {
            1.272: '🎯 TP1 - First Target',
            1.414: '🎯 TP2 - Second Target',
            1.618: '🎯 TP3 - Golden Target',
            2.0: '🎯 TP4 - Extended Target',
            2.618: '🎯 TP5 - Major Target',
            3.618: '🎯 TP6 - Maximum Target',
            4.236: '🎯 TP7 - Extreme Target'
        };

        return targets[level] || 'Target Zone';
    }

    generateTradingRecommendations(high, low, trend, retracements) {
        const range = high - low;
        const rangePercent = ((range / low) * 100).toFixed(2);

        let recommendations = `
            <div class="recommendation-item">
                <h4>${trend === 'uptrend' ? '📈 BULLISH SETUP' : '📉 BEARISH SETUP'}</h4>
                <p><strong>Market Structure:</strong> ${trend === 'uptrend' ? 'Uptrend - Look for BUY opportunities on pullbacks' : 'Downtrend - Look for SELL opportunities on rallies'}</p>
                <p><strong>Price Range:</strong> ${range.toFixed(8)} (${rangePercent}%)</p>
            </div>
        `;

        if (trend === 'uptrend') {
            const fib618 = retracements.find(r => r.level === 0.618);
            const fib5 = retracements.find(r => r.level === 0.5);
            const fib382 = retracements.find(r => r.level === 0.382);

            recommendations += `
                <div class="recommendation-item buy-zone">
                    <h4>🟢 BUY ENTRY ZONES (Priority Order):</h4>
                    <ol>
                        <li><strong>Golden Ratio (61.8%):</strong> ${fib618.price.toFixed(8)} - Strongest buy zone</li>
                        <li><strong>50% Level:</strong> ${fib5.price.toFixed(8)} - Good risk/reward</li>
                        <li><strong>38.2% Level:</strong> ${fib382.price.toFixed(8)} - Conservative entry</li>
                    </ol>
                    <p><strong>⚠️ Stop Loss:</strong> Below ${low.toFixed(8)} (78.6% level or previous low)</p>
                </div>

                <div class="recommendation-item profit-zone">
                    <h4>🎯 TAKE PROFIT TARGETS:</h4>
                    <ul>
                        <li><strong>TP1:</strong> Previous high ${high.toFixed(8)}</li>
                        <li><strong>TP2:</strong> 127.2% Extension</li>
                        <li><strong>TP3:</strong> 161.8% Extension (Golden target)</li>
                    </ul>
                </div>
            `;
        } else {
            const fib618 = retracements.find(r => r.level === 0.618);
            const fib5 = retracements.find(r => r.level === 0.5);
            const fib382 = retracements.find(r => r.level === 0.382);

            recommendations += `
                <div class="recommendation-item sell-zone">
                    <h4>🔴 SELL ENTRY ZONES (Priority Order):</h4>
                    <ol>
                        <li><strong>Golden Ratio (61.8%):</strong> ${fib618.price.toFixed(8)} - Strongest sell zone</li>
                        <li><strong>50% Level:</strong> ${fib5.price.toFixed(8)} - Good risk/reward</li>
                        <li><strong>38.2% Level:</strong> ${fib382.price.toFixed(8)} - Conservative entry</li>
                    </ol>
                    <p><strong>⚠️ Stop Loss:</strong> Above ${high.toFixed(8)} (78.6% level or previous high)</p>
                </div>

                <div class="recommendation-item profit-zone">
                    <h4>🎯 TAKE PROFIT TARGETS:</h4>
                    <ul>
                        <li><strong>TP1:</strong> Previous low ${low.toFixed(8)}</li>
                        <li><strong>TP2:</strong> 127.2% Extension</li>
                        <li><strong>TP3:</strong> 161.8% Extension (Golden target)</li>
                    </ul>
                </div>
            `;
        }

        recommendations += `
            <div class="recommendation-item strategy">
                <h4>📋 TRADING STRATEGY:</h4>
                <ul>
                    <li>Wait for price to retrace to key Fibonacci levels</li>
                    <li>Look for confirmation signals (candlestick patterns, volume, indicators)</li>
                    <li>Scale in positions across multiple Fibonacci levels</li>
                    <li>Use proper position sizing and risk management</li>
                    <li>Take partial profits at extension levels</li>
                </ul>
            </div>
        `;

        return recommendations;
    }

    // Save journal entry to localStorage
    saveJournalEntry(entry) {
        this.journalEntries.unshift(entry);
        if (this.journalEntries.length > 20) {
            this.journalEntries = this.journalEntries.slice(0, 20);
        }
        localStorage.setItem('tradingJournal', JSON.stringify(this.journalEntries));
        return true;
    }

    loadJournalEntries() {
        const saved = localStorage.getItem('tradingJournal');
        return saved ? JSON.parse(saved) : [];
    }

    deleteJournalEntry(timestamp) {
        this.journalEntries = this.journalEntries.filter(e => e.timestamp !== timestamp);
        localStorage.setItem('tradingJournal', JSON.stringify(this.journalEntries));
    }
}

// UI Controller
class UIController {
    constructor() {
        this.calculator = new FibonacciCalculator();
        this.initEventListeners();
        this.displaySavedEntries();
    }

    initEventListeners() {
        const form = document.getElementById('fibForm');
        const resetBtn = document.getElementById('resetBtn');
        const saveJournalBtn = document.getElementById('saveJournalBtn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAndDisplay();
        });

        resetBtn.addEventListener('click', () => {
            this.resetForm();
        });

        saveJournalBtn.addEventListener('click', () => {
            this.saveJournal();
        });
    }

    calculateAndDisplay() {
        const high = parseFloat(document.getElementById('highPrice').value);
        const low = parseFloat(document.getElementById('lowPrice').value);
        const trend = document.getElementById('trendType').value;

        // Validation
        if (isNaN(high) || isNaN(low)) {
            alert('Mohon masukkan nilai High dan Low yang valid!');
            return;
        }

        if (high <= low) {
            alert('High price harus lebih besar dari Low price!');
            return;
        }

        // Calculate Fibonacci levels
        const retracements = this.calculator.calculateRetracement(high, low, trend);
        const extensions = this.calculator.calculateExtension(high, low, trend);

        // Display results
        this.displayRangeInfo(high, low, trend);
        this.displayRetracementTable(retracements, trend);
        this.displayExtensionTable(extensions, trend);
        this.displayRecommendations(high, low, trend, retracements);

        // Show results section
        document.getElementById('resultsSection').style.display = 'block';

        // Smooth scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    }

    displayRangeInfo(high, low, trend) {
        const range = high - low;
        document.getElementById('displayHigh').textContent = high.toFixed(8);
        document.getElementById('displayLow').textContent = low.toFixed(8);
        document.getElementById('displayRange').textContent = range.toFixed(8);
        document.getElementById('displayTrend').textContent = trend === 'uptrend' ? '📈 Uptrend (Bullish)' : '📉 Downtrend (Bearish)';
    }

    displayRetracementTable(retracements, trend) {
        const tbody = document.getElementById('retracementBody');
        tbody.innerHTML = '';

        retracements.forEach(level => {
            const row = tbody.insertRow();
            const isBuyZone = trend === 'uptrend' && (level.level === 0.382 || level.level === 0.5 || level.level === 0.618);
            const isSellZone = trend === 'downtrend' && (level.level === 0.382 || level.level === 0.5 || level.level === 0.618);

            if (isBuyZone) row.classList.add('buy-highlight');
            if (isSellZone) row.classList.add('sell-highlight');

            row.innerHTML = `
                <td><strong>${level.percentage}</strong></td>
                <td class="price-cell">${level.price.toFixed(8)}</td>
                <td>${level.position}</td>
                <td>${level.recommendation}</td>
            `;
        });
    }

    displayExtensionTable(extensions, trend) {
        const tbody = document.getElementById('extensionBody');
        tbody.innerHTML = '';

        extensions.forEach(level => {
            const row = tbody.insertRow();
            const isGolden = level.level === 1.618;

            if (isGolden) row.classList.add('golden-highlight');

            row.innerHTML = `
                <td><strong>${level.percentage}</strong></td>
                <td class="price-cell">${level.price.toFixed(8)}</td>
                <td>${level.position}</td>
                <td>${level.target}</td>
            `;
        });
    }

    displayRecommendations(high, low, trend, retracements) {
        const content = this.calculator.generateTradingRecommendations(high, low, trend, retracements);
        document.getElementById('recommendationsContent').innerHTML = content;
    }

    saveJournal() {
        const high = parseFloat(document.getElementById('highPrice').value);
        const low = parseFloat(document.getElementById('lowPrice').value);
        const trend = document.getElementById('trendType').value;
        const notes = document.getElementById('journalNotes').value;

        if (isNaN(high) || isNaN(low)) {
            alert('Mohon hitung Fibonacci terlebih dahulu sebelum menyimpan!');
            return;
        }

        const entry = {
            timestamp: Date.now(),
            date: new Date().toLocaleString('id-ID'),
            high: high,
            low: low,
            range: high - low,
            trend: trend,
            notes: notes
        };

        this.calculator.saveJournalEntry(entry);
        this.displaySavedEntries();
        document.getElementById('journalNotes').value = '';

        alert('Journal entry berhasil disimpan!');
    }

    displaySavedEntries() {
        const container = document.getElementById('savedEntries');
        const entries = this.calculator.journalEntries;

        if (entries.length === 0) {
            container.innerHTML = '<p class="no-entries">Belum ada journal entry tersimpan.</p>';
            return;
        }

        let html = '<h4>Saved Journal Entries:</h4>';
        entries.forEach(entry => {
            html += `
                <div class="saved-entry">
                    <div class="entry-header">
                        <span class="entry-date">${entry.date}</span>
                        <button class="btn-delete" onclick="ui.deleteEntry(${entry.timestamp})">🗑️</button>
                    </div>
                    <div class="entry-details">
                        <p><strong>Trend:</strong> ${entry.trend === 'uptrend' ? '📈 Uptrend' : '📉 Downtrend'}</p>
                        <p><strong>High:</strong> ${entry.high.toFixed(8)} | <strong>Low:</strong> ${entry.low.toFixed(8)} | <strong>Range:</strong> ${entry.range.toFixed(8)}</p>
                        ${entry.notes ? `<p><strong>Notes:</strong> ${entry.notes}</p>` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    deleteEntry(timestamp) {
        if (confirm('Hapus journal entry ini?')) {
            this.calculator.deleteJournalEntry(timestamp);
            this.displaySavedEntries();
        }
    }

    resetForm() {
        document.getElementById('fibForm').reset();
        document.getElementById('resultsSection').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the application
let ui;
document.addEventListener('DOMContentLoaded', () => {
    ui = new UIController();
});
