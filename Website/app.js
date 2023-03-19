const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const admin = require("firebase-admin");
const credentials = require("./key.json");
const { async } = require('@firebase/util');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/about", function(req, res) {
    res.render("about-us")
});

app.get("/contact", function(req, res) {
    res.render("contact-us")
});

app.get("/login", function(req, res) {
    res.render("login")
});

app.get("/registration", function(req, res) {
    res.render("registration")
});

app.get("/register", function(req, res){
    res.redirect("/")
});

const patientDetails = []

app.post("/register", async function(req, res) {
    try {
        console.log(req.body);
        const patientJson = {
            title: req.body.title,
            patientName: req.body.patientName,
            gender: req.body.gender,
            martialStatus: req.body.martialStatus,
            birthday: req.body.birthday,
            nationality: req.body.nationality,
            religion: req.body.religion,
            patientOccupation: req.body.patientOccupation,
            relativeName: req.body.relativeName,
            relation: req.body.relation,
        }
        patientDetails.push(patientJson)
        const response = db.collection("patients").add(patientJson);
        alert("Successfully Registered.")
        res.redirect("/");
    } catch(error) {
        res.send(error);
    }
});

app.listen(3000, function() {
    console.log("Server has started on port 3000")
});
