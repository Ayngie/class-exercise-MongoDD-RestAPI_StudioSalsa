const Booking = require("../models/Booking");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD Bookings:

// GET /api/v1/bookings - Get all bookings
exports.getAllBookings = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);

  const offset = Number(req.query?.offset || 0);

  const bookings = await Booking.find().limit(limit).skip(offset);
  const totalBookingsInDatabase = await Booking.countDocuments();

  return res.json({
    data: bookings,
    meta: {
      total: totalBookingsInDatabase,
      limit: limit,
      offset: offset,
      count: bookings.length,
    },
  });
};

// GET /api/v1/bookings/:bookingId - Get booking by id
exports.getBookingById = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  const booking = await Booking.findById(bookingId);

  if (!booking) throw new NotFoundError("This booking does not exist");
  return res.json(booking);
};

// POST /api/v1/bookings - Create new booking
exports.createNewBooking = async (req, res, next) => {
  const { fName, lName, partner, email, mobileNumber, role, course } = req.body;

  if (!fName) throw new BadRequestError("You must provide a firstname");
  if (!lName) throw new BadRequestError("You must provide a lastname");
  if (!email) throw new BadRequestError("You must provide a email");
  if (!mobileNumber)
    throw new BadRequestError("You must provide a mobileNumber");
  if (!role) throw new BadRequestError("You must provide a role");
  if (!course) throw new BadRequestError("You must provide a course");

  const newBooking = await Booking.create({
    fName: fName,
    lName: lName,
    partner: partner,
    email: email,
    mobileNumber: mobileNumber,
    role: role,
    course: course,
  });

  return res

    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/restaurants/${newBooking._id}`
    )
    .status(201)
    .json(newBooking);
};

// PUT /api/v1/bookings/:bookingId - Update booking (by id)
exports.updateBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  const { fName, lName, partner, email, mobileNumber, role, course } = req.body;

  if (!fName) throw new BadRequestError("You must provide a firstname");
  if (!lName) throw new BadRequestError("You must provide a lastname");
  if (!email) throw new BadRequestError("You must provide a email");
  if (!mobileNumber)
    throw new BadRequestError("You must provide a mobileNumber");
  if (!role) throw new BadRequestError("You must provide a role");
  if (!course) throw new BadRequestError("You must provide a course");

  const bookingToUpdate = await Booking.findById(bookingId);

  if (!bookingToUpdate)
    throw new NotFoundError(
      "This booking does not exist, please provide the correct id"
    );

  if (fName) bookingToUpdate.fName = fName;
  if (lName) bookingToUpdate.lName = lName;
  if (partner) bookingToUpdate.partner = partner;
  if (email) bookingToUpdate.email = email;
  if (mobileNumber) bookingToUpdate.mobileNumber = mobileNumber;
  if (role) bookingToUpdate.role = role;
  if (course) bookingToUpdate.course = course;

  const updatedBooking = await bookingToUpdate.save();

  return res.json(updatedBooking);
};

// DELETE /api/v1/bookings/:bookingId - Delete booking (by id)
exports.deleteBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  const bookingToDelete = await Booking.findById(bookingId);

  if (!bookingToDelete) throw new NotFoundError("This booking does not exist");
  await bookingToDelete.delete();
  return res.sendStatus(204);
};
