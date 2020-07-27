const moongose = require('mongoose');

const TwSchema = new moongose.Schema({
    message: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }

});

module.exports = moongose.model('Tw', TwSchema);