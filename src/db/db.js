const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/homeautomation'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })