import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import eventsRoute from "./routes/events.js"
import usersRoute from "./routes/users.js"

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/users", usersRoute);
app.use("/api/events", eventsRoute);

app.use(function(req, res) {
    res.status(404).json({error: "Not Found"})
})

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})