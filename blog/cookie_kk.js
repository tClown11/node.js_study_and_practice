const express = require('express')
const app = express()

app.get('/', (req, res)=> {
    var dsa = 423
    res.cookie('nihao', dsa, {maxAge: 60*60})
    res.send('nihao')
})

app.listen(8000)