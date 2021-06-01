'use strict'
const BookModel = require("../models").Book

module.exports = (app) => {

  app.route('/api/books')
    .get((req, res) => {

      BookModel.find({}, (err, data) => {
        if (!data) {
          res.json({})
        } else {
          const formatData = data.map((books) => {
            return {
              _id: books._id,
              title: books.title,
              comments: books.comments,
              commentcount: books.comments.length
            }
          })
          res.json(formatData)
        }
      })
    })

    .post((req, res) => {
      let title = req.body.title

      if (!title) {
        res.send('missing required field title')
        return
      }

      const newDocs = new BookModel({
        title,
        comments: []
      })
      newDocs.save((err, data) => {
        if (err || !data) {
          res.send('Book did not save')
        } else {
          res.json({
            _id: data._id,
            title: data.title
          })
        }
      })
    })

    .delete((req, res) => {
      BookModel.remove({}, (err, data) => {
        if (err || !data) {
          res.send('Failed to delete')
        } else {
          res.send('complete delete successful')
        }
      })
    })



  app.route('/api/books/:id')

    .get((req, res) => {
      let bookid = req.params.id

      BookModel.findById(bookid, (err, data) => {
        if (!data) {
          res.send('no book exists')
        } else(
          res.json({
            comments: data.comments,
            _id: data._id,
            title: data.title,
            commentcount: data.comments.length
          })
        )
      })
    })

    .post((req, res) => {
      let bookid = req.params.id
      let comment = req.body.comment

      if (!comment) {
        res.send('missing required field comment')
        return
      }

      BookModel.findById(bookid, (err, data) => {
        if (!data) {
          res.send('no book exists')
        } else {
          data.comments.push(comment)
          data.save((err, save) => {
            res.json({
              comments: save.comments,
              _id: save._id,
              title: save.title,
              commentcount: save.comments.length
            })
          })
        }
      })
    })

    .delete((req, res) => {
      let bookid = req.params.id

      BookModel.findByIdAndRemove(bookid, (err, data) => {
        if (err || !data) {
          res.send('no book exists')
        } else {
          res.send('delete successful')
        }
      })
    })
}