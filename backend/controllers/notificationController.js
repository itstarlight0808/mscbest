const express = require("express");
const router = express.Router();
const db = require("../db");
const notificationModel = require("../models/notificationModel");
const { isAuth } = require("../util");

router.get("/", isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const systemNotifications = await notificationModel.getNotificationsByType({ userId, isSystem: 1 });
        const personalNotifications = await notificationModel.getNotificationsByType({ userId, isSystem: 0 });

        res.send({ systemNotifications, personalNotifications });
    } catch(err) {
        res.status(500).send({ msg: "Internal Server Error occurs." });
    }
})

router.post("/:id/markAsRead", async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    
    try {
        notificationModel.markAsRead({ userId, id });

        res.send();
    } catch(err) {
        res.status(500).send({ msg: "Internal Server Error occurs." });
    }
})

router.delete("/:id", isAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        notificationModel.deleteNotification({ userId, id });

        res.send();
    } catch(err) {
        res.status(500).send({ msg: "Internal Server Error occurs." });
    }
})

router.delete("/deleteAll", isAuth, async (req, res) => {
    try {
        notificationModel.deleteNotification({ userId });

        res.send();
    } catch(err) {
        res.status(500).send({ msg: "Internal Server Error occurs." });
    }
})

module.exports = router;