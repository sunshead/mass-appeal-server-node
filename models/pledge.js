const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PledgeSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  amount_in_cents: Number,
}, { timestamps: true })

PledgeSchema.plugin(uniqueValidator, { message: 'is already taken.' })

//register campaign schema with mongoose
let Pledge = mongoose.model('Pledge', PledgeSchema)

module.exports = Pledge
