function updateTotals(type, price, profit) {
    const priceElement = document.getElementById(`${type}-fiyat`);
    const profitElement = document.getElementById(`${type}-kar`);
    
    let currentPrice = parseFloat(priceElement.innerText);
    let currentProfit = parseFloat(profitElement.innerText);

    currentPrice += price;
    currentProfit += profit;

    priceElement.innerText = currentPrice.toFixed(2);
    profitElement.innerText = currentProfit.toFixed(2);
}

function resetData() {
    ['nakit', 'kart', 'veresiye'].forEach(type => {
        document.getElementById(`${type}-fiyat`).innerText = '0';
        document.getElementById(`${type}-kar`).innerText = '0';
    });
    localStorage.removeItem('salesData');
}

window.onload = () => {
    const salesData = JSON.parse(localStorage.getItem('salesData')) || {
        nakit: { price: 0, profit: 0 },
        kart: { price: 0, profit: 0 },
        veresiye: { price: 0, profit: 0 }
    };
    
    for (const type in salesData) {
        updateTotals(type, salesData[type].price, salesData[type].profit);
    }
};

