const express = require('express')
const router = express.Router()
const Channel = require('../models/channel.js')
const auth = require('./googleAuth.js')

// curl -X -H 'Authorization: Token test' localhost:5000/api/channelList
router.get('/channelList', (req, res) => {
    auth(req.headers.authorization)
        .then((user) => {
            Channel.find({$or :[
                {userList: { $elemMatch: { sub: user.sub } }},
                {userList: { $exists: false } },
                {userList: { $size: 0 } }
            ]})
                .then((chanArr) => {
                    result = {}
                    result.private = []
                    result.public = []
                    for (let i = 0; i < chanArr.length; i++) {
                        if (chanArr[i].userList.length >= 2) {
                            for (let j = 0; j < chanArr[i].userList.length; j++) {
                                if (chanArr[i].userList[j].sub !== user.sub) {
                                    result.private.push(chanArr[i].userList[j].name)
                                }
                            }
                        }
                        else {
                            result.public.push(chanArr[i].name)
                        }
                    }
                    res.status(200).json(result)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).send('Unable to get channels')
                })
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

// curl -X POST localhost:5000/api/createChannel -H 'Content-Type: application/json' -H 'Authorization: Bearer test' -d '{"name":"test", "sub":"1337"}'
router.post('/createChannel', (req, res) => {
    auth(req.headers.authorization)
        .then((currentUser) => {
            // check if channel already exists
            let exists = false
            Channel.findOne( {$and :[
                    {userList: { $elemMatch: { sub: currentUser.sub } } },
                    {userList:{ $elemMatch: { sub: req.body.sub } } }]})
                .then((chan) => { // channels contains all channels where user is present
                    if (chan) {
                        exists = true
                        res.status(200).send('Channel already exists')
                    }
                    if (!exists){
                        user1 = {
                            name: currentUser.name,
                            sub: currentUser.sub
                        };
                        user2 = {
                            name: req.body.name,
                            sub: req.body.sub
                        };
                        users = [user1, user2]
                        const newChannel = new Channel({
                            userList: users
                        })
                        newChannel.save()
                            .then(() => {
                                res.status(200).send('Channel created')
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).send('Unable to create channel')
                            })
                    }
                })
                .catch((err) => console.log(err))

        })
        .catch((err) => {
            console.log(err)
            res.status(400).send('Invalid token')
        })
})

module.exports = router