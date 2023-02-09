//CRUD Reviews:

//const Review = require("../models/Review");
const Course = require("../models/Course");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/reviews - Get all reviews
exports.getAllCourses = async (req, res, next) => {
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
  const course = await Course.find().limit(limit).skip(offset);
  const totalCoursesInDatabase = await Course.countDocuments();

  return res.json({
    data: Course,
    meta: {
      total: totalCoursesInDatabase,
      limit: limit,
      offset: offset,
      count: course.length,
    },
  });
};

// GET /api/v1/courses/:courseId - Get review by id

/*
exports.getCourseById = async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await courseId.findById(courseId);

  if (!course) throw new NotFoundError("Course does not exist");

  return res.json(course);
};

// POST /api/v1/courses - Create new review
exports.createNewCourse = async (req, res, next) => {
  
  const name = req.body.name;
  const previousKnowledge = req.body.previousKnowledge;
  const instructor = req.body.instructor;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const dayOfWeek = req.body.dayOfWeek;
  const occasions = req.body.occasions;
  const price = req.body.price;
  const danceType = req.body.danceType;
  const level = req.body.level;
  const term = req.body.term;
  const 
  //const restaurantId = req.params.restaurantId || req.body.restaurantId;
  //const userId = req.body.userId;

  let restarantId = null;

  if (req.params.restaurantId) {
    restarantId = req.params.restaurantId;
  } else if (req.body.restaurantId) {
    restarantId = req.body.restaurantId;
  }

  if (!name) throw new BadRequestError("You must provide a comment");
  if (!rating) throw new BadRequestError("You must provide a rating");

  const newReview = await Course.create({
    name: name,
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
/*
  const reviewId = req.params.reviewId;
  const { text, rating } = req.body;
  if (!text && !rating)
    throw new BadRequestError(
      "You must provide a comment and a rating to update."
    );

  const reviewToUpdate = await Course.findById(reviewId);
  if (!reviewToUpdate) throw new NotFoundError("This review does not exist");

  //if (text) reviewToUpdate.text = text;
  //if (rating) reviewToUpdate.rating = rating;
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
/*
  const reviewId = req.params.reviewId;
  const reviewToDelete = await Course.findById(reviewId);
  if (!reviewToDelete) throw new NotFoundError("This review does not exist");
  await reviewToDelete.delete();
  return res.sendStatus(204);
};*/
