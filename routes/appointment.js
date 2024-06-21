const express = require("express");
const { createClient } = require("redis");
const router = express.Router();
const Appointment = require("../models/appointment");

const client = createClient();

client.on("error", (err) => console.log("Redis client error", err));
client.connect();

router.get("/appointments", async (req, res, next) => {
  try {
    const cachedData = await client.get("appointments");

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const appointments = await Appointment.find();
    client.set("appointments", JSON.stringify(appointments));
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
    const id = req.params.id;
    const cachedAppointment = await client.get(`appointment-${id}`);

    if (cachedAppointment) {
      return res.json(JSON.parse(cachedAppointment));
    }

    const appointment = await Appointment.findById(id);
    client.set(`appointment-${id}`, JSON.stringify(appointment));
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
