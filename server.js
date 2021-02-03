const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const models = require("./models");
const db = require("./config/db.config");

const Applicant = models.applicant;
const Role = models.role;

let corsOptions = {
    origin: "http://localhost:3001"
}

app.use(cors(corsOptions));

//Content type application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//Mongoose
models.mongoose.connect(`mongodb://localhost:27017/${db.DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
});
models.mongoose.connection.once("open", () => {
    console.log("MongoDB Connection established successfully");
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

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

//Edit Applicant
router.get('/edit/applicant/:id', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/admin/editapplicant.html'));
});

//Get All Applicants
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

//Get One Applicant by their id for edit
router.get('/api/applicant/:id', function (req, res) {
    const id = req.params.id;

    Applicant.findById(id, (err, applicant) => {
        res.json(applicant);
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

//Edit Applicant
router.put('/api/edit/:id', function (req, res) {

    Applicant.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            res.setHeader('Content-Type', 'text/html');
            res.status(200).redirect("/applicants");
        }
    })
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.use('/', router);
app.use('/register', router);
app.use('/home', router);
app.use('/job-postings', router);
app.use('/applicants', router);
app.use('/add', router);
app.use('/api/applicant', router);
app.use('/api/add', router);
app.use('/edit/applicant/:id', router);

let server = app.listen(3000, function() {
    console.log("App Server via Express is running on port 3000");
    console.log("To end, press Ctrl + C");
});