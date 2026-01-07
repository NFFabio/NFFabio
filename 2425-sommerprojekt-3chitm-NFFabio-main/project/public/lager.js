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

    const output = document.getElementById("productwrapper");

    const averageBestand =
        allproducts.reduce((sum, product) => sum + Number(product.bestand), 0) /allproducts.length;
    console.log("Average Bestand:", averageBestand);

    for (const product of allproducts) {
        output.innerHTML +=
        `
        <div class="item" data-value="${product.artikelnr}">
            <h2>${product.name}</h2>
            <div id="statisticline">${product.bestand}</div>
            <div id="orderbutn" onclick="orderMore(event)">order more</div>
        </div>
        `

        const itemDiv = output.querySelector('.item[data-value="' + product.artikelnr + '"]');
        if (itemDiv) {
            const statisticLine = itemDiv.querySelector('#statisticline');
            if (statisticLine) {
                // Set width as a percentage of averageBestand, capped at 100%
                let widthPercent = (Number(product.bestand) / averageBestand) * 33.33;
                widthPercent = Math.min(widthPercent, 100);
                if (Number(product.bestand) === 0) {
                    widthPercent = 1;
                }
                statisticLine.style.width = `${widthPercent}%`;
                statisticLine.style.position = 'relative';
                statisticLine.style.top = '15%';
            }
        }
    }
})

function orderMore(event) {
    // Ensure event is passed (for inline onclick, pass 'event' as argument)
    if (!event) {
        console.error("Event object is required. Please use: onclick='orderMore(event)'");
        return;
    }

    const button = event.currentTarget;
    const itemDiv = button.closest('.item');
    button.classList.add('clicked');
    button.style.transition = 'transform 0.2s';
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        setTimeout(() => {
            button.classList.remove('clicked');
            button.style.transition = '';
        }, 200);
    }, 200);
    const artikelnr = itemDiv ? itemDiv.getAttribute('data-value') : null;
    console.log('Artikelnr:', artikelnr);

    getLagerbestandForUser().then(data => {
        const allproducts = data.produkte;

        const product = allproducts.find(p => p.artikelnr == artikelnr);
        if (product) {
            let formData = new FormData();
            console.log("Produkt gefunden:", product.user_id);
            console.log("Produkt gefunden:", product.artikelnr);
            formData.append('user_id', product.user_id);
            formData.append('product', product.artikelnr);

            let url = "../api/orderRequest.php?mode=add";
            let config = {
                method: "POST",
                body: formData
            };

            fetch(url, config)
                .then(response => response.json())
                .then(result => {
                    if (result.code === 200) {
                    } else {
                    }
                })
                .catch(error => {
                    console.error("Fehler:", error);
                    alert("Fehler beim Senden der Bestellung.");
                });
        } else {
            alert("Produkt nicht gefunden.");
        }
    });
}