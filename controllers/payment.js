const stripe = require("stripe")(
  "sk_test_51HM7HFEUwirnzbs9cgkyOhqAzJNz80OkNFP2kCcnVke91OUjNW3JH6xDTPyY8eqDIL190Lv9vKUPW9JSnHJn3KCc00TOQOFZJ3"
);
const { v4: uuid } = require("uuid");
const Users = require("../models/users-model");

exports.payment = (req, res) => {
  console.log("hit here>>>");
  let { products, token, userName, userId, total } = req.body;
  console.log("req.body;>>>", req.body);

  // let arr = documents.filter((el) => el.userRole == "chef");
  let user;
  products.forEach((ele) => {
    user = documents.filter((obj) => {
      if (obj.userRole == "chef" && ele.userId._id === obj._id) {
        return obj;
      }
    });
  });
  console.log("useruseruseruseruser>>>", user);
  // var onlyInA = arr.filter(comparer(products));
  // var onlyInB = products.filter(comparer2(arr));
  // result = onlyInA.concat(onlyInB);
  // console.log("resultresultresultresult>>>", result);

  const idempontencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: products.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: products.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => {
      Users.find()
        .then((documents) => {
          // console.log("documents>", documents);

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

      res.status(200).json({
        message: "Payment done!",
        result: result,
      });
    })
    .catch((error) => {
      console.log("This is error in stripe :: ", error);
    });
};

// const comparer = (otherArray) => {
//   return (current) => {
//     return (
//       otherArray.filter(function (other) {
//         return other.userId._id == current.userId._id;
//       }).length == 1
//     );
//   };
// };

// const comparer2 = (otherArray) => {
//   return (current) => {
//     return (
//       otherArray.filter(function (other) {
//         return other._id == current._id;
//       }).length == 1
//     );
//   };
// };
