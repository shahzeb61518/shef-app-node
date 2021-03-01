const Model = require("../models/comments-model");

exports.create = (req, res, next) => {
  const model = new Model({
    comment: req.body.comment,
    commentPostId: req.body.commentPostId,
    commentUserId: req.body.commentUserId,
    commentUserName: req.body.commentUserName,
  });
  model
    .save()
    .then((createdObject) => {
      console.log(createdObject);
      res.status(201).json({
        message: "Created successfully",
        model: createdObject,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Creation failed!",
      });
    });
};

// Get
exports.get = (req, res, next) => {
  Model.find()
    .then((documents) => {
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// Get by blogid
exports.getByPostId = (req, res, next) => {
  Model.find({ commentPostId: req.body.commentPostId })
    .then((documents) => {
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// // Delete
exports.delete = (req, res, next) => {
  Model.deleteOne({ _id: req.body.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not deleted!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deletion failed!",
      });
    });
};

exports.update = (req, res, next) => {
  // console.log(req.body)
  const model = new Model({
    _id: req.body.id,
    comment: req.body.comment,
    commentPostId: req.body.commentPostId,
    commentUserId: req.body.commentUserId,
    commentUserName: req.body.commentUserName,
  });
  Model.updateOne({ _id: req.body.id }, model)
    .then((result) => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};
