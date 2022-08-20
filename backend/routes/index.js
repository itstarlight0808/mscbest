const express = require('express');
const path = require("path");
const userController = require("../controllers/userController");
const classesController = require("../controllers/classesController");

const applyRoutes = app => {
    app.use("/api/users", userController);
    app.use("/api/classes", classesController);

    app.use(express.static(path.join(__dirname, '/../../static')));
    app.use(express.static(path.join(__dirname, '/../../public')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(`${__dirname}/../../public/index.html`));
    // });
}

module.exports = { applyRoutes };