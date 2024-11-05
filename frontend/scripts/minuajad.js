function uuendaAegu() {
    fetch("/api/ajad", {})
    .then(data => data.json())
    .then(response => {
        response.forEach(element => {
            lisaAeg(element);
        });
    })
}

function dateToTime(date) {
    const d = new Date(date);
    return d.getHours() + ":" + d.getMinutes();
}

function lisaAeg(aeg) {
    console.log(JSON.parse(aeg.registreeritud))
    if(JSON.parse(aeg.registreeritud).includes(parseInt(localStorage.getItem("user_id")))) {
        const ajad = document.getElementById("ajad")
    
        const tabelielem = document.createElement("tr")
        tabelielem.id = "aeg"

        // Aine nimi
        const an = document.createElement("th")
        an.innerHTML=aeg.aine_nimi
        tabelielem.appendChild(an);

        // Opetaja
        const on = document.createElement("th")
        on.innerHTML=aeg.aine_opetaja
        tabelielem.appendChild(on);

        // Aja vahemik
        const ag = document.createElement("th")
        ag.innerHTML = dateToTime(aeg.aeg_algus) + " - " + dateToTime(aeg.aeg_lopp)
        tabelielem.appendChild(ag);

        // Tule/Registreeri nupp
        const tule = document.createElement("button");
        tule.innerHTML = "Eemalda"
        tule.id="register-btn"
        tule.addEventListener("click", () => {
            if(localStorage.getItem("session_token")) {
                fetch("/unregisterc", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({secret: localStorage.getItem("session_token"), course_id: aeg.id})
                }).then(response => response.json()).then(data => {
                    alert(data.message);
                    window.location.reload();
                })
            } else {
                window.location.href = "login.html"
            }
        });
        tabelielem.appendChild(tule);

        ajad.appendChild(tabelielem);
    }
}
uuendaAegu();