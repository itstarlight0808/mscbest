const express = require("express");
const EventModel = require("../models/eventModel");
const {isAdmin, isAuth} = require("../util");

const router = express.Router();

router.get('/', isAuth,  async (req, res) => {
    try {
        const eventList = await EventModel.find({}).populate('followers').exec();
        res.send({event: eventList});
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.post('/', isAuth, async (req, res) => {
    try {
        const {name} = req.body;
        console.log(name);
        let event = await EventModel.create({
            name
        });
        res.status(200).send(event);
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.put('/:id', isAuth, async (req, res) => {
    try {
        const eventId = req.params.id;
        let event = await EventModel.findById(eventId);
        event.status = !event.status;
        event.save();
        res.status(200).send(event);
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const eventId = req.params.id;
        await EventModel.findByIdAndDelete(eventId);
        
        res.status(200).send({statusText: "ok"});
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

router.put('/:id/toggleFollow', isAuth, async (req, res) => {
    try {
        const eventId = req.params.id;
        const {userId} = req.body;
        let event = await EventModel.findById(eventId);

        let index = event.followers.indexOf(userId);
        console.log(index)
        if(index === -1)
            event.followers.push({_id: userId});
        else
            event.followers.splice(index, 1);
        console.log(event)
        event.save();
        
        res.status(200).send({statusText: "ok"});
    } catch(err) {
        res.status(500).send("Error Occurs!");
    }
})

module.exports = router;