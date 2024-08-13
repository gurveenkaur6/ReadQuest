import express from "express";
import {PORT} from "./config.js";

const app = express();

// function to listen to the port 
app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
});