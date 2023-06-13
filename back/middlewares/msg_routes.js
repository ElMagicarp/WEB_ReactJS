const express = require('express')
const router = express.Router()
const Message = require('../models/message.js')
const Channel = require('../models/channel.js')
const auth = require('./googleAuth.js')

// curl -X POST localhost:5000/api/send -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"message":"hello", "channel":"general"}'

router.post('/send', (req, res) => {
    auth(req.headers.authorization)
        .then((user) => {
            Channel.find({ name: req.body.channel })
                .then((chan) => {
                    let data = {
                        author: {
                            name: user.name,
                            sub: user.sub,
                            picture : user.picture
                        },
                        channel: chan[0]._id,
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
                .catch((err) => {
                    console.log(err)
                    res.status(400).send('Unable to get channel')
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
            Channel.find({ name: req.body.channel })
                .then((chan) => {
                    Message.find({ channel: chan[0]._id })
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
                .catch((err) => {
                    console.log(err)
                    res.status(400).send('Unable to get channel')
                })
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

module.exports = router