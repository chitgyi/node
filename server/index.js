const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Middleware
app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')
const allroute = require('./routes/api/allroute')

app.use('/api/posts', posts)
app.use('/', allroute)

const prot = process.env.PORT || 5000

app.listen(prot, () => {
    console.log(`Server is running at port ${prot}`)
})
