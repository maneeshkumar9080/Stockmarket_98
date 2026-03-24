const ChartModule = (() => {
    let chartInstance = null;
    let currentData = null;

    const initChart = () => {
        const ctx = document.getElementById('stockChart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Stock Price',
                    data: [],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#667eea',
                        borderWidth: 2,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                return UtilsModule.formatDate(currentData.timestamps[index]);
                            },
                            label: function(context) {
                                return 'Price: ' + UtilsModule.formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#999',
                            maxRotation: 45,
                            minRotation: 0
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: false,
                        ticks: {
                            color: '#999',
                            callback: function(value) {
                                return UtilsModule.formatCurrency(value);
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    };

    const updateChart = (data) => {
        currentData = data;

        const labels = data.timestamps.map(ts => UtilsModule.formatDate(ts));
        
        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data.prices;
            chartInstance.data.datasets[0].label = `${data.symbol} Price`;
            chartInstance.update();
        }
    };

    const getChartInstance = () => {
        return chartInstance;
    };

    return {
        initChart,
        updateChart,
        getChartInstance
    };
})();
