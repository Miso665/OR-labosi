const express = require("express");
const router = express.Router();
const db = require('../db');

router.get("/", async function (req, res, next) {;
    const sqlPodaci = `SELECT * FROM vozaci`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Svi vozaci",
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
    const idVozaca = req.params.id;
    const sqlPodaci = `SELECT * FROM vozaci WHERE id_vozaca = ${idVozaca}`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(404);
            return res.json({"status": "Not found",
                                "message": "Nepostoji vozac sa tim ID-om",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Podaci o odredenim vozacima",
                        response});
    } catch (err) {
        console.error(err.message);
        res.type('application/json');
        res.status(404);
        return res.json({"status": "Not found",
                            "message": "Nepostoji vozac sa tim ID-om",
                            "resposne": null});
    }
});

router.post("/", async function (req, res, next) {
    const podaci = req.body;
    if (podaci.id_vozaca !== undefined && podaci.ime_vozaca !== undefined && podaci.prezime_vozaca !== undefined) {
        const sqlPodaci = `INSERT INTO vozaci VALUES(${podaci.id_vozaca}, '${podaci.ime_vozaca}', '${podaci.prezime_vozaca}') RETURNING *`;
        try {
            const resultPodaci = (await db.query(sqlPodaci, [])).rows;
            if (resultPodaci.length === 0) {
                res.type('application/json');
                res.status(400);
                return res.json({"status": "Bad request",
                                    "message": "Nedostaju podaci o vozacu",
                                    "resposne": null});
            }
            const rawPodaci = JSON.stringify(resultPodaci);
            const response = JSON.parse(rawPodaci);
            res.type('application/json');
            res.status(201);
            return res.json({"status": "Created",
                            "message": "Dodan vozac",
                            response});
        } catch (err) {
            res.type('application/json');
            res.status(400);
            return res.json({"status": "Bad request",
                                "message": "Nedostaju podaci o vozacu",
                                "resposne": null});
        }
        
    } else {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Bad request",
                            "message": "Nedostaju podaci o vozacu",
                            "resposne": null});
    }
    
});

router.put("/:id", async function (req, res, next) {
    const idVozaca = req.params.id;
    const podaci = req.body;
    let sqlPodaci;
    if (podaci.ime_vozaca !== undefined && podaci.prezime_vozaca !== undefined) 
        sqlPodaci = `UPDATE vozaci SET ime_vozaca = '${podaci.ime_vozaca}', prezime_vozaca = '${podaci.prezime_vozaca}' WHERE id_vozaca = ${idVozaca} RETURNING *`;
    else if (podaci.ime_vozaca !== undefined) 
        sqlPodaci = `UPDATE vozaci SET ime_vozaca = '${podaci.ime_vozaca}' WHERE id_vozaca = ${idVozaca} RETURNING *`;
    else if (podaci.prezime_vozaca !== undefined) 
        sqlPodaci = `UPDATE vozaci SET prezime_vozaca = '${podaci.prezime_vozaca}' WHERE id_vozaca = ${idVozaca} RETURNING *`;
    else {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Bad request",
                            "message": "Nedostaju podaci o vozacu",
                            "resposne": null});
    }
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(400);
            return res.json({"status": "Bad request",
                                "message": "Nedostaju podaci o vozacu",
                                "resposne": null});
        }
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Podaci o vozacu azurirani",
                        response});
    } catch (err) {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Bad request",
                            "message": "Nedostaju podaci o vozacu",
                            "resposne": null});
    }
});

router.delete("/:id", async function (req, res, next) {
    const idVozaca = req.params.id;
    const sqlPodaci = `DELETE FROM vozaci WHERE id_vozaca = ${idVozaca} RETURNING *`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        if (resultPodaci.length === 0) {
            res.type('application/json');
            res.status(404);
            return res.json({"status": "Not found",
                                "message": "Ne postoji vozac sa tim ID-om",
                                "resposne": null});
        }
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Zapis o vozacu izbrisan",
                        response});
    } catch (err) {
        res.type('application/json');
        res.status(400);
        return res.json({"status": "Not found",
                            "message": "Ne postoji vozac sa tim ID-om",
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