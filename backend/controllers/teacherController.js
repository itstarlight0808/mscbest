const express = require("express");
const router = express.Router();
const db = require("../db");
const { isAuth } = require("../util");

router.get("/getMyStudents", isAuth, async (req, res) => {
    console.log("***get my students***")
    try {
        const userId = req.user.id;
        let query = `SELECT tdb.id, CONCAT(ur.firstName, ' ', ur.lastName) AS name, ur.email, cg.price, ur.createdAt, cg.name AS groupName, tdb.status  FROM teacher_studentdb AS tdb
            LEFT JOIN users AS ur ON tdb.studentId=ur.id
            LEFT JOIN class_groups AS cg ON tdb.groupId=cg.id` + db.whereQuery({ "tdb.teacherId": userId });
        let students = await db.selectRecords(query);

        res.send(students);
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
