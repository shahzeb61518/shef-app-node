const Followers = require("../models/followers-model");

// exports.create = (req, res, next) => {
//   Followers.find().then((documents) => {
//     const followers = new Followers({
//       followerId: req.body.followerId,
//       followerName: req.body.followerName,
//       followerImage: req.body.followerImage,
//       followingId: req.body.followingId,
//       followingName: req.body.followingName,
//       followingImage: req.body.followingImage,
//       read: req.body.read,
//     });
//     documents.forEach((ele) => {
//       if (
//         ele.followerId != req.body.followerId &&
//         ele.followingId != req.body.followerId
//       ) {
//         followers
//           .save()
//           .then((createdObject) => {
//             console.log(createdObject);
//             res.status(200).json({
//               message: "Created successfully",
//               followers: createdObject,
//             });
//           })
//           .catch((error) => {
//             console.log(error);
//             res.status(500).json({
//               message: "Creation failed!",
//             });
//           });
//       } else {
//         res.status(500).json({
//           message: "Already Following!",
//         });
//       }
//     });
//     res.status(200).json({
//       message: "Data fetched!!!",
//       ist: documents,
//     });
//   });
// };

exports.create = (req, res, next) => {
  Followers.find().then((documents) => {
    const followers = new Followers({
      followerId: req.body.followerId,
      followerName: req.body.followerName,
      followerImage: req.body.followerImage,
      followingId: req.body.followingId,
      followingName: req.body.followingName,
      followingImage: req.body.followingImage,
      read: req.body.read,
    });
    let check = true;
    console.log("documents", documents);
    console.log("documents.length", documents.length);
    if (documents.length > 0) {
      documents.forEach((ele) => {
        // console.log("ele.followerId", ele.followerId);
        // console.log("ele.followingId", ele.followingId);
        // console.log("req.body.followerId", req.body.followerId);
        // console.log("req.body.followingId", req.body.followingId);
        if (
          ele.followerId == req.body.followerId &&
          ele.followingId == req.body.followingId
        ) {
          console.log("check in loop if>>>>>>>.", check);
          return (check = false);
        }
      });
      console.log("check>>>>>>>.", check);
      if (check == true) {
        followers
          .save()
          .then((createdObject) => {
            console.log(createdObject);
            res.status(200).json({
              message: "Created successfully",
              followers: createdObject,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: "Creation failed!",
            });
          });
      } else {
        res.status(200).json({
          message: "Your Are Already Following This Persone!",
        });
      }
    } else {
      console.log("hit else part>>");
      followers
        .save()
        .then((createdObject) => {
          console.log(createdObject);
          res.status(200).json({
            message: "Created successfully",
            followers: createdObject,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Creation failed!",
          });
        });
    }
  });
};

// Get
exports.get = (req, res, next) => {
  Followers.find()
    .then((documents) => {
      res.status(200).json({
        message: "Data fetched!!!",
        ist: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// Get  By FollowingID
exports.getByFollowingId = (req, res, next) => {
  console.log("req.body.followingId", req.body.followingId);
  Followers.find({ followingId: req.body.followingId }).then((result) => {
    if (!result)
      return res
        .status(404)
        .json({ status: false, message: "result  not found." });
    // console.log(user);
    else return res.status(200).json(result);
  });
};

// Get  By FollowerID
exports.getByFollowerId = (req, res, next) => {
  console.log("req.body.followerId", req.body.followerId);
  Followers.find({ followerId: req.body.followerId }).then((result) => {
    if (!result)
      return res
        .status(404)
        .json({ status: false, message: "result  not found." });
    // console.log(user);
    else return res.status(200).json(result);
  });
};

exports.getChatUsers = (req, res, next) => {
  console.log("get chat followerId", req.body.followingId);
  // { followerId: req.body.followerId }
  Followers.find().then((result) => {
    if (result) {
      result = result.filter(
        (obj) =>
          obj.followingId === req.body.followingId &&
          obj.followerId === req.body.followingId
      );
      return res.status(200).json(result);
    } else {
      return res
        .status(404)
        .json({ status: false, message: "result  not found." });
      // console.log(user);
    }
  });
};

// // Delete
exports.delete = (req, res, next) => {
  Followers.deleteOne({ _id: req.body.id })
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
  const followers = new Followers({
    _id: req.body.id,
    followerId: req.body.followerId,
    followerName: req.body.followerName,
    followingId: req.body.followingId,
    followingName: req.body.followingName,
    read: req.body.read,
  });
  Followers.updateOne({ _id: req.body.id }, followers)
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

exports.updateFollowerRead = (req, res, next) => {
  const followers = new Followers({
    _id: req.body.id,
    read: req.body.read,
  });
  Followers.updateOne({ _id: req.body.id }, followers)
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
