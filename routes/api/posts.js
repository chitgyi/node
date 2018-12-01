const express = require('express')
const mongo = require('mongojs')

const router = express.Router()

//Get posts
router.get('/', async (req,res) => {
    // const posts = await loadPostCollection()
    // await posts.find({}).sort({_id: -1}, (err, result) => {
    //     res.send(result)
    // })
    res.send('hello')
})

//Insert posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection()
    await posts.insert({name: req.body.name, major:[req.body.major]}, (err, result) => {
        res.send(result)
    })

})

// Delete post
router.delete('/', async (req, res) => {
    const posts = await loadPostCollection()
    await posts.remove({}, (err, result) => {
        res.send(result)
    })
})

//update new major
// router.put('/', async (req, res) => {
//     const posts = await loadPostCollection()
//     let id = mongo.ObjectId(req.body.id)
//     let data = {
//         major: req.body.major
//     }
//    posts.update({_id: id}, {$push: {major: data.major}}, (err, result) => {
//        res.send(result)
//    })
// })

//pull or delete major item
//  router.put('/', async (req, res) => {
//         const posts = await loadPostCollection()
//         let id = mongo.ObjectId(req.body.id)
//         let data = {
//             major: req.body.major,
//             newmajor: req.body.newmajor
//         }
//        posts.update({_id: id}, {$pull: {major:{$in: [req.body.major]}}}, (err, result) => {
//            res.send(result)
//        })
//     })

// update major
router.put('/', async (req, res) => {
    const posts = await loadPostCollection()
    let id = mongo.ObjectId(req.body.id)
    let data = {
        major: req.body.major,
        newmajor: req.body.newmajor
    }
   posts.update({_id: id, major: data.major}, {$set: {'major.$':data.newmajor}}, (err, result) => {
       res.send(result)
   })
})

async function  loadPostCollection() {
    const mongodb = mongo('mongodb://chitgyi:chitgyi123@ds163103.mlab.com:63103/cya', ['mytutorial'])
    return mongodb.collection('mytutorial')
}
module.exports = router
