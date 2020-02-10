const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {  //coluna
    type: String,
    enum: ['Point'], //não consigo passar Point no type
    required: true,
},
   coordinates:{
       type: [Number],  //[long, lat]
       required: true,
   },

});

module.exports = PointSchema;