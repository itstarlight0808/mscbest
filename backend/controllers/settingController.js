const express = require("express");
const router = express.Router();
const { isAuth } = require("../util");
const settingModel = require("../models/settingModel");

router.get("/getStudioSetting", isAuth, async (req, res) => {
    console.log("***get studio setting***")
    const userId = req.user.id;
    try {
        const studioSetting = await settingModel.getStudioSetting(userId);

        if(studioSetting.length)
            res.send(studioSetting[0]);
        else
            res.send({});
    } catch(err) {
        res.status(500).send({ msg: "Internal Server Error Occurs!" });
    }
})

router.put("/updateStudioSetting", isAuth, async (req, res) => {
    console.log("***update studio setting***")
    const userId = req.user.id;
    const params = req.body;
    try {
        let result = await settingModel.updateStudioSetting(userId, params);

        if(result)
            res.send();
        else
            res.status(500).send({ msg: "Setting isn't updated." })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: "Internal Server Error Occurs!" });
    }
})

module.exports = router;