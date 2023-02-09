//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//BEHÖVER GÖRAS OM! Finns inte längre en booking model, den är nu embeddad i course.
const { NotFoundError, BadRequestError } = require("../utils/errors");
const Course = require("../models/Course");

//CRUD Bookings:
// GET /api/v1/bookings - Get all bookings
exports.getAllBookings = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);

  const offset = Number(req.query?.offset || 0);

  const courses = await Course.find({}, { bookings: true }) //tomt objekt först = hämta allt, andra objektet = vilken data i dokumentet vill vi ha tillbaka (vilka fält i vår model) filter av vad vi vill ha tillbaka //levererar en array m alla objekt som har en booking i sig.
    .limit(limit)
    .skip(offset);
  // const totalBookingsInDatabase = await Booking.countDocuments();

  // console.log(bookings);

  const bookingDataOnly = [];
  courses.forEach((course) => {
    course.bookings.forEach((booking) => {
      bookingDataOnly.push(booking);
    });
  });

  return res.json({
    data: bookingDataOnly,
    meta: {
      // total: totalBookingsInDatabase,
      limit: limit,
      offset: offset,
      count: bookingDataOnly.length,
    },
  });
};

// GET /api/v1/bookings/:bookingId - Get booking by id
exports.getBookingById = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  //hämtar kursen som inneh den boknings vi är ute efter
  const course = await Course.findOne({ "bookings._id": bookingId });
  //filtrerar fram datan för vår specifika bokning
  const booking = course.bookings.find((booking) => booking._id == bookingId); //levererar true/false - forts tills hittar en true match av id:n

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
