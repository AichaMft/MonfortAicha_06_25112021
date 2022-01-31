const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema ({
    userId : {type:String},
    name : {type:String},
    manufacturer : {type:String},
    description : {type:String},
    mainPepper : {type:String}, 
    imageUrl : {type:String}, 
    heat : {type: Number},
    likes :{type: Number},
    dislikes : {type: Number},
    usersLiked : {type:Array}, //tableau des userId qui aiment
    usersDisliked : {type:Array},//tableau des userId qui n'aiment pas
});

module.exports = mongoose.model('Sauce', saucesSchema);