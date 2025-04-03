import { query } from "../utils/connectToDB.js";
import { createUsersTableQuery, getAllUsersQuery } from "../utils/sqlQuery.js";

export async function getAllUsers(req, res, next) {
    try {
        const response = await query(`
            SELECT to_regclass('users')
        `);
        if (!response.rows[0].to_regclass) {
            await query(createUsersTableQuery);
        }
        const {rows} = await query(getAllUsersQuery);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error.message);
    }
}