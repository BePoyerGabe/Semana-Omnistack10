const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../Models/Dev');
const { findConnections, sendMessage } = require('../WebSocket');

//funções controller index, show, store, update, destroy

module.exports = {
    async index(req,res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req,res) {//param são fixos ------- no plural(devs)
        const { github_username, techs, latitude, longitude} = req.body;
        
        //evitar duplicata
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`); //pode demorar
        
            const {name = login, avatar_url, bio} = apiRes.data; //se não tiver name usa o login que é obrigatório
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point', //ponto no mapa x,y
                coordinates: [longitude, latitude],
            };
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            
            //Filtrar conexões 10km e tem uma tech
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        
        return res.json(dev);
    },

    async update() {

    },

    async destroy() {

    },
};