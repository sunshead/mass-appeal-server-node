const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const CampaignSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, index: true, unique: true },
  goal_amount_in_cents: Number,
  description: String
}, { timestamps: true })

CampaignSchema.plugin(uniqueValidator, { message: 'is already taken.' })

//register campaign schema with mongoose
let Campaign = mongoose.model('Campaign', CampaignSchema)

module.exports = Campaign
