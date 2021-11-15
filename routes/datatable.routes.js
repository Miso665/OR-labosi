const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async function (req, res, next) {
    const sqlPodaci = `SELECT * FROM automobili NATURAL JOIN vozaci`;
    /**const sqlPodaci = `SELECT array_to_json(array_agg(row_to_json(t))) FROM (
            SELECT model "Model", proizvodac "Proizvođač", velicina_motora_l "Veličina motora u l", broj_brzina "Broj brzina", 
	  		vrsta_pogona "Vrsta pogona", tezina_kg "Težina u kg", duljina_mm "Duljina u mm", sirina_mm "Širina u mm", 
		  	razmak_izmedu_kotaca_mm "Razmak između kotača u mm", broj_pobjeda "Broj pobjeda",
            json_agg(json_build_object(
                            'Ime', vozaci.Ime_vozaca, 'Prezime', vozaci.Prezime_vozaca)) "Vozači"
        FROM automobili NATURAL JOIN vozaci
		GROUP BY id_auta
		ORDER BY id_auta
        ) t`;**/
    try {
        const resultPodaci = (await db.query(sqlPodaci, [])).rows;
        const rawPodaci = JSON.stringify(resultPodaci)
        const jsonPodaci = JSON.parse(rawPodaci);

        //console.log(jsonPodaci[1].id_vozaca);
        res.render('datatable', {
            title: 'Skup podataka',
            podaci: jsonPodaci,
            linkActive: 'datatable'
        });
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;