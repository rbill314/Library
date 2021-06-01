const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    comments: [
        String
    ]
})

const Book = mongoose.model("Book", BookSchema)

exports.Book = Book