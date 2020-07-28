const express = require('express')
const { restart } = require('nodemon')
const moongose = require('mongoose');
const Router =  express.Router()


const Tw = require('../../models/Tw');
const testMiddelware = require('../../middlewares/test');
const { Mongoose } = require('mongoose');

const tws = [
    {id: 0, message: 'Test 1'},
    {id: 12, message: 'Test 2'},
    {id: 56, message: 'Test 3'}
]

Router.get('/', (req, res) => {
    
    const tws = [];
    const error = null;
    Tw.find()
        .lean()
        .exec()
        .then(tws => {
            tws = tws

            res.status(200).json(tws);
        })
        .catch(err => {
            res.status(500).json(tws);
        })
    //res.status(200).send('Test tws with status');
})

Router.get('/:twId', (req, res) => {

    if(req.params.twId && req.params.twId != ""){
        twId = req.params.twId;
        
        const tws = [];
        const error = null;
        Tw.findById(twId)
            .lean()
            .exec()
            .then(tws => {
                tws = tws

                res.status(200).json(tws);
            })
            .catch(err => {
                res.status(500).json(tws);
            })
    }
    else{
        res.status(500).json({error: "Id cannot be null"});
    }
})

Router.post('/', (req,res) => {
    console.log(req.body.message)
    console.log("req.body.message")
    if(req.body.message && req.body.message != ""){
        const tw = new Tw({
            _id: new moongose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.status(200).send(tw)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })

    } else{
        res.status(500).json({error: "Message cannot be null"});
    }

    
})

Router.delete('/:twId', (req,res) => {

    if(req.params.twId && req.params.twId != ""){
        twId = req.params.twId;
        
        const tws = [];
        const error = null;
        Tw.findByIdAndDelete(twId)
            .lean()
            .exec()
            .then(tws => {
                tws = tws

                res.status(200).json(tws);
            })
            .catch(err => {
                res.status(500).json(tws);
            })
    }
    else{
        res.status(500).json({error: "Id cannot be null"});
    }
})

Router.patch('/:twId', (req,res) =>{

    if(req.params.twId && req.params.twId != ""){
        twId = req.params.twId;
        if(req.body.message && req.body.message != ""){
            const tws = [];
            const error = null;
            Tw.findByIdAndUpdate(twId, {message: req.body.message}, {new:true})
                .lean()
                .exec()
                .then(tws => {
                    tws = tws

                    res.status(200).json(tws);
                })
                .catch(err => {
                    res.status(500).json(tws);
                })
        }
        else
            res.status(500).json({error: "Message cannot be null"});
    }
    else{
        res.status(500).json({error: "Id cannot be null"});
    }

})

module.exports = Router;