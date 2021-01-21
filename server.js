const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const Applicant = require("./models/Applicant");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/r2engine", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB Connection established successfully");
});

//Login
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/auth/login.html'));
});

//Register
router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/auth/register.html'));
});

//Home Dashboard
router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/admin/index.html'));
});

//Job Postings
router.get('/job-postings', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/admin/job-postings.html'));
});

//Applicants
router.get('/applicants', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/admin/applicants.html'));
});

//Add Applicant
router.get('/add', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/admin/addapplicant.html'));
});

//Get Applicants
router.get('/api/applicant', function (req, res) {
    //Query database
    Applicant.find((err, applicant) => {
        if(err) {
            console.log(err);
        } else {
            res.json(applicant);
        }
    });
});

//Add Applicant
router.post('/api/add', function (req, res) {
// console.log(req.body)
    const applicant = new Applicant(req.body);
// console.log(applicant)
    applicant.save().then((applicant) => {
        res.json(applicant)
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err.message);
    });
});

app.use('/', router);
app.use('/register', router);
app.use('/home', router);
app.use('/job-postings', router);
app.use('/applicants', router);
app.use('/add', router);
app.use('/api/applicant', router);
app.use('/api/add', router);

let server = app.listen(3000, function() {
    console.log("App Server via Express is running on port 3000");
    console.log("To end, press Ctrl + C");
});