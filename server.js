const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", "good morning");
  encodedParams.append("target", ("es" || "").split(" ")[0]);
  encodedParams.append("source", ("en" || "").split(" ")[0]);
  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error(error);
  }
});
app.listen(PORT, () => console.log("Backend is running"));
