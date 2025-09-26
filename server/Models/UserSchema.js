const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //store as json
    userendpoint: { type: Object },
})

const Endpoint = mongoose.model('Endpoint', UserSchema, 'endpoints');
module.exports = Endpoint;
