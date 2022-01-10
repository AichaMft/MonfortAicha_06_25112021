const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)   //caracteres minimum                                 
.is().max(25)     //caractère maximum                             
.has().uppercase()   //majuscule                           
.has().lowercase()      //minuscule                       
.has().digits()          //chiffre                      
.has().not().spaces()      //pas d'espaces              

module.exports = passwordSchema;