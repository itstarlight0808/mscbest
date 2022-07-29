const express = require('express');
const path = require("path");
const userController = require("../controllers/userController");

const applyRoutes = app => {
    app.use("/api/users", userController);
    // app.use("/api/event", eventController);

    app.use(express.static(path.join(__dirname, '/../../uploads')));
    app.use(express.static(path.join(__dirname, '/../../public')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(`${__dirname}/../../public/index.html`));
    // });
}

module.exports = applyRoutes;