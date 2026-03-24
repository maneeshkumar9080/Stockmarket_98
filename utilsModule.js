const UtilsModule = (() => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (value) => {
        return '$' + parseFloat(value).toFixed(2);
    };

    const formatNumber = (value) => {
        return parseFloat(value).toFixed(2);
    };

    const getProfitColor = (value) => {
        return value > 0 ? '#22c55e' : '#ef4444';
    };

    const getProfitClass = (value) => {
        return value > 0 ? 'profit-positive' : 'profit-negative';
    };

    const findPeakValue = (prices) => {
        return prices.length > 0 ? Math.max(...prices) : 0;
    };

    const findLowValue = (prices) => {
        return prices.length > 0 ? Math.min(...prices) : 0;
    };

    return {
        formatDate,
        formatCurrency,
        formatNumber,
        getProfitColor,
        getProfitClass,
        findPeakValue,
        findLowValue
    };
})();
