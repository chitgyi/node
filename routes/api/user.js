const express = require('express')
const mongo = require('mongojs')

const router = express.Router()

router.post('/signin', async(req, res) => {
    // do something
    const collection = await loadPostCollection()
    collection.insert(req.body, (err, result) => {
        if (!err) 
            res.json({message: result, status: 201})
        else
            res.json({message: 'Failed to auth', status: 403})
    })
})

router.post('/login', (req, res) => {
    // do something
    const collection = loadPostCollection()
    console.log(req.body)
    collection.findOne({$and: [{username: req.body.username}, {password: req.body.password}]}, (err, result) => {
        console.log(result)
        if (result === null) 
        res.json({message: "failed", status: 200})
        else
            res.json({message: "success", token: result.api_token, status: 200})
    })
})

async function  loadPostCollection() {
    const mongodb = mongo('mongodb://chitgyi:chitgyi123@ds163103.mlab.com:63103/cya', ['mytutorial'])
    return mongodb.collection('mytutorial')
}
module.exports = router