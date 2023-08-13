// const PORT = 8000;
// const axios = require("axios").default;
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());

// app.get("/", (req, res) => {
//   const { inputFrom, languageFrom, languageTo } = req.query;
//   const encodedParams = new URLSearchParams();
//   encodedParams.append("q", inputFrom);
//   encodedParams.append("target", languageTo.split(" ")[0]);
//   encodedParams.append("source", languageFrom.split(" ")[0]);

//   const options = {
//     method: "POST",
//     url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "Accept-Encoding": "application/gzip",
//       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//     },
//     data: encodedParams,
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       res.json(response.data.data.translations[0].translatedText);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// });

// app.listen(PORT, () => console.log("Backend is running"));
