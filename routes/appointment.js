const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

router.get("/appointments", async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
});

router.post("/appointment", async (req, res, next) => {
  let newAppointment = new Appointment({
    appointmentDate: req.body.appointmentDate,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    newAppointment = await newAppointment.save();
    res.status(200).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

router.delete("/appointment/:id", async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json("Appointment has been deleted!");
  } catch (error) {
    next(error);
  }
});

router.get("/appointment/:id", async (req, res, next) => {
  try {
    const appointment = new Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
