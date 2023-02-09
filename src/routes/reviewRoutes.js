const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReviewById,
  createNewReview,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/reviewController");

router.get("/", getAllReviews);
router.get("/:reviewId", getReviewById);
router.post("/", createNewReview);
router.put("/:reviewId", updateReviewById);
router.delete("/:reviewId", deleteReviewById);

module.exports = router;
