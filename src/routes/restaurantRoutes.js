require("express-async-errors");
const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  getRestaurantById,
  createNewRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

const {
  createNewReview,
  getAllReviews,
} = require("../controllers/reviewController");

router.get("/", getAllRestaurants);
router.get("/:restaurantId", getRestaurantById);
router.post("/", createNewRestaurant);
router.put("/:restaurantId", updateRestaurant);
router.delete("/:restaurantId", deleteRestaurant);
//detta :restaurantId är ett dynamiskt värde och det är vår req.params.restaurantId !
//express syntax säger att det är ett dynamiskt värde när vi säger : (kolon) före...
//samma slags metod (tex en get) kan bara ha ett dynamiskt värde, annars om det finns två så tar den alltid den första som matchar (den ser båda som likadana, dvs den första är den som alltid tittas på).

//Nästlade routes:
router.post("/restaurants/:restaurantId/reviews/", createNewReview);
router.get("/restaurants/:restaurantId/reviews/", getAllReviews);
module.exports = router;

//
