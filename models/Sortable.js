const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sortableSchema = new Schema({
  value: { type: Number },
  score: { type: Number },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() },
})

const Sortable = mongoose.model('Sortable', sortableSchema, 'Sortables')

module.exports = Sortable
