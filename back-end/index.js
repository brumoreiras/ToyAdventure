const express = require('express');
const cors = require('cors');

const routes = require('./rotas');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Substitua pelo seu frontend
    credentials: true,
  }));
app.use(routes);

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });

