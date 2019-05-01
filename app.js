const express = require('express');
const app = express();

const topic = require('./routes/topic');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', topic);

const PORT = 8888;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

module.exports = app;