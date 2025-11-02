const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const db = require('./models');
const eventsRouter = require('./routes/events');

const app = express();
app.use(cors());
app.use(bodyParser());

app.use('/api/events', eventsRouter);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await db.sequelize.sync(); // create tables if missing
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Unable to start server', err);
  }
})();
