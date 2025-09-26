const mongoose = require('mongoose');

const Movieschema = new mongoose.Schema({
    title: { type: String },
    disc: { type: String }
})

const Movie = mongoose.model('movies', Movieschema,'moviess')
module.exports = Movie;
