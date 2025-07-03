import express from "express";
import cors from "cors";

// Import the routes
import usersRoute from "./routes/usersRoute.js";
import songsRoute from "./routes/songsRoute.js";
import favoritesRoute from "./routes/favoritesRoute.js";
import scoresRoute from "./routes/scoresRoute.js";

// Initialize the Express app
const app = express();
const PORT = 5000;

// Enable Cross Origin Resource Sharing
app.use(cors());

// Parses json string into json object
app.use(express.json());

// Register the routes
app.use("/user", usersRoute);
app.use("/song", songsRoute);
app.use("/favorite", favoritesRoute);
app.use("/score", scoresRoute);

// Run the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
