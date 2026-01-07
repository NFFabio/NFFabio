let anzahlInput = null; // Globale Variable für die Anzahl

async function getLagerbestandForUser() {
  return fetch("../api/gesamtBestand.php")
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

getLagerbestandForUser().then(data => {
    const allproducts = data.produkte;
    console.log(allproducts);

    fetch('../api/orderRequest.php?mode=get')
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                console.log('Orders:', data.orders);
                let count = 0;
                const rightSection = document.getElementById('right');
                rightSection.innerHTML = ''; // Inhalt leeren

                for (const order of data.orders) {
                    count++;
                    for (const prd of allproducts) {
                        if (parseInt(prd.artikelnr) == parseInt(order.product)) {
                            // Prüfe Status der Bestellung
                            if (order.status === "inArbeit") {
                                // Timer-Ansicht
                                rightSection.innerHTML += `
                                    <div class="item" data-order-id="${order.id}">
                                        <div class="timerDisplay">00:00</div>
                                    </div>
                                `;
                                
                                // Timer nach dem Einfügen starten
                                setTimeout(() => {
                                    const item = rightSection.querySelector(`.item[data-order-id="${order.id}"]`);
                                    if (item) {
                                        const timerDisplay = item.querySelector('.timerDisplay');
                                        startOrResumeSpeditionsTimer(order.spedition || "Reder", timerDisplay);
                                        timerDisplay.style.display = 'flex';
                                        timerDisplay.style.alignItems = 'center';
                                        timerDisplay.style.justifyContent = 'center';
                                    }
                                }, 0);
                            } else {
                                // Normale Ansicht für "offen"
                                rightSection.innerHTML += `
                                    <div class="item" data-order-id="${order.product}">
                                        <h1>${prd.name}</h1>
                                        <hr>
                                        <input type="number" class="anzahl" placeholder="Anzahl">
                                        <select class="cars">
                                            <option value="Reder">Reder</option>
                                            <option value="Neundlinger">Neundlinger</option>
                                            <option value="Transdanubia">Transdanubia</option>
                                        </select>
                                        <p class="dauer">Dauer: LANG</p>
                                        <p class="kosten"> kosten</p>
                                        <div class="btnOrder" onclick="onclickOrderButton(event)">Bestellen!</div>
                                    </div>
                                `;
                            }
                        }
                    }
                }

                // Platzhalter für leere Slots
                if (count < 10) {
                    for (let i = count; i < 10; i++) {
                        rightSection.innerHTML += '<div class="placeholder"></div>';
                    }
                }

                // EventListener für alle Select-Elemente
                document.querySelectorAll('.cars').forEach(select => {
                    select.addEventListener('change', changeSpedition);
                });

            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});


function changeSpedition(event) {
    const item = event.target.closest('.item');
    const select = item.querySelector('.cars');
    anzahlInput = item.querySelector('.anzahl');
    const anzahl = parseInt(anzahlInput.value, 10);
    const kostenElement = item.querySelector('.kosten');
    const dauerElement = item.querySelector('.dauer');

    const selectedValue = select.value;
    

    console.log('Spedition ausgewählt:', selectedValue, 'Anzahl:', anzahl);

    if (!anzahl || isNaN(anzahl) || anzahl <= 0) {
        kostenElement.textContent = 'Bitte eine gültige Anzahl eingeben.';
        return;
    }

    switch (selectedValue) {
        case 'Reder':
            dauerElement.textContent = 'KURZ';
            kostenElement.textContent = anzahl * 20 + '€';
            break;
        case 'Neundlinger':
            dauerElement.textContent = 'MITTEL';
            kostenElement.textContent = anzahl * 15 + '€';
            break;
        case 'Transdanubia':
            dauerElement.textContent = 'LANG';
            kostenElement.textContent = anzahl * 10 + '€';
            break;
        default:
            kostenElement.textContent = 'Kosten: Unbekannt';
    }
}

function startOrResumeSpeditionsTimer(spedition, displayElement) {
    const keyPrefix = `sped_${spedition}`;
    let start = localStorage.getItem(`${keyPrefix}_start`);
    let duration = localStorage.getItem(`${keyPrefix}_duration`);

    if (!start || !duration) {
        // Dauer auf 1-3 Minuten (60.000 - 180.000 ms)
        // Dauer je nach Spedition: Reder = 1min, Neundlinger = 2min, Transdanubia = 3min
        switch (spedition) {
            case 'Reder':
            duration = 60 * 1000; // 1 Minute
            break;
            case 'Neundlinger':
            duration = 2 * 60 * 1000; // 2 Minuten
            break;
            case 'Transdanubia':
            duration = 3 * 60 * 1000; // 3 Minuten
            break;
            default:
            duration = (Math.floor(Math.random() * 121) + 60) * 1000; // Fallback: 1-3 Minuten zufällig
        }
        start = Date.now();
        localStorage.setItem(`${keyPrefix}_start`, start);
        localStorage.setItem(`${keyPrefix}_duration`, duration);
    } else {
        start = parseInt(start);
        duration = parseInt(duration);
    }

    const item = displayElement.closest('.item');
    const orderId = item?.getAttribute('data-order-id');

    let interval;

    function update() {
        const now = Date.now();
        const elapsed = now - start;
        const remaining = duration - elapsed;

        if (remaining <= 0) {
            if (orderId) {

                console.log('Timer abgelaufen für Bestellung:', orderId);
            
            const formDataBestand = new FormData();
            formDataBestand.append('orderId', orderId);
            fetch('../api/bestandsÄnderung.php?type=dawg', {
                method: 'POST',
                body: formDataBestand
            })
            .then(response => response.text())
            .then(result => {
                if (result.code === 200) {
                    console.log('Bestand erfolgreich erhöht:', result.message);
                } else {
                    console.error('Fehler beim Erhöhen des Bestands:', result.message);
                }
            })
            .catch(error => {
                console.error('Fetch error while updating stock:', error.message);
            });
              


            setTimeout(() => {
            console.log('Bestellung wird gelöscht:', orderId);
            const formData = new FormData();
            formData.append('order_id', orderId);
                 fetch('../api/orderRequest.php?mode=delete', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.code === 200) {
                if (item) item.remove();
                } else {
                console.error('Fehler beim Löschen:', result.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            }, 2000);



            }
           
            clearInterval(interval);
            return;
        }

        const secs = Math.floor(remaining / 1000);
        const mins = Math.floor(secs / 60);
        const displaySecs = secs % 60;

        displayElement.textContent = `${mins.toString().padStart(2, '0')}:${displaySecs.toString().padStart(2, '0')}`;
    }

    update();
    interval = setInterval(update, 1000);
}

function onclickOrderButton(event) {
    const item = event.target.closest('.item');
    if (!item) return;

    const select = item.querySelector('.cars');
    const selectedSpedition = select ? select.value : null;

    const orderId = item.getAttribute('data-order-id'); // ✅ HIERHER verschoben

    if (!orderId || !selectedSpedition) {
        console.error("Fehlende Daten: ", { orderId, selectedSpedition });
        return;
    }

    console.log('Bestellung:', orderId, 'Spedition:', selectedSpedition);

    // ⛔ Jetzt erst HTML ersetzen
    item.innerHTML = '<div class="timerDisplay">00:00</div>';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'center';

   
    const anzahl = parseInt(anzahlInput.value, 10);

    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('spedition', selectedSpedition);
    formData.append('status', 'inArbeit');
    formData.append('anzahl',anzahl ); // Produkt-ID hinzufügen

    fetch('../api/orderRequest.php?mode=edit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.code !== 200) {
            console.error('Fehler beim Aktualisieren der Bestellung:', result.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });

    const timerDisplay = item.querySelector('.timerDisplay');
    startOrResumeSpeditionsTimer(selectedSpedition, timerDisplay);
}

