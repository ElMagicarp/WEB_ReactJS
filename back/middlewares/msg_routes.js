const express = require('express')
const router = express.Router()
const Message = require('../models/message.js')
const auth = require('./googleAuth.js')

// curl -X POST localhost:5000/api/send -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"message":"hello", "channel":"general"}'
router.post('/send', (req, res) => {
    auth(req.headers.authorization)
        .then((user) => {
            let data = {
                author: user.name,
                picture: user.picture,
                channel: req.body.channel,
                message: req.body.message,
            }
            let message = new Message(data)
            message.save()
                .then(() => {
                    res.status(200).send('Message sent successfully')
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).send('Unable to save to database')
                })
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

// curl -X POST localhost:5000/api/msglist -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"channel":"general"}'
router.post('/msglist', (req, res) => {
    auth(req.headers.authorization)
        .then(() => {
            let chan = req.body.channel
            Message.find({ channel: chan })
                .then((messages) => {
                    result = {}
                    result.msgArr = messages
                    res.status(200).json(result)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).send('Unable to get messages')
                })
            })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

module.exports = router