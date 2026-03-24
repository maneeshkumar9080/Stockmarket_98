const ListModule = (() => {
    let stocksData = [];

    const renderStockList = (stocks) => {
        const stockList = document.getElementById('stockList');
        stockList.innerHTML = '';

        stocks.forEach((stock, index) => {
            const stockItem = document.createElement('div');
            stockItem.className = 'stock-item';
            if (index === 0) stockItem.classList.add('active');
            stockItem.setAttribute('data-symbol', stock.symbol);

            const profitClass = UtilsModule.getProfitClass(stock.profit);
            const profitSign = stock.profit > 0 ? '+' : '';

            stockItem.innerHTML = `
                <div class="stock-item-name">${stock.symbol}</div>
                <div class="stock-item-details">
                    <span>BV: ${UtilsModule.formatCurrency(stock.bookValue)}</span>
                    <span class="stock-item-profit ${profitClass}">${profitSign}${UtilsModule.formatCurrency(stock.profit)}</span>
                </div>
            `;

            stockItem.addEventListener('click', () => {
                selectStock(stock);
            });

            stockList.appendChild(stockItem);
        });

        stocksData = stocks;
    };

    const selectStock = (stock) => {
        const items = document.querySelectorAll('.stock-item');
        items.forEach(item => item.classList.remove('active'));

        const selectedItem = document.querySelector(`[data-symbol="${stock.symbol}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        if (typeof DetailModule !== 'undefined') {
            DetailModule.updateDetail(stock);
        }

        const currentRange = document.querySelector('.range-btn.active')?.dataset.range || '1month';
        if (typeof AppModule !== 'undefined') {
            AppModule.loadChartData(stock.symbol, currentRange);
        }
    };

    const highlightStock = (symbol) => {
        const items = document.querySelectorAll('.stock-item');
        items.forEach(item => item.classList.remove('active'));
        
        const item = document.querySelector(`[data-symbol="${symbol}"]`);
        if (item) {
            item.classList.add('active');
        }
    };

    return {
        renderStockList,
        selectStock,
        highlightStock
    };
})();
