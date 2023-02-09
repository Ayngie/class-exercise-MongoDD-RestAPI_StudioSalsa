const User = require("../models/User");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD Users:

// GET /api/v1/users - Get all users
exports.getAllUsers = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query?.offset || 0);

  const users = await User.find().limit(limit).skip(offset);
  const totalUsersInDatabase = await User.countDocuments();

  return res.json({
    data: users,
    meta: {
      total: totalUsersInDatabase,
      limit: limit,
      offset: offset,
      count: users.length,
    },
  });
};

// GET /api/v1/users/:userId - Get user by id
exports.getUserById = async (req, res, next) => {
  const userId = req.params.todoId;

  const user = await User.findById(userId);

  if (!user) throw new NotFoundError("This user does not exist");

  // respond with user data (200 OK)
  return res.json(user);
};

// POST /api/v1/users - Create new user
exports.createNewUser = async (req, res, next) => {
  const name = req.body.name || "";
  const city = req.body.city || "";
  const zipCode = req.body.zipCode || "";
  const aboutMe = req.body.aboutMe || "";
  const eMail = req.body.eMail || "";
  const password = req.body.password || "";

  if (!name) throw new BadRequestError("You must provide a name");
  if (!city) throw new BadRequestError("You must provide a city");
  if (!zipCode) throw new BadRequestError("You must provide a zipCode");
  if (!eMail) throw new BadRequestError("You must provide a eMail");
  if (!password) throw new BadRequestError("You must provide a password");

  const newUser = await User.create({
    name: name,
    city: city,
    zipCode: zipCode,
    aboutMe: aboutMe,
    eMail: eMail,
    password: password,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/users/${newUser._id}`
    )
    .status(201)
    .json(newUser);
};

// PUT /api/v1/users/:userId - Update user (by id)
exports.updateUserById = async (req, res, next) => {
  const userId = req.params.userId;

  const { name, city, zipCode, aboutMe, eMail, password } = req.body;

  //Authorization checking that user is logged in to their own account.
  //If (activeUser != userId) throw new BadRequestError ("You are not authorized to edit this account");

  if (!name && !city && !zipCode && !aboutMe && !eMail && !password)
    throw new BadRequestError(
      "You must provide one of the following to update: name, city, zipCode, aboutMe text, eMail, or password."
    );

  const userToUpdate = await User.findById(userId);
  if (!userToUpdate) throw new NotFoundError("This user does not exist");

  if (name) userToUpdate.name = name;
  if (city) userToUpdate.city = city;
  if (zipCode) userToUpdate.zipCode = zipCode;
  if (aboutMe) userToUpdate.aboutMe = aboutMe;
  if (eMail) userToUpdate.eMail = eMail;
  if (password) userToUpdate.password = password;

  const updatedUSer = await userToUpdate.save();

  return res.json(updatedUSer);
};

// DELETE /api/v1/users/:userId - Delete user (by id)
exports.deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const userToDelete = await User.findById(userId);
  if (!userToDelete) throw new NotFoundError("This user does not exist");

  await userToDelete.delete();

  return res.sendStatus(204);
};
