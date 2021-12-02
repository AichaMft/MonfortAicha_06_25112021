const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
//Trouver l'objet à supprimer
    Sauce.findOne({_id: req.params.id })
    .then(sauce => {
//Extrait le nom du fichier 
        const filename = sauce.imageUrl.split('/images/')[1];
//Supprimer le fichier
        fs.unlink(`images/${filename}`, () => {
//Supprimer le fichier dans la bdd
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauces suppriméé!' }))
                .catch(error => res.status(404).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.likes = (req, res, next) => {
    //condition
    console.log(req.body)
}
//Si like = 1, l'utilisateur aime (= like) la sauce
//Si like = 0, l'utilisateur annule son like ou son dislike. 
//Si like = -1, l'utilisateur n'aime pas (=dislike) la sauce
//L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié
//un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce
