const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            console.log('save new user')
            .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
            .catch((error) => res.status(401).json({ message: error }));
    })
        .catch((error) => res.status(500).json({message: error }));
};


exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur inconnu !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn:'24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({message: error }));
        })
        .catch(error => res.status(500).json({error }));
};
console.log('ici après login');