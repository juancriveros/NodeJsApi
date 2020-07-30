const express = require('express')
const { restart } = require('nodemon')
const mongoose = require('mongoose');
const Router =  express.Router()

const Tw = require('../../models/Tw');

var list = (req, res, msg = '') => {
    var error = false;

    Tw.find()
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(tws => {
            res.render('tws', {
                tws: tws,
                error: error,
                msg: msg,
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}


Router.get('/', (req, res) => {
    list(req, res)
})

Router.get('/delete/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({
        _id: twId
    })
        .exec()
        .then(result => {
            res.redirect('/tws/success/Tweet deleted');
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    list(req, res, msg)
});

Router.post('/', (req,res) => {
    console.log(req.body.newTw)

    if(req.body.newTw && req.body.newTw != ""){
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.newTw
        })

        tw.save()
            .then(tw => {
                res.redirect('/tws/success/Tweet added!');
            })
            .catch(err => {
                res.status(500).json({error: err})
            })

    } else{
        res.redirect('/tws/danger/Tweet cannot be empty');
    }

    
})

module.exports = Router;