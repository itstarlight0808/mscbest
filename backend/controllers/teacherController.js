const express = require("express");
const router = express.Router();
const db = require("../db");
const { isAuth } = require("../util");

router.get("/getMyStudents", isAuth, async (req, res) => {
    console.log("***get my students***")
    try {
        const userId = req.user.id;
        let query = `SELECT tdb.id, tdb.studentId, cg.id AS groupId, CONCAT(ur.firstName, ' ', ur.lastName) AS name, ur.email, cg.price, ur.createdAt, cg.name AS groupName, tdb.status  FROM teacher_studentdb AS tdb
            LEFT JOIN users AS ur ON tdb.studentId=ur.id
            LEFT JOIN class_groups AS cg ON tdb.groupId=cg.id` + db.whereQuery({ "tdb.teacherId": userId });
        let students = await db.selectRecords(query);

        res.send(students);
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})

router.post("/addMyStudent", isAuth, async (req, res) => {
    console.log("***Add my Student***")
    try {
        const { studentId, groupId, status } = req.body;
        const userId = req.user.id;

        let [result, ] = await db.insertRecords("teacher_studentdb", { teacherId: userId, studentId, groupId, status });

        res.send();
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})

router.post("/updateMyStudent", isAuth, async (req, res) => {
    console.log("***Update my Student***")
    try {
        const { id, studentId, groupId, status } = req.body;

        let [result, ] = await db.updateRecords("teacher_studentdb", { studentId, groupId, status }, { id });

        res.send();
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})

router.post("/deleteMyStudents", isAuth, async (req, res) => {
    console.log("***delete my students***")
    try {
        const ids = req.body.ids;
        let [result, ] = await db.deleteRecords("teacher_studentdb", ` WHERE id IN (${ ids.join(", ") })`);

        res.send();
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})

router.get("/getAllClassGroups", isAuth, async (req, res) => {
    console.log("***get teacher's all class group-price pair'***")
    try {
        let teacherId = req.user.id;
        let query = `SELECT cg.* FROM classes AS cl
            LEFT JOIN class_groups AS cg ON cl.id=cg.classId` + db.whereQuery({ "cl.teacherId": teacherId }) + ` GROUP BY cg.name, cg.price`;
        let result = await db.selectRecords(query);

        res.send(result);
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})

router.get("/:id", async (req, res) => {
    console.log("***get teacher Info***")
    try {
        let id = req.params.id;
        let query = "SELECT firstName, lastName, avatar FROM users" + db.whereQuery({ id });
        let teacher = await db.selectRecords(query);

        res.send(teacher);
    } catch(err) {
        res.status(500).send("Internal Server Error Occurs!");
    }
})


module.exports = router;
