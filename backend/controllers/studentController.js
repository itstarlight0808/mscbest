const express = require("express");
const router = express.Router();
const db = require("../db");
const { isAuth } = require("../util");

router.post("/searchStudents", isAuth, async (req, res) => {
    console.log("***search students by email***")
    try {
        const searchStr = req.body.searchStr;
        let query = `SELECT id, email FROM users WHERE email LIKE "%${searchStr}%" ORDER BY email ASC`;
        console.log(query)

        const result = await db.selectRecords(query);

        res.send(result); 
    } catch(err) {
        res.status(500).send("Internal server error occurs");
        console.log(err);
    }
})

module.exports = router;