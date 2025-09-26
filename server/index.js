const express = require('express');
const cors = require('cors');
const app = express();
const webpush = require('web-push')
const mongoose = require('mongoose');
const Endpoint = require("./Models/UserSchema")
const Movie = require("./Models/movieSchema")
require('dotenv').config();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

//db connection
mongoose.connect(process.env.REACT_MONGO_URI).then(() =>
    console.log("DB connected")
).catch((err) =>
    console.log("connection error", err)
)

const endpoints = Endpoint;
const movies = Movie;

const vapidkeys = {
    publicKey: 'BF0o8cOxmmsk02VTOkaJ235V5qGxJsC_B1-Y4q5HLBEOZt8-g0Tuelum1m49T493AUq6lKGKkORzEDMb6AAm3uM',
    privateKey: 'QzuerJwlnuwC_3BFvc-ckpKUBz6fNJSKU6lk30lICLE'
}

webpush.setVapidDetails('mailto:jayaprakash96030@gmail.com', vapidkeys.publicKey, vapidkeys.privateKey)
let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/dbErXFgQYmA:APA91bGbp3CApEPSDsfmCExmZV1y6UPLkOE00TuO6bo_0NIIgdZGj-5AFCfBz8stoiUkfZJxwUBvKp2aQmG8wp3ouARss7OYA8YQUuNgZNGNqUknG4rYzpcJ3f5xIiH_gDcqm3mfKcnE","expirationTime":null,"keys":{"p256dh":"BOugYna-QqSUfjGdY7v0BAdK54YHbo0RY28doLh-9oBBmZ0kzWlY-Ng43zwHt5ImSX7eQF-xnZhk4LQKHJQiQiU","auth":"-ZQ509ouIMd2sGPGYLUYeg"}}
app.post('/', async (req, res) => {
    const { title, disc, Ep } = req.body;
    console.log(title);
    console.log(disc);
    // console.log(Ep);
    const newMovie = new movies({ title, disc })
    const movie = await endpoints.findOne({ title })
    if (movie) {
        res.status(400).json({ message: "ep_exists" })
    } else {
        await newMovie.save();
    }
    const newep = new endpoints({ userendpoint: Ep })
    const ep = await endpoints.findOne({ Ep })
    if (ep) {
        res.status(400).json({ message: "ep_exists" })
    } else {
        await newep.save();
    }
    const payload = JSON.stringify({
        title: title,
        body: disc,
        icon: '/icon.png',
        url: 'https://www.youtube.com'
    });
    await webpush.sendNotification(Ep, payload)
        .then(() => res.json({ success: true }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Notification failed" });
        });
})

app.listen(8000, () => {
    console.log("Server has been started at port 8000")
})