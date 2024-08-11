let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveSalesData(type, price, profit) {
    let salesData = JSON.parse(localStorage.getItem('salesData')) || {
        nakit: { price: 0, profit: 0 },
        kart: { price: 0, profit: 0 },
        veresiye: { price: 0, profit: 0 }
    };
    
    salesData[type].price += price;
    salesData[type].profit += profit;

    localStorage.setItem('salesData', JSON.stringify(salesData));

    updateTotals(type, price, profit);
}

function addProduct() {
    const name = document.getElementById('urun-isim').value;
    const price = parseFloat(document.getElementById('urun-fiyat').value);
    const profit = parseFloat(document.getElementById('urun-kar').value);
    const quantity = parseInt(document.getElementById('urun-miktar').value);
    const photoInput = document.getElementById('urun-fotograf');
    const photo = photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : '';

    if (name && price >= 0 && profit >= 0 && quantity > 0) {
        const product = { name, price, profit, quantity, photo };
        products.push(product);
        saveProducts();
        updateProductList();
    }
}

function updateProductList() {
    const list = document.getElementById('urun-listesi');
    list.innerHTML = '';
    products.forEach((product, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <img src="${product.photo}" alt="${product.name}" style="width:50px;height:50px;">
            ${product.name} - Fiyat: ${product.price} TL - Kar: ${product.profit} TL - Miktar: ${product.quantity}
            <button onclick="adjustQuantity(${index}, 1)">+</button>
            <button onclick="adjustQuantity(${index}, -1)">-</button>
            <button onclick="updateProduct(${index})">Güncelle</button>
            <button onclick="sellProduct(${index}, 'nakit')">Nakit Satış</button>
            <button onclick="sellProduct(${index}, 'kart')">Kart Satış</button>
            <button onclick="sellProduct(${index}, 'veresiye')">Veresiye Satış</button>
        `;
        list.appendChild(item);
    });
}

function adjustQuantity(index, amount) {
    products[index].quantity += amount;
    if (products[index].quantity < 0) products[index].quantity = 0;
    saveProducts();
    updateProductList();
}

function updateProduct(index) {
    const newPrice = parseFloat(prompt('Yeni Fiyat:', products[index].price));
    const newProfit = parseFloat(prompt('Yeni Kar:', products[index].profit));

    if (!isNaN(newPrice) && !isNaN(newProfit)) {
        products[index].price = newPrice;
        products[index].profit = newProfit;
        saveProducts();
        updateProductList();
    }
}

function sellProduct(index, type) {
    const product = products[index];
    saveSalesData(type, product.price, product.profit);
}

window.onload = updateProductList;
