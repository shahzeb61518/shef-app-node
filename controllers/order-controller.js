const Model = require("../models/order-model");

exports.create = async (req, res, next) => {
  console.log("body", req.body);

  const model = new Model({
    // product: req.body.product,
    // quantity: req.body.quantity,
    // price: req.body.price,
    // total: req.body.total,
    // discount: req.body.discount,
    // shipping: req.body.shipping,
    itemArray: req.body.itemArray,
    userId: req.body.userId,
    userName: req.body.userName,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    status: req.body.status,
    total: req.body.total,
    pickup: req.body.pickup,
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
};

// Get
exports.get = (req, res, next) => {
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

exports.getByChefId = (req, res, next) => {
  Model
    .find
    // { userId: req.body.id }
    ()
    .then((documents) => {
      // let arr2;
      // documents.filter((ele) => {
      //   arr2 = ele.itemArray.filter((ele) => ele.userId === req.body.id);
      //   if (arr2.length > 0) {
      //     console.log("placed order>>", arr2);
      //     return arr2;
      //   } else {
      //     return [];
      //   }
      // });

      // let arr;
      // let arr2;
      // documents.forEach((el) => {
      //   arr2 = el.itemArray.filter((el) => el.userId === req.body.id);
      // });
      // console.log("placed order>>", arr2);

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

exports.updateOrderStatus = (req, res, next) => {
  let date = new Date();
  date.toString;
  const model = {
    _id: req.body.id,
    status: req.body.status,
    delivered_at: date,
  };
  Model.findOneAndUpdate({ _id: req.body.id }, model)
    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};

exports.updateOrderPickup = (req, res, next) => {
  const model = {
    _id: req.body.id,
    pickup: req.body.pickup,
  };
  Model.findOneAndUpdate({ _id: req.body.id }, model)
    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};

exports.updateOrderTime = (req, res, next) => {
  console.log("log", req.body);
  const model = {
    _id: req.body.id,
    deliverTime: req.body.deliverTime,
    deliverDate: req.body.deliverDate,
  };
  Model.findOneAndUpdate({ _id: req.body.id }, model)
    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
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
    // product: req.body.product,
    // quantity: req.body.quantity,
    // price: req.body.price,
    // total: req.body.total,
    // discount: req.body.discount,
    // shipping: req.body.shipping,
    itemArray: req.body.itemArray,
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
