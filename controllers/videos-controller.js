const Model = require("../models/videos-model");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// exports.uploadImage = (req, res, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }
//   let image = req.files.blogImage;
//   sampleFile.mv("./upload/", function (err) {
//     if (err) return res.status(500).send(err);

//     res.send("File uploaded!");
//   });
// };

exports.create = async (req, res, next) => {
  console.log("files", req.files);
  console.log("body", req.body);

  // let url = "http://localhost:4003";
  // let url = "https://shef-node.herokuapp.com";
  if (req.files) {
    let video;

    if (req.files.video) {
      video = process.env.URL + "/upload/" + req.files.video.name;
      req.files.video.mv("public/upload/" + req.files.video.name, function (
        error
      ) {
        if (error) {
          console.log("Couldn't upload file");
          console.log(error);
        } else {
          console.log("File succesfully uploaded.");
        }
      });
    }

    const model = new Model({
      title: req.body.title,
      description: req.body.description,
      video: video,
      userId: req.body.userId,
      userName: req.body.userName,
    });

    await model
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
  } else {
    res.status(500).json({
      message: "Creation failed!",
    });
  }
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

exports.getByChefId = (req, res, next) => {
  Model.find({ userId: req.body.id })
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

exports.getBlogCreatorId = (req, res, next) => {
  Model.find({ userId: req.body.userId })
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
    title: req.body.title,
    description: req.body.description,
    video: video,
    userId: req.body.userId,
    userName: req.body.userName,
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
