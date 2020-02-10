const Dev = require('../Models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req,res){
        //buscar devs num raio 10km
        //filtrar por techs
        const {latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //operador lógico do mongodb
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //metros
                }
            },
        });

        return res.json({ devs });
    }
}