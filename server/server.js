import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB and start the server
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success");
});

// Import routes using ES modules
import complainRouter from './routes/complain.js';

// Use the router properly
app.use("/complain", complainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
