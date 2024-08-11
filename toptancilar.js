let toptancilar = JSON.parse(localStorage.getItem('toptancilar')) || [];

function saveToptancilar() {
    localStorage.setItem('toptancilar', JSON.stringify(toptancilar));
}

function addToptanci() {
    const name = document.getElementById('toptanci-adi').value;
    const debt = parseFloat(document.getElementById('toptanci-borc').value);

    if (name && debt >= 0) {
        const toptanci = { name, debt };
        toptancilar.push(toptanci);
        saveToptancilar();
        updateToptanciList();
    }
}

function updateToptanciList() {
    const list = document.getElementById('toptanci-listesi');
    list.innerHTML = '';
    toptancilar.forEach((toptanci, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            ${toptanci.name} - Borç: ${toptanci.debt} TL
            <button onclick="adjustDebt(${index}, 1)">Borç Arttır</button>
            <button onclick="adjustDebt(${index}, -1)">Borç Azalt</button>
        `;
        list.appendChild(item);
    });
}

function adjustDebt(index, amount) {
    const adjustment = parseFloat(prompt('Miktar:', '0'));
    if (!isNaN(adjustment)) {
        toptancilar[index].debt += amount * adjustment;
        if (toptancilar[index].debt < 0) toptancilar[index].debt = 0;
        saveToptancilar();
        updateToptanciList();
    }
}

window.onload = updateToptanciList;

