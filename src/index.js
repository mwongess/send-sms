const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const { PORT, AFRICAS_TALKING_API_KEY, AFRICAS_TALKING_USERNAME } = process.env;

const credentials = {
  apiKey: AFRICAS_TALKING_API_KEY,
  username: AFRICAS_TALKING_USERNAME,
};

const Africastalking = require("africastalking")(credentials);
const sms = Africastalking.SMS;

app.post("/message", async (req, res) => {
  try {
    const options = req.body;
    const response = await sms.send(options);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT || 4000, () => {
  console.log("Server is up");
});
