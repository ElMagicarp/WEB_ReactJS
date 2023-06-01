const express = require('express')
const router = express.Router()
const Message = require('../models/message.js')


// curl -X POST localhost:3000/api/send -H 'Content-Type: application/json' -d '{"author":"me", "message":"hello", "channel":"general"}'
router.post('/send', (req, res) => {
    let data = {
        author: req.body.author,
        channel: req.body.channel,
        message: req.body.message
    }
    let message = new Message(data)
    message.save()
        .then(() => {
            res.status(200).send('Message sent successfully')
        }
        )
        .catch((err) => {
            console.log(err)
            res.status(400).send('Unable to save to database')
        }
        )
})

// curl -X POST localhost:3000/api/msglist -H 'Content-Type: application/json' -d '{"channel":"general"}'
router.post('/msglist', (req, res) => {
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

module.exports = router