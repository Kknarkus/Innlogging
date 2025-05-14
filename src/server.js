const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./v1/Routes'); // ← OBS: ikke ./src/v1/routes
require('dotenv').config({ path: '../.env' }); // ← peker opp ett nivå

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/v1', routes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
