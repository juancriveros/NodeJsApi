const express = require('express')
const { restart } = require('nodemon')
const Router =  express.Router()

const Tw = require('../../models/Tw');

Router.get('/', (req, res) => {
    const tws = [];
    const error = null;
    Tw.find()
        .lean()
        .exec()
        .then(tws => {
            tws = tws

            res.render('tws', {
                tws: tws,  
                error: error 
            })
        })
        .catch(err => {
            error = err
        })
})

module.exports = Router;