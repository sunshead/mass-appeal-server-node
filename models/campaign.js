const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const CampaignSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name: { type: String, index: true, unique: true, required: true },
  goal_amount_in_cents: { type: Number, required: true, min: [100, "at least $1"]},
  description: String,
  due_at: {type: Date, validate: [dateValidator, "not a future date"]}
  completed_at: {type: Date, default: null},
  cancelled_at: {type: Date, default: null}
}, { timestamps: true })

function dateValidator(date) {
  return date > Date.now();
}

CampaignSchema.plugin(uniqueValidator, { message: 'is already taken.' })

//register campaign schema with mongoose
let Campaign = mongoose.model('Campaign', CampaignSchema)

module.exports = Campaign
