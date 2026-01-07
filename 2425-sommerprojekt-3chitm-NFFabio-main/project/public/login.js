// login.js

// Function to zoom in the site
function zoomInSite() {
    const main = document.getElementById('main');
    main.style.transition = "transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
    document.querySelectorAll('input').forEach(input => {
        input.style.display = "none";
    });
    // Set transform-origin to lower part (e.g., 50% 80%)
    main.style.transformOrigin = "50% 90%";
    document.getElementById('main').style.transform = "scale(3)";
    setTimeout(() => {
        document.querySelectorAll('input').forEach(input => {
            input.style.transition = "opacity 1s";
            input.style.opacity = "0";
        });
        document.getElementById('main').style.transition += ", opacity 1s";
        document.getElementById('main').style.opacity = "0";
        setTimeout(() => {
            window.location.href = "controllRaum.html";
        }, 900); // Wait for opacity transition to finish
    }, 400);


    pressLogin()
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");
    const registerBtn = document.getElementById("register");

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }
    if (registerBtn) {
        registerBtn.addEventListener("click", register);
    }
});

function addShakeAnimationWithDelay(element, delay) {
    let isAnimating = false;
    function playAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        element.classList.add('shake-rotate');
        setTimeout(() => {
            element.classList.remove('shake-rotate');
            isAnimating = false;
            setTimeout(playAnimation, delay);
        }, 1000); // 1s animation duration
    }
    setTimeout(playAnimation, delay);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");
    const registerBtn = document.getElementById("register");

    if (loginBtn) {
        addShakeAnimationWithDelay(loginBtn, 3000);
    }
    if (registerBtn) {
        addShakeAnimationWithDelay(registerBtn, 5000);
    }
});

function register() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('pw').value;

    let formData = new FormData();
    formData.append('user', email);      // muss zu $_POST["user"] passen
    formData.append('password', password); // muss zu $_POST["password"] passen

    let url = "../api/register.php";
    let config = {
        method: "POST", // ✅ nicht "methode"
        body: formData
    };

   fetch(url, config)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.text();
    })
    .then(text => {
        console.log("Antwort:", text);
        const data = JSON.parse(text);
        if (data.code === 200) {
            zoomInSite();
        } else {
            alert('Registrierung fehlgeschlagen: ' + data.message);
        }
    })
    .catch(error => {
        console.error("Fehler:", error);
    });

}

function login() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('pw').value;

    console.log(email + " " + password)

    let formData = new FormData();
    formData.append('user', email); // angepasst auf 'user'
    formData.append('password', password); // angepasst auf 'password'

    let url = "../api/login.php";
    let config = {
        method: "POST", // <-- korrigiert von 'methode' auf 'method'
        body: formData
    };

    fetch(url, config)
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
            const data = JSON.parse(text);
            if (data.code === 200) {
                zoomInSite();
            } else {
                alert('Login fehlgeschlagen. Bitte überprüfe Benutzername und Passwort.');
            }
        })
        .catch((error) => {
            console.error("Fehler:", error);
        });
}
