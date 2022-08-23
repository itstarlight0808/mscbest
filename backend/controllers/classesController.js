const express = require("express");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
const config = require("../config");
const {isAdmin, isAuth, upload} = require("../util");
const db = require("../db");

router.get('/', isAuth,  async (req, res) => {
    try {
        let query = "SELECT * FROM classes " + db.whereQuery({ teacherId: req.user.id });
        let classList = await db.selectRecords(query);
        query = "SELECT * FROM class_groups";
        let classGroupList = await db.selectRecords(query);
        query = "SELECT * FROM class_structure";
        let classStructureList = await db.selectRecords(query);

        if(classList.length) {
            let tmpPos = {};

            for(let i=0; i<classList.length; i++) {
                let one = classList[i];
                one.level = one.level.split(",");
                one.groups = [];
                one.structure = [];
                tmpPos[one.id] = i;
            }
            for(i=0; i<classGroupList.length; i++) {
                let one = classGroupList[i];
                if(tmpPos[one.classId] !== undefined) {
                    classList[tmpPos[one.classId]].groups.push({name: one.name, price: one.price});
                }
            }
            for(i=0; i<classStructureList.length; i++) {
                let one = classStructureList[i];
                if(tmpPos[one.classId] !== undefined)
                    classList[tmpPos[one.classId]].structure.push({name: one.name, description: one.description});
            }
            console.log(tmpPos)
        }
        console.log(classList)
        res.send(classList);
    } catch(err) {
        console.log(err)
        res.status(500).send("Error Occurs!");
    }
})

router.post('/', isAuth, upload.single("banner"),  async (req, res) => {
    try {
        console.log("****add class*****");
        console.log(req.body.params)
        console.log(req.file)
        let params = JSON.parse(req.body.params);
        const groups = params.groups;
        const structure = params.structure;
        delete params.groups;
        delete params.structure;
        
        params = {...params, teacherId: req.user.id, createdAt: moment().format("YYYY-MM-DD HH:mm:ss")};
        if(req.file) {
            let oldPath = req.file.path;
            let newPath = `/uploads/classes/${req.file.filename}`;
            fs.renameSync(oldPath, config.staticDir + newPath);

            params.banner = newPath;
        }

        let [result, ] = await db.insertRecords("classes", params);

        if(result.affectedRows) {
            const classId = result.insertId;
            
            groups.forEach(one => one.classId = classId);
            structure.forEach(one => one.classId = classId);
            if(groups.length)
                [result, ] = await db.insertRecords("class_groups", groups);
            if(structure.length)
                [result, ] = await db.insertRecords("class_structure", structure);
            res.status(200).send();
        }
        else
            res.status(500).send("Internal Server error occurs!");
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.put('/:id', isAuth, upload.single("banner"), async (req, res) => {
    try {
        console.log("update >>>>>>")
        console.log(req.params)
        console.log(req.body);
        const classId = req.params.id;
        let params = JSON.parse(req.body.params);
        const groups = params.groups;
        const structure = params.structure;
        delete params.groups;
        delete params.structure;
        
        params = {...params, teacherId: req.user.id, updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")};

        let classes = await db.selectRecords("SELECT * FROM classes " + db.whereQuery({id: classId}));
        if(classes.length && classes[0].banner) {
            fs.unlink(config.staticDir + classes[0].banner, err => {
                if(err)
                    throw err;
                console.log(config.staticDir + classes[0].banner + " was successfully deleted.")
            })
        }
        if(req.file) {
            let oldPath = req.file.path;
            let newPath = `/uploads/classes/${req.file.filename}`;
            fs.renameSync(oldPath, config.staticDir + newPath);

            params.banner = newPath;
        }
        
        let [result, ] = await db.updateRecords("classes", params, {id: classId});
        console.log("here...")

        if(result.affectedRows) {
            await db.deleteRecords("class_groups", {classId});
            await db.deleteRecords("class_structure", {classId});
            groups.forEach(one => one.classId = classId);
            structure.forEach(one => one.classId = classId);

            if(groups.length)
                [result, ] = await db.insertRecords("class_groups", groups);
            if(structure.length)
                [result, ] = await db.insertRecords("class_structure", structure);
            res.status(200).send();
        }
        else
            res.status(500).send("Internal Server error occurs!")
    } catch(err) {
        console.log(err)
        res.status(500).send("Error Occurs!");
    }
})

router.post('/delete', isAuth, async (req, res) => {
    try {
        const classIds = req.body.ids;
        const classList = await db.selectRecords(`SELECT * FROM classes WHERE id IN (${ classIds.join(", ") })`);
        for(let i=0; i<classList.length; i++) {
            let one = classList[i];
            if(one.banner)
                fs.unlink(config.staticDir + one.banner, err => {
                });
        }

        await db.deleteRecords("class_groups", ` WHERE classId IN (${ classIds.join(", ") })`);
        await db.deleteRecords("class_structure", ` WHERE classId IN (${ classIds.join(", ") })`);
        let [result, ] = await db.deleteRecords("classes", ` WHERE id IN (${classIds.join(", ")})`);
        
        if(result.affectedRows)
            res.status(200).send();
        else
            res.status(500).send("Internal Server error occurs!")
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

module.exports = router;