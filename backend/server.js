const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { applyRoutes } = require("./routes/index");
const config = require("./config");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");

  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
    });
  }
  else
    next();
})

applyRoutes(app);

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
