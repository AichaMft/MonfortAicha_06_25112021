module.exports = (req, res, next) => {
    const emailValidator = (email) => {
        let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let isRegexTrue = emailRegexp.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: 'Veuillez entrer un email valide' });
    }
    emailValidator(req.body.email);
    console.log('email validator')
  };