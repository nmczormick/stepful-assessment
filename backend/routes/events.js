import express from "express"
import { getAllEvents, createEvent, updateEvent } from "../controllers/events.js";

const router = express.Router();

// Get all events for all users
router.get("/", getAllEvents);

// Create event with date, start time, end time, coach first and last name, coach phone number
router.post("/", createEvent);

// Update event with student notes and student satisfaction score
router.put("/:id", updateEvent);

export default router;