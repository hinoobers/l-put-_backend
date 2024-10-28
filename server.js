const express = require("express");
const app = express();

const ajad = [
    {aine_nimi: "Matemaatika", opetaja: "Matemaatika Opetaja", "aeg_algus": "14:15", "aeg_lopp": "15:05", "kuupaev": "28.10.2024"}
]

app.get("/ajad", async (req, res) => {
    return res.json({ajad})
});

app.post("/lisa", async (req, res) => {
    const {
        aine_nimi,
        opetaja,
        aeg_algus,
        aeg_lopp,
        kuupaev
    } = req.body;

});

app.post("/login", async (req, res) => {

});

app.listen(3000, () => {
    console.log("Server kuulab pordi 3000 peal!");
});