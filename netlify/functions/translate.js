const axios = require("axios").default;

const VALID_LANGUAGES = [
  "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs",
  "bg", "ca", "ceb", "ny", "zh", "co", "hr", "cs", "da", "nl",
  "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de",
  "el", "gu", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is",
  "ig", "id", "ga", "it", "ja", "kn", "kk", "km", "rw", "ko",
  "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms",
  "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "or", "ps",
  "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st",
  "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv",
  "tg", "ta", "tt", "te", "th", "tr", "tk", "uk", "ur", "ug",
  "uz", "vi", "cy", "xh", "yi", "yo", "zu",
];

function validateLanguage(lang) {
  if (!lang || typeof lang !== "string") return false;
  const code = lang.split(" ")[0];
  return VALID_LANGUAGES.includes(code);
}

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(originHeader) {
  const origin =
    ALLOWED_ORIGINS.length === 0
      ? "*"
      : ALLOWED_ORIGINS.includes(originHeader)
        ? originHeader
        : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function json(statusCode, body, headers) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

exports.handler = async (event) => {
  const headers = corsHeaders(event.headers?.origin || event.headers?.Origin);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, headers);
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" }, headers);
  }

  const { text, sourceLanguage, targetLanguage } = body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return json(400, { error: "Text to translate is required" }, headers);
  }
  if (text.trim().length > 5000) {
    return json(
      400,
      { error: "Text exceeds maximum length of 5000 characters" },
      headers,
    );
  }
  if (!validateLanguage(sourceLanguage)) {
    return json(400, { error: "Invalid source language" }, headers);
  }
  if (!validateLanguage(targetLanguage)) {
    return json(400, { error: "Invalid target language" }, headers);
  }

  const sourceCode = sourceLanguage.split(" ")[0];
  const targetCode = targetLanguage.split(" ")[0];

  if (!process.env.RAPIDAPI_KEY) {
    console.error("RAPIDAPI_KEY env var is not set");
    return json(500, { error: "Server is not configured" }, headers);
  }

  try {
    const response = await axios.request({
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
      timeout: 9000,
    });

    const translations = response.data?.data?.translations;
    const translatedTextValue = Array.isArray(translations)
      ? translations[0]?.translatedText
      : translations?.translatedText;
    const translatedText = Array.isArray(translatedTextValue)
      ? translatedTextValue[0]
      : translatedTextValue;

    if (!translatedText) {
      console.error("Invalid API response structure");
      return json(
        500,
        { error: "Translation service returned invalid response" },
        headers,
      );
    }

    return json(200, { translation: translatedText }, headers);
  } catch (error) {
    console.error("Translation error:", error.message);
    return json(
      500,
      { error: "Translation failed. Please try again." },
      headers,
    );
  }
};
