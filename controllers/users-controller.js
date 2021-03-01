const Users = require("../models/users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Create User Account
exports.create = (req, res, next) => {
  let date = new Date();
  date.toString;
  // bcrypt.hash(req.body.userPassword, 10).then(hash => {
  // console.log("dataaaa", req.body)
  let email = req.body.userEmail;
  email = email.toLowerCase();
  const users = new Users({
    userEmail: email,
    userName: req.body.userName,
    phone: req.body.phone,
    userPassword: req.body.userPassword,
    userRole: req.body.userRole,
    available: false,
    joinDate: date,
    type: req.body.type,
    zip: req.body.zip,
    paypalId: req.body.paypalId,
  });
  users
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
      console.log("error", err);
    });
  // });
};

// User login
exports.login = (req, res, next) => {
  let fetchedUser;
  let email = req.body.userEmail;
  email = email.toLowerCase();
  Users.findOne({ userEmail: req.body.userEmail })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          message: "Invalid email or password",
        });
      }
      fetchedUser = user;
      // return bcrypt.compare(req.body.userPassword, user.userPassword);
      return req.body.userPassword === user.userPassword;
    })
    .then((result) => {
      if (!result) {
        return res.status(200).json({
          message: "Invalid email or password",
        });
      }
      console.log("fetchedUser>>>>", fetchedUser);
      const token = jwt.sign(
        {
          userEmail: fetchedUser.userEmail,
          userId: fetchedUser._id,
          namef: fetchedUser.userName,
          phone: fetchedUser.phone,
          role: fetchedUser.userRole,
        },
        "secret_this_should_be_longer",
        { expiresIn: "10h" }
      );
      res.status(200).json({
        token: token,
        role: fetchedUser.userRole,
        expiresIn: 360000,
        userId: fetchedUser._id,
        userName: fetchedUser.userName,
        phone: fetchedUser.phone,
        userEmail: fetchedUser.userEmail,
        available: fetchedUser.available,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};

// Get user
exports.get = (req, res, next) => {
  Users.find()
    .then((documents) => {
      // console.log(documents);
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

exports.getChefs = (req, res, next) => {
  Users.find()
    .then((documents) => {
      let arr2 = documents.filter((el) => el.userRole == "chef");
      res.status(200).json({
        message: "Data fetched!!!",
        list: arr2,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

exports.getChefZip = (req, res, next) => {
  Users.find({ zip: req.body.zip })
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

exports.getAll = (req, res, next) => {
  Users.find()
    .then((documents) => {
      documents = documents.filter((el) => el.userRole === "chef");
      let arr2 = documents.slice(0, 3);
      res.status(200).json({
        message: "Data fetched!!!",
        list: arr2,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// // Delete user
exports.delete = (req, res, next) => {
  Users.deleteOne({ _id: req.body.id })
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

exports.udpateAvail = (req, res, next) => {
  const users = {
    _id: req.body.id,
    available: req.body.available,
  };
  Users.findOneAndUpdate({ _id: req.body.id }, users)
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

//   // Update User
exports.update = (req, res, next) => {
  // console.log(req.body)
  // bcrypt.hash(req.body.userPassword, 10).then(hash => {

  // let url = "https://shef-node.herokuapp.com";
  // let url = "http://localhost:4003";

  if (req.files) {
    let file = process.env.URL + "/upload/" + req.files.profileImage.name;
    req.files.profileImage.mv(
      "public/upload/" + req.files.profileImage.name,
      function (error) {
        if (error) {
          console.log("Couldn't upload file");
          console.log(error);
        } else {
          console.log("File succesfully uploaded.");
        }
      }
    );

    const users = {
      _id: req.body.id,
      // userRole: req.body.userRole,
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      profileImage: file,
      aboutMe: req.body.aboutMe,
      location: req.body.location,
      creditCard: req.body.creditCard,
      emailVerify: req.body.emailVerify,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      phone: req.body.phone,
      instagram: req.body.instagram,
      type: req.body.type,
      paypalId: req.body.paypalId,
    };
    Users.findOneAndUpdate({ _id: req.body.id }, users)
      .then((result) => {
        if (result) {
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
  } else {
    const users = {
      _id: req.body.id,
      // userRole: req.body.userRole,
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      aboutMe: req.body.aboutMe,
      location: req.body.location,
      creditCard: req.body.creditCard,
      emailVerify: req.body.emailVerify,
      facebook: req.body.facebook,
      phone: req.body.phone,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      paypalId: req.body.paypalId,
    };
    Users.findOneAndUpdate({ _id: req.body.id }, users)
      .then((result) => {
        if (result) {
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
  }

  // });
};

// Get User By Id
exports.getById = (req, res, next) => {
  Users.findById(req.body.id).then((user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    // console.log(user);
    else return res.status(200).json(user);
  });
};
