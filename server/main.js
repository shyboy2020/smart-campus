const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const router = require('./router/user')

const app = express()
const port = 6324

app.use(cors())
app.use(morgan('combined'))

app.use(router)

app.get('/',(req,res) => {
    res.send('你好')
})

app.listen(port,() => console.log('server is running ...'))