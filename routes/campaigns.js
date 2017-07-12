let Campaign = require('../models/campaign')
let express = require('express')
let router = express.Router()

router.route('/campaigns')
  .get((req, res) => {
    Campaign.find((err, campaigns) => {
      if (err) {
        return res.send(err)
      }
      res.json(campaigns)
    })
  })
  .post((req, res) => {
    let campaign = new Campaign(req.body)

    campaign.save(err => {
      if (err) {
        return res.send(err)
      }

      res.send({ message: 'Campaign saved!' })
    })
  })

  router.route('/campaigns/:id')
    .get((req, res) => {
      Campaign.findOne({ _id: req.params.id }, (err, campaign) => {
        if (err) {
          return res.send(err)
        }
        res.json(campaign)
      })
    })
    .put((req, res) => {
      Campaign.findOne({ _id: req.params.id }, (err, campaign) => {
        if (err) {
          return res.send(err)
        }

        for (prop in req.body) {
          campaign[prop] = req.body[prop]
        }

        campaign.save(err => {
          if (err) {
            return res.send(err)
          }

          res.json({ message: 'Campaign updated!' })
        })
      })
    })
    .delete((req, res) => {
      Campaign.remove({ _id: req.params.id }, (err, campaign) => {
        if (err) {
          return res.send(err)
        }
        res.json({ message: 'Campaign deleted!' })
      })
    })

module.exports = router
