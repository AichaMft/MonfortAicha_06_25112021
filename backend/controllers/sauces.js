const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({message: error }));
};
exports.modifySauce = (req, res) => {
    const sauceObjet = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(404).json({message: error }));
};

exports.deleteSauce = (req, res) => {
    //Trouver l'objet à supprimer
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //Extrait le nom du fichier 
            const filename = sauce.imageUrl.split('/images/')[1];
            //Supprimer le fichier
            fs.unlink(`images/${filename}`, () => {
                //Supprimer le fichier dans la bdd
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(404).json({message: error }));
            });
        })
        .catch(error => res.status(500).json({message: error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({message: error }));
};

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({message: error }));
};

exports.likes = (req, res) => {
    //Si like = 1, l'utilisateur aime (= like) la sauce
    if (req.body.like === 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } },
            { _id: req.params.id }
        )
            .then(() => res.status(200).json({ message: "J'aime" }))
            .catch((error) => res.status(400).json({message: error }));
        //si like est a -1, l'utilisateur n'aime pas (=dislike) la sauce
    } else if (req.body.like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } },
            { _id: req.params.id }
        )
            .then(() => res.status(200).json({ message: "Je n'aime pas" }))
            .catch((error) => res.status(400).json({message: error }));

    } else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                //si l'userId est présent dans le tableau usersLiked
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } },
                        { _id: req.params.id }
                    )
                        .then(() => res.status(200).json({ message: "Je n'aime plus" }))
                        .catch((error) => res.status(400).json({message: error }));
                    //si l'userId est présent dans le tableau usersDisliked   
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } },
                        { _id: req.params.id }
                    )
                        .then(() => res.status(200).json({ message: "J'aime encore" }))
                        .catch((error) => res.status(400).json({message: error }));
                }
            }
            )
            .catch((error) => res.status(400).json({message: error }));
    }
}

//L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié

