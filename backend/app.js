const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const user = require('./models/user');

//Se connecte à la BDD
mongoose.connect('mongodb+srv://aichou:mongomangue@cluster0.4vw3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

//Route post pour l'inscription
app.post('/api/auth/signup', (req, res, next) => {
    const User = new user({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Infos enregistré !' }))
        .catch(error => res.status(400).json({ error }));
    next();
});
/*app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
});*/

app.use('/api/auth', userRoutes);
module.exports = app;
