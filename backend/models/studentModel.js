const db = require("../db");

exports.searchStudentsByEmail = async searchStr => {
    let query = `SELECT id, email FROM users WHERE email LIKE "%${searchStr}%" ORDER BY email ASC`;
    return await db.selectRecords(query);
}

exports.getMyTeachersByUserId = async userId => {
    let query = `SELECT ur.id, ur.firstName, ur.lastName, ur.email, ur.phoneNumber, cl.name AS className FROM class_participants AS cp
        LEFT JOIN classes AS cl ON cp.classId=cl.id 
        LEFT JOIN users AS ur ON cl.teacherId=ur.id WHERE cp.studentId=${userId} ORDER BY ur.id ASC`;
    const result = await db.selectRecords(query);

    const teachers = [];
    result.forEach(one => {
        if(!teachers.length || (teachers.length && teachers[teachers.length-1].id !== one.id)) {
            let tmp = { ...one, classes: [{ className: one.className }] };
            delete tmp.className;
            teachers.push(tmp);
        }
        else
            teachers[teachers.length - 1].classes.push(one.className);
    })

    return teachers;
}