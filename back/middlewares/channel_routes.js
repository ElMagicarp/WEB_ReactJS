const express = require('express')
const router = express.Router()
const Channel = require('../models/channel.js')
const auth = require('./googleAuth.js')

// curl -X -H 'Authorization: Token test' localhost:5000/api/channelList
router.get('/channelList', (req, res) => {
    auth(req.headers.authorization)
        .then(() => {
            Channel.find()
                .then((chanArr) => {
                    result = {}
                    result.chanList = chanArr.map((chan) => chan.name)
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

// curl -X POST localhost:5000/api/channelList -H 'Content-Type: application/json' -d '{"channel":"name","userList":"userList"}'
/*router.post('/newChannel', (req, res) => {
    auth(req.headers.authorization)
        .then(() => {
        let newChannel = {
            name: req.body.name,
            userList: req.body.userList
        }
        let channel = new Channel(newChannel)
        channel.save()
            .then(() => {
                res.status(200).send('Message sent successfully')
            }
            )
            .catch((err) => {
                console.log(err)
                res.status(400).send('Unable to save to database')
            }
            )}

)})
*/
module.exports = router