const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

/* Config DataBase */ 
const DB_USER = 'dba-marcoantonio';
const PASSWORD = encodeURIComponent('@Mapabo10');
const DB_URL = `mongodb://${DB_USER}:${PASSWORD}@ds119085.mlab.com:19085/goweek-marcoantonio`;



mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, 
    {
        useNewUrlParser: true
    }
);

/* Middleware */
app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});