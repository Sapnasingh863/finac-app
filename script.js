// Asset View Product - Portfolio Management System
class AssetViewProduct {
    constructor() {
        this.assets = [
            {
                name: 'Apple Inc.',
                symbol: 'AAPL',
                type: 'Stock',
                quantity: 50,
                currentPrice: 175.25,
                previousPrice: 172.80
            },
            {
                name: 'Microsoft Corp.',
                symbol: 'MSFT',
                type: 'Stock',
                quantity: 30,
                currentPrice: 338.50,
                previousPrice: 335.20
            },
            {
                name: 'Tesla Inc.',
                symbol: 'TSLA',
                type: 'Stock',
                quantity: 25,
                currentPrice: 248.75,
                previousPrice: 252.10
            },
            {
                name: 'Vanguard S&P 500',
                symbol: 'VOO',
                type: 'Mutual Fund',
                quantity: 100,
                currentPrice: 412.30,
                previousPrice: 410.85
            },
            {
                name: 'Fidelity Total Market',
                symbol: 'FXAIX',
                type: 'Mutual Fund',
                quantity: 75,
                currentPrice: 156.80,
                previousPrice: 155.95
            }
        ];
        
        this.updateInterval = 10 * 60 * 1000; // 10 minutes in milliseconds
        this.lastUpdateTime = new Date();
        this.nextUpdateTime = new Date(this.lastUpdateTime.getTime() + this.updateInterval);
        
        this.init();
    }

    init() {
        this.updatePortfolio();
        this.updateTimestamps();
        this.startRealTimeUpdates();
        this.updateDataSourcesStatus();
        
        // Update every 10 minutes
        setInterval(() => {
            this.simulatePriceUpdates();
            this.updatePortfolio();
            this.updateTimestamps();
        }, this.updateInterval);
        
        // Update countdown every second
        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    simulatePriceUpdates() {
        // Simulate real-time price updates from different data sources
        this.assets.forEach(asset => {
            asset.previousPrice = asset.currentPrice;
            
            // Generate random price change between -5% to +5%
            const changePercent = (Math.random() - 0.5) * 0.1; // -5% to +5%
            asset.currentPrice = asset.currentPrice * (1 + changePercent);
            asset.currentPrice = Math.round(asset.currentPrice * 100) / 100; // Round to 2 decimals
        });
        
        console.log('Price updates received from data sources');
    }

    updatePortfolio() {
        const tableBody = document.getElementById('assetsTableBody');
        tableBody.innerHTML = '';
        
        let totalStocksValue = 0;
        let totalMutualFundsValue = 0;
        
        this.assets.forEach(asset => {
            const marketValue = asset.quantity * asset.currentPrice;
            const change = asset.currentPrice - asset.previousPrice;
            const changePercent = (change / asset.previousPrice) * 100;
            
            if (asset.type === 'Stock') {
                totalStocksValue += marketValue;
            } else {
                totalMutualFundsValue += marketValue;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${asset.name}</strong><br><small>${asset.symbol}</small></td>
                <td><span class="asset-type ${asset.type.toLowerCase()}">${asset.type}</span></td>
                <td>${asset.quantity}</td>
                <td>$${asset.currentPrice.toFixed(2)}</td>
                <td>$${marketValue.toFixed(2)}</td>
                <td class="${change >= 0 ? 'change-positive' : 'change-negative'}">
                    ${change >= 0 ? '+' : ''}$${change.toFixed(2)} (${changePercent.toFixed(2)}%)
                </td>
            `;
            
            // Add highlight effect for updated rows
            row.classList.add('highlight');
            setTimeout(() => row.classList.remove('highlight'), 2000);
            
            tableBody.appendChild(row);
        });
        
        const totalValue = totalStocksValue + totalMutualFundsValue;
        
        // Update summary values
        document.getElementById('stocksValue').textContent = `$${totalStocksValue.toFixed(2)}`;
        document.getElementById('mutualFundsValue').textContent = `$${totalMutualFundsValue.toFixed(2)}`;
        document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
        
        // Update percentages
        const stocksPercentage = totalValue > 0 ? (totalStocksValue / totalValue * 100).toFixed(1) : 0;
        const mfPercentage = totalValue > 0 ? (totalMutualFundsValue / totalValue * 100).toFixed(1) : 0;
        
        document.getElementById('stocksPercentage').textContent = `${stocksPercentage}%`;
        document.getElementById('mutualFundsPercentage').textContent = `${mfPercentage}%`;
    }

    updateTimestamps() {
        this.lastUpdateTime = new Date();
        this.nextUpdateTime = new Date(this.lastUpdateTime.getTime() + this.updateInterval);
        
        document.getElementById('lastUpdate').textContent = this.lastUpdateTime.toLocaleTimeString();
        document.getElementById('nextUpdate').textContent = this.nextUpdateTime.toLocaleTimeString();
    }

    updateCountdown() {
        const now = new Date();
        const timeUntilUpdate = this.nextUpdateTime - now;
        
        if (timeUntilUpdate <= 0) {
            document.getElementById('nextUpdate').textContent = 'Updating...';
        } else {
            const minutes = Math.floor(timeUntilUpdate / 60000);
            const seconds = Math.floor((timeUntilUpdate % 60000) / 1000);
            document.getElementById('nextUpdate').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')} (${this.nextUpdateTime.toLocaleTimeString()})`;
        }
    }

    startRealTimeUpdates() {
        // Simulate real-time data processing
        console.log('Real-time price engine started');
        console.log('Portfolio calculator initialized');
        console.log('Data sources connected');
        
        // Simulate occasional minor price fluctuations every 30 seconds
        setInterval(() => {
            this.simulateMinorPriceFluctuations();
        }, 30000);
    }

    simulateMinorPriceFluctuations() {
        // Small price changes to simulate real-time market movements
        this.assets.forEach(asset => {
            const minorChange = (Math.random() - 0.5) * 0.02; // -1% to +1%
            asset.currentPrice = asset.currentPrice * (1 + minorChange);
            asset.currentPrice = Math.round(asset.currentPrice * 100) / 100;
        });
        
        this.updatePortfolio();
    }

    updateDataSourcesStatus() {
        // Simulate data source status updates
        const sources = ['stockApiStatus', 'mfApiStatus', 'marketDataStatus'];
        
        sources.forEach(sourceId => {
            const statusElement = document.getElementById(sourceId);
            const dot = statusElement.querySelector('.status-dot');
            const text = statusElement.querySelector('span:last-child');
            
            // Randomly simulate occasional disconnections (5% chance)
            if (Math.random() < 0.05) {
                dot.classList.remove('active');
                text.textContent = 'Reconnecting...';
                
                // Reconnect after 2-5 seconds
                setTimeout(() => {
                    dot.classList.add('active');
                    text.textContent = 'Active';
                }, Math.random() * 3000 + 2000);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AssetViewProduct();
    
    // Add some interactive features
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
    
    console.log('Asset View Product initialized successfully');
    console.log('System features:');
    console.log('- Real-time portfolio updates every 10 minutes');
    console.log('- Multiple data source integration');
    console.log('- Automatic portfolio calculation and maintenance');
    console.log('- Support for stocks and mutual funds');
});
