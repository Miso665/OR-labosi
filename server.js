const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const db = require('./db')

const homeRouter = require('./routes/home.routes');
const datatableRouter = require('./routes/datatable.routes');

const { pool } = require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRouter);
app.use('/datatable', datatableRouter);

app.listen(3000);