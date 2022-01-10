const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const fs = require('fs');
const { Parser } = require('json2csv');
const db = require('../db');



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'W735xgAW4YaJ2bmpabpRffWtNlefm1KUQ-FNIFgBcbV5FJdFbDCCiF1QFI3fTCIY',
  baseURL: 'http://localhost:3000',
  clientID: 'T9H9p7ij6kX0fKiUqNI1TVVTfddi2zFZ',
  issuerBaseURL: 'https://dev-h3vlq311.eu.auth0.com'
};

 router.use(auth(config));

 router.get('/profile', (req, res) => {
    if(req.oidc.user === undefined){
        res.send("Pristup nije dozovljen jer niste prijavljeni.")
    }
    else{
    res.render('profile', {
      title: "Profile - " + req.oidc.user.nickname,
      data: req.oidc.user
    });
    }
 });

 router.get('/update', async function (req, res, next) {
    if(req.oidc.user === undefined){
        res.send("Pristup nije dozovljen jer niste prijavljeni.")
    } else {
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

            fs.writeFile('./WRCautomobili.json', JSON.stringify(resultPodaci, null, 3), (err) => {
                if(err){
                    console.log(err);
                }
            });
            const parser = new Parser({
                escapedQuote: '\"'
            });
            try{
                let csvFile = parser.parse(resultPodaci);
                fs.writeFile('./WRCautomobili.csv', csvFile,(err) => {
                    if(err){
                        console.log(err);
                    }
                });
           }
            catch(err){
                console.log(err);
            }
            res.render('updated');
        
        } catch (err) {
            console.log(err);
        }
    }

});

 router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Main page',
        linkActive: 'home',
        data: req.oidc.user
    });
});


// auth router attaches /login, /logout, and /callback routes to the baseURL
/*app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
*/
module.exports = router;