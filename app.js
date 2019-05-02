/* eslint-disable no-console */
const express = require('express');

const app = express();

const topicRoutes = require('./routes/topic');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/coverage', express.static('coverage'));
app.use('/', topicRoutes);

const PORT = 8888;
app.listen(process.env.PORT || PORT, () => { console.log(`App listening on port ${PORT}`); });

module.exports = app;
