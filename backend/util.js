const config = require('./config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require("path");
const handlebars = require("handlebars");
const bcrypt = require("bcryptjs");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

const hashToken = str => {
  return bcrypt.hashSync(str, config.bcryptSalt);
}
const compareToken = (str, hash) => {
  return bcrypt.compareSync(str, hash);
}

const renderHtmlTemplate = (filepath, params) => {
  filepath = path.join(__dirname, filepath);
  const source = fs.readFileSync(filepath, "utf-8").toString();
  const template = handlebars.compile(source);
  
  console.log(params)
  console.log(template(params))

  return template(params);
}

module.exports = { getToken, isAuth, isAdmin, hashToken, compareToken, renderHtmlTemplate };
