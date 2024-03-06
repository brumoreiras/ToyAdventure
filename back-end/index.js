const express = require('express');

const routes = require('./rotas');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });

