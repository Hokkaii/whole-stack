const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        descrition: { type: String },
        tips: { type: String }
    }],
    luckyItems: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    unluckyItems: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [
        {
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            descrition: { type: String }
        }
    ]
})
module.exports = mongoose.model('Hero', schema)