const express = require('express');
const app = express();
const http = require('http').Server(app);

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public/'));
//app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/user'))

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

