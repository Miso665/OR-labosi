const express = require("express");
const router = express.Router();
const db = require('../db');

router.get("/", async function (req, res, next) {
    const sqlPodaci = `SELECT * FROM automobili`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Svi automobili",
                        response});
    } catch (err) {
        console.error(err.message);
        res.type('application/json');
        res.status(500);
        return res.json({"status": "Server error",
                            "message": "Greska sa bazom podataka",
                            "resposne": null});
    }
});

router.get("/:id", async function (req, res, next) {
    const idAuta = req.params.id;
    const sqlPodaci = `SELECT * FROM automobili NATURAL JOIN vozaci WHERE id_auta = ${idAuta}`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(404);
            return res.json({"status": "Not found",
                                "message": "Ne postoji automobil sa tim ID-om",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Podaci o odredenom automobilu",
                        response});
    } catch (err) {
        console.error(err.message);
        res.type('application/json');
        res.status(404);
        return res.json({"status": "Not found",
                            "message": "Ne postoji automobil sa tim ID-om",
                            "resposne": null});
    }
});

router.get("/pobjede/:brpob", async function (req, res, next) {
    const brojPobjeda = req.params.brpob;
    const sqlPodaci = `SELECT * FROM automobili NATURAL JOIN vozaci WHERE broj_pobjeda = ${brojPobjeda}`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(404);
            return res.json({"status": "Not found",
                                "message": "Ne postoji automobil sa tim brojem pobjeda",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Automobili s odredenim brojem pobjeda",
                        response});
    } catch (err) {
        console.error(err.message);
        res.type('application/json');
        res.status(404);
        return res.json({"status": "Not found",
                            "message": "Ne postoji automobil sa tim brojem pobjeda",
                            "resposne": null});
        }
});

router.post("/", async function (req, res, next) {
    const podaci = req.body;
    console.log(podaci)
    if (podaci.id_auta !== undefined && podaci.model !== undefined && podaci.proizvodac !== undefined &&
        podaci.velicina_motora_l !== undefined && podaci.broj_brzina !== undefined && podaci.vrsta_pogona !== undefined &&
        podaci.tezina_kg !== undefined && podaci.duljina_mm !== undefined && podaci.sirina_mm !== undefined &&
        podaci.razmak_izmedu_kotaca_mm !== undefined && podaci.broj_pobjeda !== undefined && podaci.id_vozaca !== undefined) {
        const sqlPodaci = `INSERT INTO automobili VALUES(${podaci.id_auta}, '${podaci.model}', '${podaci.proizvodac}',
        ${podaci.velicina_motora_l}, ${podaci.broj_brzina}, '${podaci.vrsta_pogona}', ${podaci.tezina_kg},
        ${podaci.duljina_mm}, ${podaci.sirina_mm}, ${podaci.razmak_izmedu_kotaca_mm}, ${podaci.broj_pobjeda},
        ${podaci.id_vozaca}) RETURNING *`;
        try {
            const resultPodaci = (await db.query(sqlPodaci, [])).rows;
            if (resultPodaci.length === 0) {
                res.type('application/json');
                res.status(400);
                return res.json({"status": "Bad request",
                                    "message": "Nedostaju podaci o automobilu",
                                    "resposne": null});
            }
            const rawPodaci = JSON.stringify(resultPodaci);
            const response = JSON.parse(rawPodaci);
            res.type('application/json');
            res.status(201);
            return res.json({"status": "Created",
                            "message": "Dodan automobil",
                            response});
        } catch (err) {
            res.type('application/json');
            res.status(400);
            return res.json({"status": "Bad request",
                                "message": "Nedostaju podaci o automobilu",
                                "resposne": null});
        }
        
    } else {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Bad request",
                            "message": "Nedostaju podaci o automobilu",
                            "resposne": null});
    }
    
});

router.put("/:id", async function (req, res, next) {
    const idAuta = req.params.id;
    const podaci = req.body;
    let prvi = false
    let sqlPodaci = 'UPDATE automobili SET ';
    if (podaci.model !== undefined)
        sqlPodaci += ` model = '${podaci.model}',`;
    if (podaci.proizvodac !== undefined) 
        sqlPodaci += ` proizvodac = '${podaci.proizvodac}',`;
    if (podaci.velicina_motora_l !== undefined) 
        sqlPodaci += ` velicina_motora_l = ${podaci.velicina_motora_l},`;
    if (podaci.broj_brzina !== undefined)
        sqlPodaci += ` broj_brzina = ${podaci.broj_brzina},`;
    if (podaci.vrsta_pogona !== undefined)
        sqlPodaci += ` vrsta_pogona = '${podaci.vrsta_pogona}',`;
    if (podaci.tezina_kg !== undefined)
        sqlPodaci += ` tezina_kg = ${podaci.tezina_kg},`;
    if (podaci.duljina_mm !== undefined)
        sqlPodaci += ` duljina_mm = ${podaci.duljina_mm},`;
    if (podaci.sirina_mm !== undefined)
        sqlPodaci += ` sirina_mm = ${podaci.sirina_mm},`;
    if (podaci.razmak_izmedu_kotaca_mm !== undefined)
        sqlPodaci += ` razmak_izmedu_kotaca_mm = ${podaci.razmak_izmedu_kotaca_mm},`;
    if (podaci.broj_pobjeda !== undefined)
        sqlPodaci += ` broj_pobjeda = ${podaci.broj_pobjeda},`;
    if (podaci.id_vozaca !== undefined)
        sqlPodaci += ` id_vozaca = ${podaci.id_vozaca},`;
    let sqlPodaci2 = sqlPodaci.slice(0, -1);
    sqlPodaci2 += ` WHERE id_auta = ${idAuta} RETURNING *`;
    try {
        const resultPodaci = (await db.query(sqlPodaci2, [])).rows;
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(400);
            return res.json({"status": "Bad request",
                                "message": "Nedostaju podaci o automobilu",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Podaci o automobilu azurirani",
                        response});
    } catch (err) {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Bad request",
                            "message": "Nedostaju podaci o automobilu",
                            "resposne": null});
    }
});

router.delete("/:id", async function (req, res, next) {
    const idAuta = req.params.id;
    const sqlPodaci = `DELETE FROM automobili WHERE id_auta = ${idAuta} RETURNING *`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        if (resultPodaci.length === 0) {
            res.status(404);
            return res.json({"status": "Not found",
                                "message": "Nepostoji automobil sa tim ID-om",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Zapis o automobilu izbrisan",
                        response});
    } catch (err) {
        res.type('application/json');
        res.status(404);
        return res.json({"status": "Not found",
                            "message": "Nepostoji automobil sa tim ID-om",
                            "resposne": null});
    }
});

router.all('/', function (req, res, next) {
    res.type('application/json');
    res.status(501);
    return res.json({"status": "Not implemented",
                        "message": "Metoda nije podrzana",
                        "resposne": null});

});

router.all('*', function (req, res, next) {
    res.type('application/json');
    res.status(404);
    return res.json({"status": "Not found",
                        "message": "Ne postoji nista na toj adresi",
                        "resposne": null});

});

module.exports = router;