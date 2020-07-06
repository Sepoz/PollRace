const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const poll = require('./routes/pollRoute.js');
const middleware = require('./middleware/erorrHandling.js');

const app = express();

app.use(helmet());
app.use(cors());
app.use('/api', poll);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = 3030;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});