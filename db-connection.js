const mongoose = require('mongoose')

const db = mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = db