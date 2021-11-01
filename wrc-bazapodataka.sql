CREATE TABLE vozaci (
	Id_vozaca INTEGER PRIMARY KEY,
	Ime_vozaca VARCHAR(20),
	Prezime_vozaca VARCHAR(20)
);

INSERT INTO vozaci
VALUES (100, 'Kris', 'Meeke'),
(101, 'Sebastien', 'Loeb'),
(102, 'Sebastien', 'Ogier'),
(103, 'Julien', 'Ingrassia'),
(104, 'Ott', 'Tanak'),
(105, 'Elfyn', 'Evans'),
(106, 'Thierry', 'Neuville'),
(107, 'Dani', 'Sordo'),
(108, 'Valeriy', 'Gorban'),
(109, 'Tommi', 'Makinen'),
(110, 'Alister', 'McRae'),
(111, 'Nicolas', 'Bernardi'),
(112, 'Daniel', 'Carlsson'),
(113, 'Didier', 'Auriol'),
(114, 'Gwyndaf', 'Evans'),
(115, 'Alexandre', 'Bengue'),
(116, 'Kenneth', 'Eriksson'),
(117, 'Toshiro', 'Arai'),
(118, 'Chris', 'Atkinson'),
(119, 'Per-Gunnar', 'Andersson'),
(120, 'Martin', 'Jarveoja'),
(121, 'Kalle', 'Rovanpera'),
(122, 'Jari-Matti', 'Latvala'),
(123, 'Andreas', 'Mikkelsen');

CREATE TABLE automobili (
	Id_auta INTEGER PRIMARY KEY,
	Model VARCHAR(30),
	Proizvodac VARCHAR(15),
	Velicina_motora_l DECIMAL(3,2),
	Broj_brzina INTEGER,
	Vrsta_pogona VARCHAR(15),
	Tezina_kg INTEGER,
	Duljina_mm INTEGER,
	Sirina_mm INTEGER,
	Razmak_izmedu_kotaca_mm INTEGER,
	Broj_pobjeda INTEGER,
	Id_vozaca INTEGER NOT NULL,
	FOREIGN KEY (Id_vozaca) REFERENCES vozaci(Id_vozaca)
);

INSERT INTO automobili
VALUES (1000, 'C3 WRC', 'Citroen', 1.60, 6, 'sva četiri', 1190, 4128, 1875, 2540, 6, 101),
(1001, 'C3 WRC', 'Citroen', 1.60, 6, 'sva četiri', 1190, 4128, 1875, 2540, 6, 100),
(1002, 'Fiesta WRC', 'Ford', 1.59, 6, 'sva četiri', 1190, 4130, 1875, 2493, 9, 102),
(1003, 'Fiesta WRC', 'Ford', 1.59, 6, 'sva četiri', 1190, 4130, 1875, 2493, 9, 104),
(1004, 'Fiesta WRC', 'Ford', 1.59, 6, 'sva četiri', 1190, 4130, 1875, 2493, 9, 105),
(1005, 'i20 Coupe WRC', 'Hyundai', 1.59, 6, 'sva četiri', 1190, 4100, 1875, 2570, 17, 102),
(1006, 'i20 Coupe WRC', 'Hyundai', 1.59, 6, 'sva četiri', 1190, 4100, 1875, 2570, 17, 106),
(1007, 'i20 Coupe WRC', 'Hyundai', 1.59, 6, 'sva četiri', 1190, 4100, 1875, 2570, 17, 104),
(1008, 'i20 Coupe WRC', 'Hyundai', 1.59, 6, 'sva četiri', 1190, 4100, 1875, 2570, 17, 107),
(1009, 'John Cooper Works WRC', 'Mini', 1.60, 6, 'sva četiri', 1200, 4110, 1820, 2480, 7, 108),
(1010, 'John Cooper Works WRC', 'Mini', 1.60, 6, 'sva četiri', 1200, 4110, 1820, 2480, 7, 107),
(1011, 'John Cooper Works WRC', 'Mini', 1.60, 6, 'sva četiri', 1200, 4110, 1820, 2480, 7, 100),
(1012, 'Lancer Evolution WRC', 'Mitsubishi', 2.00, 5, 'sva četiri', 1230, 4360, 1800, 2600, 2, 109),
(1013, 'Lancer Evolution WRC', 'Mitsubishi', 2.00, 5, 'sva četiri', 1230, 4360, 1800, 2600, 2, 110),
(1014, '307 WRC', 'Peugeot', 1.99, 5, 'sva četiri', 1230, 4344, 1770, 2610, 3, 111),
(1015, '307 WRC', 'Peugeot', 1.99, 5, 'sva četiri', 1230, 4344, 1770, 2610, 3, 112),
(1016, 'Cordoba WRC', 'Seat', 1.99, 6, 'sva četiri', 1230, 4172, 1770, 2443, 0, 113),
(1017, 'Cordoba WRC', 'Seat', 1.99, 6, 'sva četiri', 1230, 4172, 1770, 2443, 0, 114),
(1018, 'Fabia WRC', 'Škoda', 1.98, 6, 'sva četiri', 1230, 4002, 1770, 2462, 0, 113),
(1019, 'Fabia WRC', 'Škoda', 1.98, 6, 'sva četiri', 1230, 4002, 1770, 2462, 0, 115),
(1020, 'Fabia WRC', 'Škoda', 1.98, 6, 'sva četiri', 1230, 4002, 1770, 2462, 0, 116),
(1021, 'Impreza WRC', 'Subaru', 1.99, 6, 'sva četiri', 1230, 4340, 1770, 2635, 46, 117),
(1022, 'Impreza WRC', 'Subaru', 1.99, 6, 'sva četiri', 1230, 4340, 1770, 2635, 46, 118),
(1023, 'Impreza WRC', 'Subaru', 1.99, 6, 'sva četiri', 1230, 4340, 1770, 2635, 46, 116),
(1024, 'Impreza WRC', 'Subaru', 1.99, 6, 'sva četiri', 1230, 4340, 1770, 2635, 46, 109),
(1025, 'SX4 WRC', 'Suzuki', 1.99, 5, 'sva četiri', 1230, 4135, 1770, 2550, 0, 119),
(1026, 'SX4 WRC', 'Suzuki', 1.99, 5, 'sva četiri', 1230, 4135, 1770, 2550, 0, 111),
(1027, 'Yaris WRC', 'Toyota', 1.60, 6, 'sva četiri', 1190, 4085, 1875, 2511, 25, 104),
(1028, 'Yaris WRC', 'Toyota', 1.60, 6, 'sva četiri', 1190, 4085, 1875, 2511, 25, 122),
(1029, 'Yaris WRC', 'Toyota', 1.60, 6, 'sva četiri', 1190, 4085, 1875, 2511, 25, 105),
(1030, 'Yaris WRC', 'Toyota', 1.60, 6, 'sva četiri', 1190, 4085, 1875, 2511, 25, 102),
(1031, 'Polo R WRC', 'Volkswagen', 1.60, 6, 'sva četiri', 1200, 3976, 1820, 2480, 43, 103),
(1032, 'Polo R WRC', 'Volkswagen', 1.60, 6, 'sva četiri', 1200, 3976, 1820, 2480, 43, 102),
(1033, 'Polo R WRC', 'Volkswagen', 1.60, 6, 'sva četiri', 1200, 3976, 1820, 2480, 43, 122),
(1034, 'Polo R WRC', 'Volkswagen', 1.60, 6, 'sva četiri', 1200, 3976, 1820, 2480, 43, 123);

COPY (SELECT model "Model", proizvodac "Proizvođač", velicina_motora_l "Veličina motora u l", broj_brzina "Broj brzina", 
	  vrsta_pogona "Vrsta pogona", tezina_kg "Težina u kg", duljina_mm "Duljina u mm", sirina_mm "Širina u mm", 
	  razmak_izmedu_kotaca_mm "Razmak između kotača u mm", broj_pobjeda "Broj pobjeda", 
	  string_agg(ime_vozaca || ' ' || prezime_vozaca, ';') as "Vozači"
	  FROM automobili NATURAL JOIN vozaci 
	  GROUP BY id_auta
	  ORDER BY id_auta) 
	  TO 'D:\wrc.csv' DELIMITER ',' CSV HEADER;

COPY(SELECT array_to_json(array_agg(row_to_json(t))) FROM (
        SELECT model "Model", proizvodac "Proizvođač", velicina_motora_l "Veličina motora u l", broj_brzina "Broj brzina", 
	  		vrsta_pogona "Vrsta pogona", tezina_kg "Težina u kg", duljina_mm "Duljina u mm", sirina_mm "Širina u mm", 
		  	razmak_izmedu_kotaca_mm "Razmak između kotača u mm", broj_pobjeda "Broj pobjeda",
            json_agg(json_build_object(
                            'Ime', vozaci.Ime_vozaca, 'Prezime', vozaci.Prezime_vozaca)) "Vozači"
        FROM automobili NATURAL JOIN vozaci
		GROUP BY id_auta
		ORDER BY id_auta
        ) t)
TO 'D:\wrc.json';
