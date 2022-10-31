const express = require("express");
const router = express.Router();
const db = require("../db");
const { isAuth } = require("../util");
const studentModel = require("../models/studentModel");

router.post("/searchStudents", isAuth, async (req, res) => {
    console.log("***search students by email***")
    try {
        const searchStr = req.body.searchStr;
        const result = await studentModel.searchStudentsByEmail(searchStr);

        res.send(result); 
    } catch(err) {
        res.status(500).send("Internal server error occurs");
        console.log(err);
    }
})

router.get("/getMyTeachers", isAuth, async (req, res) => {
    console.log("***get my teacher info list***")
    const userId = req.user.id;
    try {
        const teachers = await studentModel.getMyTeachersByUserId(userId);
        res.send(teachers); 
    } catch(err) {
        res.status(500).send("Internal server error occurs");
        console.log(err);
    }
})

module.exports = router;