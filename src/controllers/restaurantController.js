const Restaurant = require("../models/Restaurant");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD Restaurants:

// GET /api/v1/restaurants - Get all restaurants
exports.getAllRestaurants = async (req, res, next) => {
  /*try {
    return res.send("Get all restaurants"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/
  const limit = Number(req.query?.limit || 10);

  const offset = Number(req.query?.offset || 0);

  const restaurants = await Restaurant.find().limit(limit).skip(offset);
  const totalRestaurantsInDatabase = await Restaurant.countDocuments();

  return res.json({
    data: restaurants,
    meta: {
      total: totalRestaurantsInDatabase,
      limit: limit,
      offset: offset,
      count: restaurants.length,
    },
  });
};

// GET /api/v1/restaurants/:restaurantId - Get restaurant by id
exports.getRestaurantById = async (req, res, next) => {
  /* try {
    return res.send("Get restaurant by id"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const restaurantId = req.params.restaurantId;

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) throw new NotFoundError("This restaurant does not exist");
  return res.json(restaurant);
};

// POST /api/v1/restaurants - Create new restaurant
exports.createNewRestaurant = async (req, res, next) => {
  /*try {
    return res.send("Create new restaurant"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const name = req.body.name;
  const description = req.body.description;

  if (!name) throw new BadRequestError("You must provide a name");

  const newRestaurant = await Restaurant.create({
    name: name,
    description: description,
  });

  return res

    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/restaurants/${newRestaurant._id}`
    )
    .status(201)
    .json(newRestaurant);
};

// PUT /api/v1/restaurants/:restaurantId - Update restaurant (by id)
exports.updateRestaurant = async (req, res, next) => {
  /*try {
    return res.send("Update restaurant"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const restaurantId = req.params.restaurantId;

  const { name, desc } = req.body;

  if (!name && !desc)
    throw new BadRequestError(
      "You must provide a name or a description to update the restaurant"
    ); // if (!admin) return response.sendStatus(403) i.e. only admin can access this route to update restaurant

  const restaurantToUpdate = await Restaurant.findById(restaurantId);

  if (!restaurantToUpdate)
    throw new NotFoundError(
      "This restaurant does not exist, please provide the correct id"
    );

  if (name) restaurantToUpdate.name = name;
  if (desc) restaurantToUpdate.desc = desc;
  const updatedRestaurant = await restaurantToUpdate.save();

  return res.json(updatedRestaurant);
};

// DELETE /api/v1/restaurants/:restaurantId - Delete restaurant (by id)
exports.deleteRestaurant = async (req, res, next) => {
  /* try {
    return res.send("Delete restaurant"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }*/

  const restaurantId = req.params.restaurantId;

  const restaurantToDelete = await Restaurant.findById(restaurantId);

  // if (!admin) return response.sendStatus(403) i.e. only admin can access this route to update restaurant

  if (!restaurantToDelete) throw new NotFoundError("This hotel does not exist");
  await restaurantToDelete.delete();
  return res.sendStatus(204);
};
