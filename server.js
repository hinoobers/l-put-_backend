const express = require("express");
const app = express();
const conn = require("./databaas");

// App middleware
app.use(express.static("frontend/"))
app.use(express.json())

app.get("/api/ajad", async (req, res) => {
    let [result] = await conn.query("SELECT * FROM ajad");
    if(result.length == 0) {
        return res.json([]);
    } else {
        result.forEach(element => {
            const date = new Date(element.aeg_algus);
            const end = new Date(element.aeg_lopp);
            if(Date.now() > date) {
                if(Date.now() > end) {
                    element.staatus = "loppenud";
                } else {
                    element.staatus = "käib"
                }
            } else {
                // veel tuleb
                element.staatus = "tulekul";
            }
        });
        return res.json(result);
    }
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

app.post("/registerc", async (req, res) => {
    const {
        secret,
        course_id
    } = req.body;

    let [result] = await conn.query("SELECT * FROM kasutajad WHERE secret=?", [secret]);
    let [result2] = await conn.query("SELECT * FROM ajad WHERE id=?", [course_id]);
    if(result.length == 0 || result2.length == 0) {
        return res.status(401).json({error: "Pole olemas"});
    } else {
        let current = JSON.parse(result2[0].registreeritud);
        if(current.includes(result[0].id)) {
            return res.status(400).json({success: false, message: "Olete juba registreerinud"});
        }
        current.push(result[0].id)
        await conn.query(`UPDATE ajad SET registreeritud='${JSON.stringify(current)}' WHERE id=${course_id}`);
        return res.status(200).json({success: true, message: "Olete registreerinud ennast kontsulatsiooni!"});
    }
})

app.post("/login", async (req, res) => {
    const {
        meil,
        password
    } = req.body;

    let [result] = await conn.query("SELECT * FROM kasutajad WHERE meil=?", [meil]);
    if(result.length == 0) {
        return res.status(401).json({error: "Vale parool/meil"});
    } else {
        result = result[0];
        
        return res.status(200).json({token: result.secret})
    }
});

app.listen(3000, () => {
    console.log("Server kuulab pordi 3000 peal!");
});