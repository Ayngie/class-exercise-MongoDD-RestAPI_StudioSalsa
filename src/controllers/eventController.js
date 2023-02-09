const Event = require("../models/Event");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD events:

// GET /api/v1/events - Get all events
exports.getAllEvents = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query?.offset || 0);

  const events = await Event.find().limit(limit).skip(offset);
  const totalEventsInDatabase = await Event.countDocuments();

  return res.json({
    data: events,
    meta: {
      total: totalEventsInDatabase,
      limit: limit,
      offset: offset,
      count: events.length,
    },
  });
};

// GET /api/v1/events/:eventId - Get event by id
exports.getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  const event = await Event.findById(eventId);

  if (!event) throw new NotFoundError("This event does not exist");

  // respond with event data (200 OK)
  return res.json(event);
};

// POST /api/v1/events - Create new event
exports.createNewEvent = async (req, res, next) => {
  const name = req.body.name || "";
  const startDate = req.body.startDate || "";
  const endDate = req.body.endDate || "";
  const startTime = req.body.startTime|| "";
  const endTime = req.body.endTime|| "";
  const location = req.body.location || { };
  const desc = req.body.desc || "";


  if (!name) throw new BadRequestError("You must provide a name");
  if (!startDate) throw new BadRequestError("You must provide a start date");
  if (!endDate) throw new BadRequestError("You must provide a end date");
  if (!startTime) throw new BadRequestError("You must provide a start time");
  if (!endTime) throw new BadRequestError("You must provide a end time");
  if (!location) throw new BadRequestError("You must provide a location");

  const newEvent = await Event.create({
    name: name,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    location: location
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/events/${newEvent._id}`
    )
    .status(201)
    .json(newEvent);
};

// PUT /api/v1/events/:eventId - Update event (by id)
exports.updateEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  const {    name,
    startDate,
    endDate,
    startTime,
    endTime,
    location } = req.body;

  //Authorization checking that event is logged in to their own account.
  //If (activeEvent!= eventId) throw new BadRequestError ("You are not authorized to edit this account");

  if (!name && !startDate && !endDate && !startTime && !endTime && !location)
    throw new BadRequestError(
      "You must provide one of the following to update: name, start date, end date,  start time, end time, location"
    );

  const eventToUpdate = await Event.findById(eventId);
  if (!eventToUpdate) throw new NotFoundError("This event does not exist");

  if (name) eventToUpdate.name = name;
  if (startDate) eventToUpdate.startDate = startDate;
  if (endDate) eventToUpdate.endDate = endDate;
  if (startTime) eventToUpdate.endTime = startTime;
  if (endTime) eventToUpdate.endTime = endTime;
  if (location) eventToUpdate.location = location;

  const updatedEvent = await eventToUpdate.save();

  return res.json(updatedEvent);
};

// DELETE /api/v1/events/:eventId - Delete event (by id)
exports.deleteEventById = async (req, res, next) => {
  const eventId = req.params.eventId;
  const eventToDelete = await Event.findById(eventId);
  if (!eventToDelete) throw new NotFoundError("This event does not exist");

  await eventToDelete.delete();

  return res.sendStatus(204);
};
