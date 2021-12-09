const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema ({
    userId : {type:String, required:true },
    name : {type:String, required:true },
    manufacturer : {type:String, required:true },
    description : {type:String, required:true },
    mainPepper : {type:String, required:true }, 
    imageUrl : {type:String, required:true }, 
    heat : {type: Number, required:true },
    likes :{type: Number, required:true },
    dislikes : {type: Number, required:true },
    usersLiked : {type:Array, required:true }, //tableau des userId qui aiment
    usersDisliked : {type:Array, required:true },//tableau des userId qui n'aiment pas
});

module.exports = mongoose.model('Sauce', saucesSchema);