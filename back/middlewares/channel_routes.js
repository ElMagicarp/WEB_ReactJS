const express = require('express')
const router = express.Router()
const Channel = require('../models/channel.js')

// curl -X GET localhost:3000/api/channelList
router.get('/channelList', (req, res) => {
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

module.exports = router