let lastQuery = "";
function updateSearch() {
    setInterval(() => {
        let query = document.getElementById("otsimisriba").value;
        const ajad = document.getElementById("ajad");
        if(query == lastQuery) return;
    
        if(query !== "") {
            query = query.toLowerCase()
            for (const child of ajad.children) {
                const str = (child.children[0].innerHTML + " " + child.children[1].innerHTML + " " + child.children[2].innerHTML).trim().toLowerCase()
                if(str.includes(query)) {
                    child.style.display= ""
                } else {
                    child.style.display="none"
                }
            }
        } else {
            for (const child of ajad.children) {
                child.style.display=""
            }
        }
    
        lastQuery = query;
    }, 50);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("otsimisriba").addEventListener("keydown", () => {
        updateSearch();
    })

    document.getElementById("otsimisriba").addEventListener("keypress", () => {
        updateSearch();
    })

    document.getElementById("otsimisriba").addEventListener("change", () => {
        updateSearch();
    });
});

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

function parseDate(date) {
    const str = date.split("-");
    // console.log(str[1]);
    // console.log(str[2].substring(0, 2))
    return str[1] + "/" + str[2].substring(0,2)
}

function lisaAeg(aeg) {
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
    ag.innerHTML = "|" + dateToTime(aeg.aeg_algus) + " - " + dateToTime(aeg.aeg_lopp) + " (" + parseDate(aeg.aeg_algus) + ")"
    tabelielem.appendChild(ag);

    // Tule/Registreeri nupp
    const tule = document.createElement("button");
    tule.innerHTML = "Tule"
    tule.id="register-btn"
    tule.addEventListener("click", () => {
        if(localStorage.getItem("session_token")) {
            fetch("/registerc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({secret: localStorage.getItem("session_token"), course_id: aeg.id})
            }).then(response => response.json()).then(data => {
                alert(data.message);
            })
        } else {
            window.location.href = "login.html"
        }
    });
    tabelielem.appendChild(tule);

    ajad.appendChild(tabelielem);
}
uuendaAegu();