const express = require('express')
const router = express.Router()
const Channel = require('../models/channel.js')
const auth = require('./googleAuth.js')

const isInChannel = (sub, channel) => {
    for (let i = 0; i < channel.userList.length; i++) {
        if (channel.userList[i].sub === sub) {
            return true
        }
    }
    return false
}

const getChannelName = (sub, channel) => {
    // Returns the name of the other user in the channel
    for (let i = 0; i < channel.userList.length; i++) {
        if (channel.userList[i].sub !== sub) {
            return channel.userList[i].name
        }
    }
}

// curl -X -H 'Authorization: Token test' localhost:5000/api/channelList
router.get('/channelList', (req, res) => {
    auth(req.headers.authorization)
        .then((user) => {
            Channel.find()
                .then((chanArr) => {
                    result = {}
                    result.private = []
                    result.public = []
                    idUser = user.sub
                    for (let i = 0; i < chanArr.length; i++) {
                        if (chanArr[i].hasOwnProperty('userList')) {
                            if (isInChannel(idUser, chanArr[i])) {
                                result.private.push(getChannelName(idUser, chanArr[i]))
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

router.post('/createChannel', (req, res) => {
    auth(req.headers.authorization)
        .then(() => {
            user1 = {
                name: req.user.name,
                sub: req.user.sub
            };
            user2 = {
                name: req.body.user2,
                sub: req.body.sub2
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
        })
        .catch(() => {
            res.status(400).send('Invalid token')
        })
})

module.exports = router