const express = require('express');
const app = express();
const PORT = (process.env.PORT || 8080);
const path = require("path")
const path = require("path")

require('dotenv').config();
console.log(require('dotenv').config());

const mongoose = require('mongoose');
const eJwt = require('express-jwt');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    if ('OPTIONS' === req.method) {
        console.log("Allowing OPTIONS");
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/', express.static(path.join(__dirname, 'build')));


/*** Database ***/
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', function() {
    console.log("MongoDB connected")
});

/*** API ***/
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});

const jobs = require('./models/job.model');

app.post('/get-filters', (req, res) => {
    jobs.find()
        .then(jobs => res.json(jobs))
});

app.post('/get-filtered-jobs', (req, res) => {
    console.log(req.body.filters);
    jobs.find({
        $or:[
            { category: { $in: req.body.filters }}, { area: { $in: req.body.filters }}
        ]})
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
        });
});


app.post('/', (req, res) => {
    jobs.find()
            .then(jobs => res.json(jobs))

});

app.get('/add-job', eJwt({secret: process.env.JWT_SECRET}), (req, res) => {
    res.send('Access granted');
});

app.post('/add-job', (req, res) => {
    let newJob = new jobs({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        area: req.body.area
    });

    newJob
        .save()
        .then(answer => res.json(answer));
});

/****** Routes ******/
let loginRouter = require('./routers/login_router');
app.use('/users', loginRouter);



app.use((err, req, res, next) => {
    console.log("Error status: " + err.status);
    if (err.status == 401) {
        res.redirect('/users/Login');
    }
});
