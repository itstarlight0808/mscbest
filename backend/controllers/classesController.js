const express = require("express");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
const config = require("../config");
const {isAdmin, isAuth, isStudent, isTeacher, upload} = require("../util");
const db = require("../db");

router.get('/', async (req, res) => {
    try {
        console.log(req.user)
        let where = "";
        if(isTeacher(req))
            where = db.whereQuery({ "cl.teacherId": req.user.id });

        let query = `SELECT cl.*, ur.firstName, ur.lastName, ur.avatar FROM classes AS cl 
            LEFT JOIN users AS ur ON cl.teacherId=ur.id ` + where;
        let classList = await db.selectRecords(query);
        let classIds = classList.map(one => one.id);
        where = (classIds.length? ` WHERE classId in (${ classIds.join(",") })`: "");

        query = "SELECT * FROM class_groups" + where;
        let classGroupList = await db.selectRecords(query);
        query = "SELECT * FROM class_structure" + where;
        let classStructureList = await db.selectRecords(query);
        query = "SELECT * FROM class_schedule" + where;
        let classScheduleList = await db.selectRecords(query);
        query = `SELECT * FROM class_participants` + where;
        let participants = await db.selectRecords(query);

        if(classList.length) {
            let tmpPos = {};

            for(let i=0; i<classList.length; i++) {
                let one = classList[i];
                one.teacher = {
                    id: one.teacherId,
                    firstName: one.firstName,
                    lastName: one.lastName,
                    avatar: one.avatar
                }
                delete one.teacherId;
                delete one.firstName;
                delete one.lastName;
                delete one.avatar;

                one.level = one.level.split(",");
                one.groups = [];
                one.structure = [];
                one.schedule = [];
                one.participants = [];
                tmpPos[one.id] = i;
            }
            for(i=0; i<classGroupList.length; i++) {
                let one = classGroupList[i];
                if(tmpPos[one.classId] !== undefined) {
                    classList[tmpPos[one.classId]].groups.push({id: one.id, name: one.name, price: one.price});
                }
            }
            for(i=0; i<classStructureList.length; i++) {
                let one = classStructureList[i];
                if(tmpPos[one.classId] !== undefined)
                    classList[tmpPos[one.classId]].structure.push({name: one.name, description: one.description});
            }
            for(i=0; i<classScheduleList.length; i++) {
                let one = classScheduleList[i];
                if(tmpPos[one.classId] !== undefined)
                    classList[tmpPos[one.classId]].schedule.push({id: one.id, startDate: one.startDate});
            }
            for(i=0; i<participants.length; i++) {
                let one = participants[i];
                if(tmpPos[one.classId] !== undefined) {
                    classList[tmpPos[one.classId]].participants.push({studentId: one.studentId});

                    if(isStudent(req))
                        classList[tmpPos[one.classId]].isBooked = true;
                }
            }
        }
        res.send(classList);
    } catch(err) {
        console.log(err);
        res.status(500).send("Error Occurs!");
    }
})

router.post('/', isAuth, upload.single("banner"),  async (req, res) => {
    try {
        console.log("****add class*****");
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
        console.log(req.file)
        console.log(req.body.params)
        const classId = req.params.id;
        let params = JSON.parse(req.body.params);
        const groups = params.groups;
        const structure = params.structure;
        delete params.groups;
        delete params.structure;
        
        params = {...params, teacherId: req.user.id, updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")};

        if(req.file || (params.hasOwnProperty("banner") && !params.banner)) {  // when upload new banner or  remove banner
            let classes = await db.selectRecords("SELECT * FROM classes " + db.whereQuery({id: classId}));
            if(classes.length && classes[0].banner) {
                fs.unlink(config.staticDir + classes[0].banner, err => {
                    if(err)
                        return;
                    console.log(config.staticDir + classes[0].banner + " was deleted.")
                })
            }
        }
        if(req.file) {
            let oldPath = req.file.path;
            let newPath = `/uploads/classes/${req.file.filename}`;
            fs.renameSync(oldPath, config.staticDir + newPath);

            params.banner = newPath;
        }
        
        let [result, ] = await db.updateRecords("classes", params, {id: classId});

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

/** For Student **/
router.get("/getUpcomingClassesCntByMonth", isAuth, async (req, res) => {
    try {
        console.log("get upcoming classes count... ")
        const curYear = moment().format("YYYY");
        const curMonth = moment().format("M");
        const studentId = req.user.id;
        let query = `SELECT COUNT(*) AS count FROM class_participants AS cp
            LEFT JOIN classes AS cl ON cp.classId=cl.id
            LEFT JOIN class_schedule AS cs ON cl.id=cs.classId
            WHERE cp.studentId=${studentId} AND YEAR(cs.startDate)=${curYear} AND MONTH(cs.startDate)=${curMonth}`;
        const result = await db.selectRecords(query);

        res.send(result[0])
    } catch(err) {
        res.status(500).send("Internal Server Error occurs!")
    }
})

router.get("/getBookedClasses/:year/:month/:day", isAuth, async (req, res) => {
    try {
        const year = req.params.year;
        const month = req.params.month;
        const day = req.params.day;
        const studentId = req.user.id;
        let query = `SELECT cl.*, cs.startDate FROM class_participants AS cp
            LEFT JOIN classes AS cl ON cp.classId=cl.id
            LEFT JOIN class_schedule AS cs ON cl.id=cs.classId
            WHERE cp.studentId=${studentId} AND YEAR(cs.startDate)=${year} AND MONTH(cs.startDate)=${month} AND DAY(cs.startDate)=${day}`;
        const result = await db.selectRecords(query);

        res.send(result);
    } catch(err) {
        res.status(500).send("Internal Server Error occurs!")
    }
})
//// student

router.get("/:id", async (req, res) => {
    console.log("get class by Class ID...")

    try {
        const classId = req.params.id;
        let query = `SELECT cl.*, ur.firstName, ur.lastName, ur.avatar FROM classes AS cl 
            LEFT JOIN users as ur ON cl.teacherId=ur.id ` + db.whereQuery({ "cl.id": classId });
        let oneClass = await db.selectRecords(query);

        oneClass = oneClass.length? oneClass[0]: null;

        if(oneClass) {
            let where = db.whereQuery({ classId });
            query = "SELECT * FROM class_groups" + where;
            let classGroupList = await db.selectRecords(query);
            query = "SELECT * FROM class_structure" + where;
            let classStructureList = await db.selectRecords(query);
            query = "SELECT * FROM class_schedule" + where;
            let classScheduleList = await db.selectRecords(query);
            query = `SELECT * FROM class_participants` + where;
            let participants = await db.selectRecords(query);

            oneClass.teacher = {
                id: oneClass.teacherId,
                firstName: oneClass.firstName,
                lastName: oneClass.lastName,
                avatar: oneClass.avatar
            }
            delete oneClass.teacherId;
            delete oneClass.firstName;
            delete oneClass.lastName;
            delete oneClass.avatar;
            oneClass = {
                ...oneClass,
                level: oneClass.level.split(","),
                groups: classGroupList,
                structure: classStructureList,
                schedule: classScheduleList,
                participants
            }
        }
        oneClass = oneClass ?? {};

        res.send(oneClass);
    } catch(err) {
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

router.post("/schedule/add", isAuth, async (req, res) => {
    try {
        console.log("add schedule....")
        const { classId, startDate } = req.body;
        console.log(req.body);
        
        let [result, ] = await db.insertRecords("class_schedule", { classId, startDate });
        
        if(result.affectedRows)
            res.status(200).send({id: result.insertId, classId, startDate});
        else
            res.status(500).send("Internal Server error occurs!")
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.delete("/schedule/delete/:id", isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        
        let [result, ] = await db.deleteRecords("class_schedule", { id })
        
        if(result.affectedRows)
            res.status(200).send();
        else
            res.status(500).send("Internal Server error occurs!")
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

/*** For Student ***/
router.post("/:id/book", isAuth, async (req, res) => {
    try {
        const classId = req.params.id;
        const groupId = req.body.groupId;
        const userId = req.user.id;

        let params = {
            classId,
            studentId: userId,
            groupId
        }
        let [result, ] = await db.insertRecords("class_participants", params);

        // record student info into teacher's personal database...
        let teacher = await db.selectRecords("SELECT teacherId FROM classes" + db.whereQuery({ id: classId }));
        teacher = teacher[0];
        
        try {
            await db.insertRecords("teacher_studentdb", { teacherId: teacher.teacherId, studentId: params.studentId, groupId: params.groupId, status: 1 });
            console.log("new student added")
        } catch(err) {
            console.log(err)
        }

        res.send(params);
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.delete("/:id/cancelBooking", isAuth, async (req, res) => {
    try {
        const classId = req.params.id;
        const userId = req.user.id;
        let params = { classId, studentId: userId };

        let [result, ] = await db.deleteRecords("class_participants", params);

        res.send({ userId });
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

module.exports = router;