const express = require('express');
const app = express();

const routers = {
    '/automobili': require('./routes/automobili.routes'),
    '/vozaci': require('./routes/vozaci.routes'),
    '/': require('./routes/home.routes')
};

app.use(express.json());

for (const path in routers) {
    app.use(path, routers[path]);
}

//pokretanje poslužitelja na portu 5000
app.listen(5000, () => {
    console.log(`Server na portu 5000`);
});