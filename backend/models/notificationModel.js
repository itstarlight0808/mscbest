const moment = require("moment");
const db = require("../db");
const { renderHtmlTemplate } = require("../util");
const { templateDir } = require("../config");
const { sendSocketNotification } = require("../sockets/main");

exports.getNotificationsByType = async ({ userId, isSystem }) => {
    const query = `SELECT nt.*, IFNULL(ns.isRead, 0) AS isRead FROM notifications as nt 
        LEFT JOIN notification_status as ns ON nt.id=ns.notificationId WHERE (nt.userId=${userId} OR nt.userId=0) AND nt.isSystem=${isSystem}`;
    return await db.selectRecords(query)
}

exports.markAsRead = async params => {
    const { userId, id } = params;

    await db.insertRecords("notification_status", { userId, notificationId: id, isRead: 1 });
}
exports.deleteNotification = async params => {
    const { userId, id } = params;

    let where = "";
    if(id)
        where = db.whereQuery({ userId, id });
    else
        where = db.whereQuery({ userId })
    await db.deleteRecords("notifications", where);

    if(id)
        where = db.whereQuery({ userId, notificationId: id });
    await db.deleteRecords("notification_status", where);
}

exports.bookClassNotification = async params => {
    const { userId, studentName, classId } = params;

    let oneClass = await db.selectRecords("SELECT name FROM classes" + db.whereQuery({ id: classId }));
    oneClass = oneClass[0];
    const content = renderHtmlTemplate(`${templateDir}/book_class.html`, { studentName, className: oneClass.name });
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const newParams = { userId, title: "Book Class", content, isSystem: 0, createdAt };

    let [result, ] = await db.insertRecords("notifications", newParams);

    sendSocketNotification({ ...newParams, id: result.insertId, isRead: 0 });
}

exports.cancelBookClassNotification = async params => {
    const { userId, studentName, classId } = params;

    let oneClass = await db.selectRecords("SELECT name FROM classes" + db.whereQuery({ id: classId }));
    oneClass = oneClass[0];
    const content = renderHtmlTemplate(`${templateDir}/cancel_book_class.html`, { studentName, className: oneClass.name });
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const newParams = { userId, title: "Cancel Booking", content, isSystem: 0, createdAt };
    let [result, ] = await db.insertRecords("notifications", newParams);
    
    sendSocketNotification({ ...newParams, id: result.insertId, isRead: 0 });
}
