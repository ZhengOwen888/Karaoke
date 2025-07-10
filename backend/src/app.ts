import express from "express";
import cors from "cors";

// Import the routes
import authRoute from "./routes/authRoute.js";
import profilesRoute from "./routes/profilesRoute.js";
import songsRoute from "./routes/songsRoute.js";

// Initialize the Express app
const app = express();
const PORT = 3000;

// Enable Cross Origin Resource Sharing
app.use(cors());

// Parses json string into json object
app.use(express.json());

// Register the routes
app.use("/auth", authRoute);
app.use("/songs", songsRoute);

// Run the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
