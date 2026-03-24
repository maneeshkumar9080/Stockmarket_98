const DetailModule = (() => {
    let currentPeakValue = 0;
    let currentLowValue = 0;

    const updateDetail = (stockInfo, peakValue = null, lowValue = null) => {
        document.getElementById('detailStockName').textContent = stockInfo.name || stockInfo.symbol;
        document.getElementById('detailBookValue').textContent = UtilsModule.formatCurrency(stockInfo.bookValue);
        
        const profitElement = document.getElementById('detailProfit');
        const profitClass = UtilsModule.getProfitClass(stockInfo.profit);
        const profitSign = stockInfo.profit > 0 ? '+' : '';
        
        profitElement.textContent = profitSign + UtilsModule.formatCurrency(stockInfo.profit);
        profitElement.className = 'detail-value ' + profitClass;

        if (peakValue !== null) {
            currentPeakValue = peakValue;
            document.getElementById('detailPeakValue').textContent = UtilsModule.formatCurrency(peakValue);
        }

        if (lowValue !== null) {
            currentLowValue = lowValue;
            document.getElementById('detailLowValue').textContent = UtilsModule.formatCurrency(lowValue);
        }

        const summaryText = stockInfo.summary || 'Stock information available';
        document.getElementById('detailSummary').textContent = summaryText;
    };

    const setPeakAndLowValues = (peakValue, lowValue) => {
        currentPeakValue = peakValue;
        currentLowValue = lowValue;

        document.getElementById('detailPeakValue').textContent = UtilsModule.formatCurrency(peakValue);
        document.getElementById('detailLowValue').textContent = UtilsModule.formatCurrency(lowValue);
    };

    return {
        updateDetail,
        setPeakAndLowValues
    };
})();
