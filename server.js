// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("public"));

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Weather-Journal App listening on port ${port}!`);
});

app.get("/weather", (req, res) => {
  console.log(`projectData: ${JSON.stringify(projectData)}`);
  res.send(projectData);
});

app.post("/weather", (req, res) => {
  projectData.date = req.body.date;
  projectData.temperature = req.body.main.temp;
  projectData.feelings = req.body.feelings;
  res.end();
});
