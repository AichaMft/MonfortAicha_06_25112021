const Sauces = require('../models/sauces');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
    next();
};
exports.modifyThing = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(404).json({ error }));
    next();
};

exports.deleteThing = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauces suppriméé!' }))
        .catch(error => res.status(404).json({ error }));
    next();
};

exports.getOneThing = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
    next();
};

exports.getAllThings = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};