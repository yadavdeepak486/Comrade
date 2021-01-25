const express = require('express');
const router = express.Router();
const Chat = require('../models/chat')


router.get('/chat', async (req, res) => {
    res.json({
        message: "Welcome to chats"
    })

})

router.post('/chat', async (req, res) => {
    // const msgto = req.body.msgtoid
    // const msgby = req.body.msgbyid
    // const message = req.body.message
    const chat = new Chat({
        msg_to_id: req.body.msg_to_id,
        msg_by_id: req.body.msg_by_id,
        message: req.body.message
    })
    chat.save().then(resp => {
        res.json({
            resp
        })
    })

})

router.post('/chats', async (req, res) => {
    const findChatid = await Chat.findById()
    if (findChatid) {
        res.json({
            chats: findChatid
        })
    } else {
        res.json({
            chats: "no chats yet"
        })
    }
})


module.exports = router;