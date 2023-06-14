const express = require('express')
const router = express.Router()
const Message = require('../models/message.js')
const Channel = require('../models/channel.js')
const auth = require('./googleAuth.js')

// curl -X POST localhost:5000/api/send -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"channel":{"name":"general", "type":"public"}, "message":"test"}'
router.post('/send', (req, res) => {
    auth(req.headers.authorization)
        .then((user) => {
            let data = {
                author: {
                    name: user.name,
                    sub: user.sub,
                    picture : user.picture
                },
                channel: null,
                message: req.body.message,
            }
            let isPublic = req.body.channel.type === 'public'
            if (isPublic){
                Channel.findOne({ name: req.body.channel.name })
                    .then((chan) => {
                        data.channel = chan._id
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
            } else {
                Channel.findOne( {$and :[
                    {userList: { $elemMatch: { sub: user.sub } } },
                    {userList:{ $elemMatch: { name: req.body.channel.name } } }]})
                    .then((chan) => { 
                        data.channel = chan._id
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

            }
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

// curl -X POST localhost:5000/api/msglist -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"name":"general", "type":"public""}'
router.post('/msglist', (req, res) => {
    auth(req.headers.authorization)
        .then((currentUser) => {
            let isPublic = req.body.type === 'public'
            if (isPublic) {
                Channel.find({ name: req.body.name })
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
            } else {
                Channel.findOne( {$and :[
                    {userList: { $elemMatch: { sub: currentUser.sub } } },
                    {userList:{ $elemMatch: { name: req.body.name } } }]})
                    .then((chan) => {
                        if (!chan) {
                            res.status(400).send('Unable to get channel')
                            return
                        }
                        Message.find({ channel: chan._id })
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
            }
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

module.exports = router