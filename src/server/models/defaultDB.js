const mongoose = require('mongoose');
const { Schema } = mongoose;

var collectionName = 'Mario_World';

const MarioSchema = new Schema(
    {
        name: {
            type: String
        },
        power: {
            type: Number
        },
        life: {
            type: Number
        },
        document:{
            type:String
        }
    },
    {
        collection: collectionName
    },
    {
        versionKey: false
    }
);

const Mario = mongoose.model(collectionName, MarioSchema);

module.exports = Mario;