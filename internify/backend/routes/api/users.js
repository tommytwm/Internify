var express = require("express");
var router = express.Router();
var UserData = require("../../models/UserData");

//@route    GET api/users/
//@desc     Get All User Documents
//@access   Public (?)

router.get("/", function (req, res, next) {
  UserData.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route    GET api/users/:id
//@desc     Get single User Document
//@access   Public

router.get("/:id", function (req, res, next) {
  UserData.findById(req.params.id)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route    POST api/users
//@desc     Create a User document
//@access   Public

router.post("/", function (req, res, next) {
  // flesh out a new user
  var newUser = new UserData({
    authId: req.body.authId,
    name: req.body.name,
    email: req.body.email,
    profilePicture: req.body.profilePicture,
    handle: req.body.handle,
    company: req.body.company,
    title: req.body.title,
    bio: req.body.bio,
    location: req.body.location,
    contact: req.body.contact,
    linkedIn: req.body.linkedIn,
    website: req.body.website,
    jobPostings: req.body.jobPostings,
    status: req.body.status,
  });

  // save new user to database
  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route    DELETE api/:id
//@desc     DELETE a User document
//@access   Public (?)

router.delete("/:id", function (req, res, next) {
  UserData.findById(req.params.id)
    .then((user) =>
      user.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

//@route    UPDATE api/update/:id
//@desc     UPDATE a User document
//@access   Public (?)
// change this so that the user is searched by the uId, which is a field.
router.post("/update/:id", function (req, res, next) {
  UserData.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name ? req.body.name : user.name;
      user.title = req.body.title ? req.body.title : user.title;
      user.handle = req.body.handle ? req.body.handle : user.handle;
      user.email = req.body.email ? req.body.email : user.email;
      user.location = req.body.location ? req.body.location : user.location;
      user.bio = req.body.bio ? req.body.bio : user.bio;
      user.contactNumber = req.body.contactNumber
        ? req.body.contactNumber
        : user.contactNumber;
      user.website = req.body.website ? req.body.website : user.website;
      user.linkedIn = req.body.linkedIn ? req.body.linkedIn : user.linkedIn;
      user.status = req.body.status ? req.body.status : user.status;
      user.company = req.body.company ? req.body.company : user.company;

      user
        .save()
        .then(() => {
          console.log(user);
          // do something more here...
          // perhaps get the profile page to update with this new information?
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
