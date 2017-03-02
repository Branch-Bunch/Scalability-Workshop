const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Sortable = require('./models/Sortable')

dotenv.config({ silent: true })
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = Promise
