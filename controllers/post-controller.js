const Model = require("../models/post-model");
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
    let image;
    let image1;
    let image2;
    let image3;
    let image4;
    let video;

    if (req.files.image) {
      image = process.env.URL + "/upload/" + req.files.image.name;
      req.files.image.mv("public/upload/" + req.files.image.name, function (
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
    if (req.files.image1) {
      image1 = process.env.URL + "/upload/" + req.files.image1.name;
      req.files.image1.mv("public/upload/" + req.files.image1.name, function (
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
    if (req.files.image2) {
      image2 = process.env.URL + "/upload/" + req.files.image2.name;
      req.files.image2.mv("public/upload/" + req.files.image2.name, function (
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
    if (req.files.image3) {
      image3 = process.env.URL + "/upload/" + req.files.image3.name;
      req.files.image3.mv("public/upload/" + req.files.image3.name, function (
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
    if (req.files.image4) {
      image4 = process.env.URL + "/upload/" + req.files.image4.name;
      req.files.image4.mv("public/upload/" + req.files.image4.name, function (
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
      price: req.body.price,
      image: image,
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4,
      video: video,
      userId: req.body.userId,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
      type: req.body.type,
      delivery: req.body.delivery,
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
    const model = new Model({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
      type: req.body.type,
      delivery: req.body.delivery,
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
  }
};

// Get
exports.get = (req, res, next) => {
  Model.find()
    .populate("userId")
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
    .populate("userId")
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

exports.getBlogUserId = (req, res, next) => {
  // { userId: req.body.userId }
  Model.find()
    .then((documents) => {
      let arr = [];
      if (documents.length > 0) {
        // arr = documents.filter((ele)=> ele.followerArray)
        // arr = documents.filter((item) => {
        //   return item.followerArray.includes(filter) >= 0;
        // });
        // console.log("postsof creator i followed>", arr);

        // arr = documents.filter(
        //   (ele) => !ele.followerArray.find(({ el }) => el === req.body.id)
        // );

        arr = documents.filter((ele) => {
          return ele.followerArray.find((i) => i === req.body.id);
        });

        // arr = documents.map((el) => {
        //   el.followerArray.filter((x) => {
        //     return x === req.body.id;
        //   });
        //   return el;
        // });

        console.log("postsof creator i followed>", arr);
      }

      res.status(200).json({
        message: "Data fetched!!!",
        list: arr,
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

exports.updateDiscount = (req, res, next) => {
  // console.log(req.body)
  const model = {
    _id: req.body.id,
    price: req.body.price,
  };
  Model.findOneAndUpdate({ _id: req.body.id }, model)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};

exports.updateDiscounttest = (req, res, next) => {
  // console.log(req.body)
  const model = {
    _id: req.body.id,
    price: req.body.price,
  };
  Model.findOneAndUpdate({ _id: req.body.id }, model)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};

exports.update = (req, res, next) => {
  // console.log(req.body)
  const model = new Model({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: image,
    video: video,
    userId: req.body.userId,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPhone: req.body.userPhone,
    type: req.body.type,
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
