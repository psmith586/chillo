//helper functions to encrypt passwords
const bcrypt = require('bcrypt');

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//local is the user input, password is from db record
const validatePassword = (localPW, password) => {
  return bcrypt.compareSync(password, localPW);
};

module.exports = { generateHash, validatePassword }; 

