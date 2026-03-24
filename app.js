const AppModule = (() => {
    const Stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];
    let stocksInfo = [];
    let currentSymbol = 'AAPL';
    let currentRange = '1month';

    const init = async () => {
        ChartModule.initChart();
        await loadStocksInfo();
        await loadChartData(currentSymbol, currentRange);
        setupEventListeners();
    };

    const loadStocksInfo = async () => {
        stocksInfo = [];
        for (const symbol of Stocks) {
            const info = await ApiModule.getStockInfo(symbol);
            stocksInfo.push(info);
        }
        ListModule.renderStockList(stocksInfo);
        const firstStock = stocksInfo[0];
        DetailModule.updateDetail(firstStock);
    };

    const loadChartData = async (symbol, range) => {
        currentSymbol = symbol;
        currentRange = range;
        
        const data = await ApiModule.getHistoricalData(symbol, range);
        const peakValue = UtilsModule.findPeakValue(data.prices);
        const lowValue = UtilsModule.findLowValue(data.prices);
        
        DetailModule.setPeakAndLowValues(peakValue, lowValue);
        ChartModule.updateChart(data);
        ListModule.highlightStock(symbol);

        const stockInfo = stocksInfo.find(s => s.symbol === symbol);
        if (stockInfo) {
            DetailModule.updateDetail(stockInfo, peakValue, lowValue);
        }
    };

    const setupEventListeners = () => {
        const rangeButtons = document.querySelectorAll('.range-btn');
        rangeButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                rangeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const range = btn.getAttribute('data-range');
                await loadChartData(currentSymbol, range);
            });
        });

        document.querySelector('.range-btn').classList.add('active');
    };

    return {
        init,
        loadChartData
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    AppModule.init();
});
