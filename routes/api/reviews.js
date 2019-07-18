const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateReviewInput = require("../../validation/review");
const Review = require("../../models/Review");
const User = require("../../models/User");

router.get("/", (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then(review => res.json(review))
    .catch(err =>
      req.status(404).json({ noreviewsfound: "No Posts found with That ID" })
    );
});

router.get("/:id", (req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err =>
      req.status(404).json({ noreviewsfound: "No Review found with That ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newReview = new Review({
      text: req.body.text,
      title: req.body.title,
      name: req.body.name,
      user: req.user.id
    });
    newReview.save().then(review => res.json(review));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Review.findById(req.params.id)
        .then(review => {
          if (review.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          review.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ reviewnotfound: "No Post Found" })
        );
    });
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked the review" });
          }

          review.likes.unshift({ user: req.user.id });
          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "No Review Found" })
        );
    });
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked the review" });
          }

          const removeIndex = review.likes
            .map(item.user.toString())
            .indexOf(req.user.id);
          review.likes.splice(removeIndex, 1);

          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "No Review Found" })
        );
    });
  }
);

module.exports = router;
