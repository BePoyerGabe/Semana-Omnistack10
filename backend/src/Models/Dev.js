const mongoose = require('mongoose');
const PointSchema = require('./utilis/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'         //precisa de indice, ajuda a busca
    }
})

module.exports = mongoose.model('Dev', DevSchema); //(salva no banco, qual o schema)