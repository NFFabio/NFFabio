/* Variablen die Sessionübergreifend gespeichert werden müssen */
let Ruf = 10;
let Kontostand = 0;
let currentLagergröße = 300;//man man später gegen bezahlung erhöhen
let abgefertigteKunden = 0;
let unzufriedenheit = 0;
const MAXANZAHLANPRODUKTEN = 10; // Maximale Anzahl an Produkten, die ein Kunde kaufen kann
let isMaxAnzahlAnProduktenReached = false; // Flag, um zu überprüfen, ob die maximale Anzahl erreicht wurde
/******************* */

let allLageritemsQuantität = 0;
const HIGHESTRANDOMNUMBER = Ruf;




function initialize() {
    let url = "../api/bestand.php?id=0"; // initialization

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            checkBestand()
        })
        .catch((error) => {
            console.error("Fehler:", error);
        });
}


function getRandomNumber(OBERGRENZE) {
    return Math.floor(Math.random() * OBERGRENZE) + 1;
}

function kundenGen() {
    let randomN = getRandomNumber(10);

    if (randomN >= Ruf) return; // Wenn kein Kunde kommt, abbrechen

    console.log("Kunde erstellt");
    addMessage("Kunde erstellt", 0);

    getLagerbestandForUser().then(data => {
        const allproducts = data.produkte;
        const produktArraySize = allproducts.length;
        let Einkaufswagen = [];

        setTimeout(() => {
            // Produkte zufällig auswählen
            if (produktArraySize > 6) {
                for (let index = 0; index < 5; index++) {
                    Einkaufswagen.push(allproducts[getRandomNumber(produktArraySize - 1)]);
                }
            } else {
                for (let index = 0; index < produktArraySize; index++) {
                    Einkaufswagen.push(allproducts[index]);
                }

            }

            console.log('Einkaufswagen befüllt');
            console.log('-_-_-_-_-_-_-_-_-_-_-');

            // Lagerbestand reduzieren
            let product_ids_array = [];
            let quantity_per_id_array = [];

            Einkaufswagen.forEach(element => {

                if (element != undefined) {
                    let einkaufQuantität = getRandomNumber(6)
                    let result = element.bestand - einkaufQuantität;
                    if (result < 0) {
                        unzufriedenheit++;
                        checkUnzufriedenheit();
                        console.log('Kundenzufriedenheit angepasst --------------------------------');
                    } else {
                        product_ids_array.push(element.artikelnr);
                        quantity_per_id_array.push(result);


                        Kontostand += element.verkaufspreis * einkaufQuantität
                        document.getElementById('tre').innerText = Math.round(Kontostand) + " €";
                        
                    }
                }
            });


            // FormData korrekt mit []-Notation befüllen
            let changeQuantityRequest_formdata = new FormData();
            product_ids_array.forEach(id => {
                changeQuantityRequest_formdata.append('product_ids[]', id);
            });
            quantity_per_id_array.forEach(qty => {
                changeQuantityRequest_formdata.append('quantity_per_id[]', qty);
            });

            editLagerbestand(changeQuantityRequest_formdata);

            console.log('Kauf abgeschlossen');
            abgefertigteKunden++;
            if (abgefertigteKunden === 10) {
                if (Ruf < 10) Ruf++;
                abgefertigteKunden = 0;
            }
        }, 1 * 1000); // Einkaufs-Delay
    });
}

async function getLagerbestandForUser() {
    return fetch("../api/gesamtBestand.php")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function checkUnzufriedenheit() {
    if (unzufriedenheit >= 10) {
        Ruf--;
        unzufriedenheit = 10
        console.log("Ruf geddropped")

        addMessage("Ruf gesenkt!", 3);
    }
    if (isGameLost()) {
        endGame()
    }
}

function editLagerbestand(formData) {

    let url = "../api/bestandsÄnderung.php";
    let config = {
        method: "POST",
        body: formData
    };

    fetch(url, config)
        .then((response) => response.text())
        .then((text) => {
            console.log("Antwort von PHP:", text); // 👈 füge das hinzu

            try {
                const data = JSON.parse(text);
                if (data.code === 200) {
                    // alles okay
                } else {
                }
            } catch (e) {
                console.error("Fehler beim Parsen der JSON-Antwort:", e);
            }
        })
}

function addNewProduct() {
    if (!isMaxAnzahlAnProduktenReached) {

    let url = "../api/bestand.php?id=1"; // initialization

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json(); // <- JSON parsen
        })
        .then((data) => {

        })
        .catch((error) => {
            console.error("Fehler:", error);
        });

    addMessage("NEUES PRODUKT VERFÜGBAR", 2);
    }
}


function checkBestand() {
    getLagerbestandForUser().then(data => {
        allLageritemsQuantität = 0; 
        productCount = 0;// vorher zurücksetzen
        data.produkte.forEach(produkt => {
            productCount++;
            allLageritemsQuantität += produkt.bestand;
        });

        if( productCount === 10)isMaxAnzahlAnProduktenReached = true;

        if (allLageritemsQuantität > currentLagergröße) {
            updateDonutChart(allLageritemsQuantität, currentLagergröße);
        }

        let iteration = 0
        let zeitZumLagerAufräumen_interval = setInterval(() => {
            if (allLageritemsQuantität > currentLagergröße) {
                if (iteration > 0) {
                    unzufriedenheit++
                    checkUnzufriedenheit();
                }
                iteration++;
                console.log(iteration)
                // Wenn sich die Werte ändern:
                updateDonutChart(allLageritemsQuantität, currentLagergröße);

            } else clearInterval(zeitZumLagerAufräumen_interval);
        }, 5 * (60 * 1000))

        updateDonutChart(allLageritemsQuantität, currentLagergröße);

    });
}

function isGameLost() {
    return Ruf === 0;
}


function addNewDaily() {

    getLagerbestandForUser().then(data => {
        const allproducts = data.produkte;
        const produktArraySize = allproducts.length;
        let sortiment = [];

        setTimeout(() => {
            // Produkte zufällig auswählen
            if (produktArraySize > 6) {
                for (let index = 0; index < 5; index++) {
                    sortiment.push(allproducts[getRandomNumber(produktArraySize - 1)]);
                }
            } else {
                for (let index = 0; index < produktArraySize - 1; index++) {
                    sortiment.push(allproducts[index]);
                }
            }
            // Lagerbestand reduzieren
            let product_ids_array = [];
            let quantity_per_id_array = [];

            sortiment.forEach(element => {

                if (element != undefined) {
                    let einkaufQuantität = getRandomNumber(6)
                    let result = element.bestand + einkaufQuantität;

                    product_ids_array.push(element.artikelnr);
                    quantity_per_id_array.push(result);
                }
            });


            // FormData korrekt mit []-Notation befüllen
            let changeQuantityRequest_formdata = new FormData();
            product_ids_array.forEach(id => {
                changeQuantityRequest_formdata.append('product_ids[]', id);
            });
            quantity_per_id_array.forEach(qty => {
                changeQuantityRequest_formdata.append('quantity_per_id[]', qty);
            });

            editLagerbestand(changeQuantityRequest_formdata);

            addMessage("Neuer Tag, neues Glück!", 1);

        }, 1 * 1000); // Einkaufs-Delay
        ;
    })
}

function endGame() {
    //end here
}

function billCollector() {

}




//run functions -----------------------------------------------------------------------------------------------------------------------------------





let count = 0;
let max = 12;

// Verwende Web Worker für Hintergrund-Loop, wenn Seite nicht aktiv ist
let gameLoopInterval;
let dailyTimeout;

function startGameLoop() {
    addNewDaily(); // jeden Tag neue Produkte

    // Kunden-Loop
    gameLoopInterval = setInterval(() => {
        kundenGen(); // Kunden generieren
        count++;
        if (count >= max) {
            clearInterval(gameLoopInterval);
            console.log(Kontostand)
        }
        checkBestand();
        if (Math.random() < 0.1) { // 10% Chance, dass ein neues Produkt hinzugefügt wird
            addNewProduct();
        }
    }, 5000);

    // Tageswechsel alle 5 Minuten, auch wenn Tab nicht aktiv ist
    function dailyLoop() {
        if (!isGameLost()) {
            addNewDaily();
            checkBestand();
            dailyTimeout = setTimeout(dailyLoop, 5 * 60 * 1000);
        } else {
            clearInterval(gameLoopInterval);
            addMessage("Game Over! Ruf ist auf 0 gesunken.", 3);
            endGame();
        }
    }
    dailyTimeout = setTimeout(dailyLoop, 5 * 60 * 1000);
}

// Sichtbarkeitswechsel behandeln, um Loop weiterlaufen zu lassen
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        if (!gameLoopInterval) startGameLoop();
    }
});

// Starte die Gameloop
startGameLoop();



/* ------------------------------------------------------------- ChartJS ------------------------------------------------------------- *//*donut chart */
// Globale Referenz speichern
const donutChart = document.getElementById('donutC');
const frei = currentLagergröße - allLageritemsQuantität;
let myLChart; // Globale Variable für das Line-Chart
myChart = new Chart(donutChart, {
    type: 'doughnut',
    data: {
        labels: ['besetzt', 'frei'],
        datasets: [{
            data: [allLageritemsQuantität, frei],
            backgroundColor: ['#25EA5A', '#8983F3']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

/* Line Chart */
const lineChart = document.getElementById('lineC');

if (myLChart) {
    myLChart.destroy();
}

const data = {
    labels: ["live", "love", "lie"],
    datasets: [{
        label: 'Performance',
        data: [3, 6, 10],
        fill: false,
        borderColor: '#AC49ED'
    }]
};
const config = {
    type: 'line',
    data: data,
};
myLChart = new Chart(lineChart, config);

/*----------------------------------------------- */
function updateDonutChart(besetzt, gesamtKapazität) {
    const frei = gesamtKapazität - besetzt;

    if (myChart) {
        if (frei <= 0) {
            // Lager voll – ein rotes Segment
            myChart.data.datasets[0].data = [1];
            myChart.data.datasets[0].backgroundColor = ['#FF0000'];
            myChart.data.labels = ['Lager voll'];
            if (!updateDonutChart.lagerVollGemeldet) {
                addMessage("Lager voll!", "3");
                updateDonutChart.lagerVollGemeldet = true;
            }
        } else {
            // Lager nicht voll – grün & blau
            myChart.data.datasets[0].data = [besetzt, frei];
            myChart.data.datasets[0].backgroundColor = ['#25EA5A', '#8983F3'];
            myChart.data.labels = ['besetzt', 'frei'];
        }
        myChart.update();
    } else {
        // Chart neu erstellen, falls nicht vorhanden
        const donutChart = document.getElementById('donutC');
        myChart = new Chart(donutChart, {
            type: 'doughnut',
            data: {
                labels: frei <= 0 ? ['Lager voll'] : ['besetzt', 'frei'],
                datasets: [{
                    data: frei <= 0 ? [1] : [besetzt, frei],
                    backgroundColor: frei <= 0 ? ['#FF0000'] : ['#25EA5A', '#8983F3']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}
const lowerPart = document.getElementById('lowerPart');

function addMessage(text, importance) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    // Set background color based on numeric importance
    let bgColor;
    switch (importance) {
        case 0: // green (success)
            bgColor = '#25EA5A';
            break;
        case 1: // purple (primary)
            bgColor = '#8983F3';
            break;
        case 2: // blue (info)
            bgColor = '#49B6ED';
            break;
        case 3: // red (danger)
            bgColor = '#FF0000';
            break;
        default:
            bgColor = '#49B6ED';
    }
    messageDiv.style.backgroundColor = bgColor;

    messageDiv.innerHTML = `<div>${text}</div>`;
    lowerPart.insertBefore(messageDiv, lowerPart.firstChild);

    // Check if there are more than 10 messages, remove the last one if so
    const messages = lowerPart.querySelectorAll('.message');
    if (messages.length > 5) {
        lowerPart.removeChild(lowerPart.lastElementChild);
    }
}

