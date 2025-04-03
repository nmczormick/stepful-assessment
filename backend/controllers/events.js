import { query } from "../utils/connectToDB.js";
import { 
    createEventsTableQuery, 
    getAllEventsQuery, 
    createEventQuery, 
    updateEventQuery
} from "../utils/sqlQuery.js";

export async function getAllEvents(req, res, next) {
    try {
        const response = await query(`
            SELECT to_regclass('events')
        `);
        if (!response.rows[0].to_regclass) {
            await query(createEventsTableQuery);
        }
        const {rows} = await query(getAllEventsQuery);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error.message);
    }
}

export async function createEvent(req, res, next) {
    try {
        const {date, startTime, endTime, coachName, coachPhone} = req.body;
        if (!date || !startTime || !endTime || !coachName || !coachPhone) {
            return res.status(400).json({error: "Missing required fields"});
        }
        const data = await query(createEventQuery, [
            date,
            startTime,
            endTime,
            coachName,
            coachPhone,
        ]);
        res.status(201).json(data.rows[0])
    } catch (error) {
        console.log(error.message);
    }
}
export async function updateEvent(req, res, next) {
    try {
        const {id} = req.params;
        const {
            date,
            startTime, 
            endTime,
            coachName,
            coachPhone,
            studentName,
            studentPhone,
            studentSatisfaction,
            notes
        } = req.body;
        const result = await query(updateEventQuery, [
            date,
            startTime, 
            endTime,
            coachName,
            coachPhone,
            studentName,
            studentPhone,
            studentSatisfaction,
            notes,
            id
        ]);
        if (result.rowCount === 0) {
            return res.status(400).json({error: "event not found"})
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

