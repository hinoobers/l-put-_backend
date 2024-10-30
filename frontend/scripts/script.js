document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("hamburger")[0].addEventListener("click", (me) => {
        const navbar = document.getElementById("navbar");

        if(localStorage.getItem("session_token")) {
            document.getElementById("navbar-login").style.display="none"
        }

        if(navbar.classList.contains("is-open")) {
            navbar.classList.remove("is-open");
            navbar.classList.add("is-closed")
        } else {
            navbar.classList.add("is-open");
            navbar.classList.remove("is-closed");
        }
    });
});