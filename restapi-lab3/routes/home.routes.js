const express = require("express");
const router = express.Router();
const db = require('../db');
const openapi = require('../openapi.json');

router.get("/", async function (req, res, next) {
    const sqlPodaci = `SELECT * FROM automobili NATURAL JOIN vozaci`;
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        const rawPodaci = JSON.stringify(resultPodaci);
        const response = JSON.parse(rawPodaci);
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "Svi automobili i vozaci",
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

router.get('/openapi', async function (req, res, next) {
    const rawPodaci = JSON.stringify(openapi);
    const response = JSON.parse(rawPodaci);
    if (response.length !== 0) {
        res.type('application/json');
        res.status(200);
        return res.json({"status": "OK",
                        "message": "OpenApi specifikacija",
                        response});
    } else {
        res.type('application/json');
        res.status(500);
        return res.json({"status": "Server error",
                            "message": "Greska na serveru",
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

module.exports = router