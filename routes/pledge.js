let Pledge = require('../models/pledge')
let express = require('express')
let router = express.Router()

router.route('/campaign/:id/pledges')
  .get((req, res) => {
    Pledge.find((err, pledges) => {
      if (err) {
        return res.send(err)
      }
      res.json(pledges)
    })
  })
  .post((req, res) => {
    let pledge = new Pledge(req.body)

    pledge.save(err => {
      if (err) {
        return res.send(err)
      }
      let campaign = Campaign.findOne({ _id: req.params.creator })
      campaign.pledges.push(pledge)

      res.send({ message: 'Pledge saved!' })
    })
  })

  router.route('/pledges/:id')
    .get((req, res) => {
      Pledge.findOne({ _id: req.params.id }, (err, pledge) => {
        if (err) {
          return res.send(err)
        }
        res.json(pledge)
      })
    })
    .put((req, res) => {
      Pledge.findOne({ _id: req.params.id }, (err, pledge) => {
        if (err) {
          return res.send(err)
        }

        for (prop in req.body) {
          pledge[prop] = req.body[prop]
        }

        pledge.save(err => {
          if (err) {
            return res.send(err)
          }

          res.json({ message: 'Pledge updated!' })
        })
      })
    })
    .delete((req, res) => {
      Pledge.remove({ _id: req.params.id }, (err, pledge) => {
        if (err) {
          return res.send(err)
        }
        res.json({ message: 'Pledge deleted!' })
      })
    })

module.exports = router
