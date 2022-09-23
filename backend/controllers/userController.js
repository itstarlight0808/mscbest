const express = require('express');
const path = require("path");
const moment = require('moment');
const { getToken, isAuth, hashToken, compareToken, renderHtmlTemplate } = require('../util');
const sendEmail = require("../mail/index");
const db = require("../db");
const jsxNoBind = require('eslint-plugin-react/lib/rules/jsx-no-bind');

const router = express.Router();

router.put('/update', isAuth, async (req, res) => {
  const email = req.body.email;
  const [result, ] = await db.updateRecords("users", {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
  }, { email });

  if (result.affectedRows) {
    const [signinUser, ] = await db.selectRecords("SELECT * FROM users" + db.whereQuery({ email }));
    
    res.send({
      accountType: signinUser.accountType,
      firstName: signinUser.firstName,
      lastName: signinUser.lastName,
      email: signinUser.email,
      phoneNumber: signinUser.phoneNumber,
      isAdmin: signinUser.isAdmin,
      emailVerified: signinUser.emailVerified,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

router.post('/signin', async (req, res) => {
  let query = `SELECT * FROM users ` + db.whereQuery({ email: req.body.email });
  const result = await db.selectRecords(query);

  if (result.length && compareToken(req.body.password, result[0].password) && result[0].emailVerified ) {
    const signinUser = result[0];

    res.send({
      accountType: signinUser.accountType,
      firstName: signinUser.firstName,
      lastName: signinUser.lastName,
      email: signinUser.email,
      phoneNumber: signinUser.phoneNumber,
      isAdmin: signinUser.isAdmin,
      emailVerified: signinUser.emailVerified,
      token: getToken(signinUser),
    });
  } else if(result.length && !result[0].emailVerified) {
    res.status(401).send({ msg: "Your Email is not verified. Please check your inbox to verify your Email." });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

router.get('/testEmail', async (req, res) => {
  let emailData = {
    to: "stardev0824@gmail.com",
    subject: "Welcome to Musical World",
    text: "test test"
  };
  sendEmail(emailData).then(res => {
    res.send({ msg: "Email is sent " + res.response })
  }).catch(error => {
    res.send({ msg: error })
  });
})
router.post('/register', async (req, res) => {
  try {
    const user = {
      accountType: req.body.accountType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashToken(req.body.password),
      emailVerified: 0,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    const [result, ] = await db.insertRecords("users", user);
    console.log("register result", result)

    if (result.affectedRows) {
      user.id = result.insertId;

      let emailData = {
        to: user.email,
        subject: "Welcome to Musical World",
        html: renderHtmlTemplate("./mail/template/confirm_email.html", { id: user.id, token: hashToken(user.id + user.email)})
      };
      sendEmail(emailData).then(info => {
        res.send({
          registered: true,
        });
      }).catch(error => {
        res.status(500).send({ msg: "Email is not sent. " + JSON.stringify(error) });
      });
    } else {
      res.status(401).send({ msg: "Invalid User Data." });
    }
  } catch(e) {
    console.log(e)
    res.status(409).send({ msg: e.sqlMessage });
  }
});

router.get("/:id/email/verify/:token(([^/]+/?)*)", async (req, res) => {
  const token = req.params.token;
  const userId = req.params.id;
  console.log(token)
  try {
    const user = await db.selectRecords("SELECT * FROM users" + db.whereQuery({id: userId}));
    if(user.length && compareToken(user[0].id + user[0].email, token)) {
      const [result, ] = await db.updateRecords("users", { emailVerified: 1 }, {id: user[0].id});

      res.setHeader("Content-Security-Policy", "script-src 'nonce-abf4dd'")
      res.sendFile(path.join(__dirname, "../mail/template/verified.html"));
    }
    else {
      res.send({status: false, message: "Wrong user or token!"});
    }
  } catch (e) {
    res.send({status: false, message: "Email verfication failed!"});
  }
})

router.get('/createAdmin', async (req, res) => {
  try {
    const result = await db.insertRecords("users", {
      accountType: 3,
      firstName: "admin",
      lastName: "super",
      email: 'admin@example.com',
      password: hashToken('123456'),
      emailVerified: 1,
      isAdmin: 1,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    res.send({ status: true, message: "successfully created"});
  } catch (error) {
    console.log(error)
    res.send({ status: false, message: error.sqlMessage });
  }
});

module.exports = router;
