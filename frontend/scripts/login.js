document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        
        const mailField = document.getElementById("email-field");
        const passwordField = document.getElementById("password-field");

        if(mailField.value === "") {
            mailField.style.borderColor = "red";
            return;
        }
        if(passwordField.value === "") {
            passwordField.style.borderColor = "red"
            return;
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({meil: mailField.value, password: passwordField.value})
        }).then(response => response.json()).then(data => {
            if(data.error) {
                document.getElementById("error").innerHTML= data.error
                document.getElementById("error").style.display = "block"
            } else {
                localStorage.setItem("session_token", data.token)
                localStorage.setItem("user_id", data.id)
                localStorage.setItem("roll", data.roll)
                window.location.href = "index.html"
            }
        })
    });
});