const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const mainRouter = require('./main')

app.use(express.json())
app.use('/', mainRouter)

app.listen(PORT)
