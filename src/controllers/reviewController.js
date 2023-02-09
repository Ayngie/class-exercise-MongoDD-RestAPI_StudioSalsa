//CRUD Reviews:

const Review = require("../models/Review");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/reviews - Get all reviews
exports.getAllReviews = async (req, res, next) => {
  /*try {
    return res.send("Get all reviews"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  } */

  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query.offset || 0);
  const review = await Review.find().limit(limit).skip(offset);
  const totalReviewsInDatabase = await Review.countDocuments();

  return res.json({
    data: Review,
    meta: {
      total: totalReviewsInDatabase,
      limit: limit,
      offset: offset,
      count: review.length,
    },
  });
};

// GET /api/v1/reviews/:reviewId - Get review by id
exports.getReviewById = async (req, res, next) => {
  /*try {
    return res.send("Get review by id"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/
  const reviewId = req.params.reviewId;
  const review = await reviewId.findById(reviewId);

  if (!review) throw new NotFoundError("Review does not exist");

  return res.json(review);
};

// POST /api/v1/reviews - Create new review
exports.createNewReview = async (req, res, next) => {
  /*try {
    return res.send("Create new review"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/
  const text = req.body.text;
  const rating = req.body.rating;
  const restaurantId = req.params.restaurantId || req.body.restaurantId;
  const userId = req.body.userId;

  let restarantId = null;

  if (req.params.restaurantId) {
    restarantId = req.params.restaurantId;
  } else if (req.body.restaurantId) {
    restarantId = req.body.restaurantId;
  }

  if (!text) throw new BadRequestError("You must provide a comment");
  if (!rating) throw new BadRequestError("You must provide a rating");

  const newReview = await Review.create({
    text: text,
    rating: rating,
    restaurantId: restaurantId,
    userId: userId,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/reviews/${newReview._id}`
    )
    .status(201)
    .json(newReview);
};

// PUT /api/v1/reviews/:reviewId - Update review (by id)
exports.updateReviewById = async (req, res, next) => {
  /*try {
    return res.send("Update review"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const reviewId = req.params.reviewId;
  const { text, rating } = req.body;
  if (!text && !rating)
    throw new BadRequestError(
      "You must provide a comment and a rating to update."
    );

  const reviewToUpdate = await Review.findById(reviewId);
  if (!reviewToUpdate) throw new NotFoundError("This review does not exist");

  if (text) reviewToUpdate.text = text;
  if (rating) reviewToUpdate.rating = rating;
  const updatedReview = await reviewToUpdate.save();

  // Craft response (return updated project)
  return res.json(updatedReview);
};

// DELETE /api/v1/reviews/:reviewId - Delete review (by id)
exports.deleteReviewById = async (req, res, next) => {
  /*try {
    return res.send("Delete review"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const reviewId = req.params.reviewId;
  const reviewToDelete = await Review.findById(reviewId);
  if (!reviewToDelete) throw new NotFoundError("This review does not exist");
  await reviewToDelete.delete();
  return res.sendStatus(204);
};
