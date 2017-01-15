var mongoose = require('mongoose');

module.exports = mongoose.model('Entry', {
    text: { type: String, default: '' },
    type: { type: Number },
    date: {
        day: { type: Number },
        month: { type: Number },
        year: { type: Number }
    }
});
