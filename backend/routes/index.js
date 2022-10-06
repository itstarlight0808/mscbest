const express = require('express');
const path = require("path");
const settingController = require("../controllers/settingController");
const userController = require("../controllers/userController");
const notificationController = require("../controllers/notificationController");
const classesController = require("../controllers/classesController");
const teacherController = require("../controllers/teacherController");
const studentController = require("../controllers/studentController");

const applyRoutes = app => {
    app.use("/api/settings", settingController);
    app.use("/api/users", userController);
    app.use("/api/notifications", notificationController);
    app.use("/api/classes", classesController);
    app.use("/api/teachers", teacherController);
    app.use("/api/students", studentController);

    app.use(express.static(path.join(__dirname, '/../../static')));
    app.use(express.static(path.join(__dirname, '/../../public')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(`${__dirname}/../../public/index.html`));
    // });
}

module.exports = { applyRoutes };