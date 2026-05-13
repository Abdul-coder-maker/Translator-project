const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Middleware - Security fixes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - only allow localhost:3000
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: false,
  }),
);

// Rate limiting - prevent DoS attacks (max 30 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many requests, please try again later",
});
app.use(limiter);

// Validate language codes against whitelist
const VALID_LANGUAGES = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "az",
  "eu",
  "be",
  "bn",
  "bs",
  "bg",
  "ca",
  "ceb",
  "ny",
  "zh",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "tl",
  "fi",
  "fr",
  "fy",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "haw",
  "iw",
  "hi",
  "hmn",
  "hu",
  "is",
  "ig",
  "id",
  "ga",
  "it",
  "ja",
  "kn",
  "kk",
  "km",
  "rw",
  "ko",
  "ku",
  "ky",
  "lo",
  "la",
  "lv",
  "lt",
  "lb",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mn",
  "my",
  "ne",
  "no",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sm",
  "gd",
  "sr",
  "st",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "es",
  "su",
  "sw",
  "sv",
  "tg",
  "ta",
  "tt",
  "te",
  "th",
  "tr",
  "tk",
  "uk",
  "ur",
  "ug",
  "uz",
  "vi",
  "cy",
  "xh",
  "yi",
  "yo",
  "zu",
];

function validateLanguage(lang) {
  if (!lang || typeof lang !== "string") return false;
  const code = lang.split(" ")[0];
  return VALID_LANGUAGES.includes(code);
}

// POST endpoint for translation with input validation
app.post("/translate", async (req, res) => {
  try {
    // Extract and validate input
    const { text, sourceLanguage, targetLanguage } = req.body;

    // Input validation
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ error: "Text to translate is required" });
    }

    if (text.trim().length > 5000) {
      return res
        .status(400)
        .json({ error: "Text exceeds maximum length of 5000 characters" });
    }

    if (!validateLanguage(sourceLanguage)) {
      return res.status(400).json({ error: "Invalid source language" });
    }

    if (!validateLanguage(targetLanguage)) {
      return res.status(400).json({ error: "Invalid target language" });
    }

    // Extract language codes
    const sourceCode = sourceLanguage.split(" ")[0];
    const targetCode = targetLanguage.split(" ")[0];

    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      },
      data: {
        q: text.trim(),
        source: sourceCode,
        target: targetCode,
      },
    };

    const response = await axios.request(options);

    const translations = response.data?.data?.translations;
    const translatedTextValue = Array.isArray(translations)
      ? translations[0]?.translatedText
      : translations?.translatedText;

    const translatedText = Array.isArray(translatedTextValue)
      ? translatedTextValue[0]
      : translatedTextValue;

    // Validate API response structure
    if (!translatedText) {
      console.error("Invalid API response structure");
      return res
        .status(500)
        .json({ error: "Translation service returned invalid response" });
    }

    res.json({
      translation: translatedText,
    });
  } catch (error) {
    // Sanitize error logging - don't expose sensitive details
    console.error("Translation error:", error.message);
    res.status(500).json({ error: "Translation failed. Please try again." });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.listen(PORT, () => console.log("Backend is running"));
