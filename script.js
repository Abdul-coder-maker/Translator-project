let switchBtn = document.getElementById("switch-btn");
let languageFromInput = document.getElementById("lang-from");
let languageFromSelect = document.getElementById("language-select-from");
let languageToSelect = document.getElementById("language-select-to");
let languageToInput = document.getElementById("lang-to");
languageFromInput.value = "";
languageFromSelect.addEventListener("click", () => {
  languageFromInput.setAttribute("lang", `${languageFromSelect.value}`);
});
languageToSelect.addEventListener("click", () => {
  languageToInput.setAttribute("lang", `${languageToSelect.value}`);
});
let translateBtn = document.getElementById("translate-btn");

switchBtn.addEventListener("click", () => {
  [languageFromSelect.value, languageToSelect.value] = [
    languageToSelect.value,
    languageFromSelect.value,
  ];
});
let theKey;
const getKey = {
  method: "GET",
  url: "https://translated-mymemory---translation-memory.p.rapidapi.com/createkey",
  headers: {
    "x-rapidapi-host":
      "translated-mymemory---translation-memory.p.rapidapi.com",
    "x-rapidapi-key": "My_rapidAPI_KEY",
  },
};

axios
  .request(getKey)
  .then(function (response) {
    theKey = response.data.key;
  })
  .catch(function (error) {
    console.error(error);
  });
function getTranslation(input, output) {
  const options = {
    method: "GET",
    url: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
    params: {
      q: `${input}`,
      langpair: `${languageFromSelect.value.split(" ")[0]}|${
        languageToSelect.value.split(" ")[0]
      }`,
      de: "a@b.c",
      onlyprivate: "0",
      mt: "1",
      key: `${theKey}`,
    },
    headers: {
      "x-rapidapi-host":
        "translated-mymemory---translation-memory.p.rapidapi.com",
      "x-rapidapi-key": "My_rapidAPI_KEY",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.responseData.translatedText);
      if (
        response.data.responseData.translatedText !==
        "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT"
      ) {
        languageToInput.innerHTML = response.data.responseData.translatedText;
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
translateBtn.addEventListener("click", (e) => {
  getTranslation(languageFromInput.value);
});

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    languageFromInput.setAttribute("rows", "6");
    languageToInput.setAttribute("rows", "6");
  } else {
    languageFromInput.setAttribute("rows", "12");
    languageToInput.setAttribute("rows", "12");
  }
}

var x = window.matchMedia("(max-width: 768px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

document.getElementById("playAudioBtnFrom").addEventListener("click", () => {
  const options = {
    method: "GET",
    url: "https://voicerss-text-to-speech.p.rapidapi.com/",
    params: {
      hl: `${languageFromSelect.value.split(" ")[1]}`,
      src: `${languageFromInput.value}`,
      key: "key",
      f: "8khz_8bit_mono",
      c: "mp3",
      r: "0",
      b64: true,
    },
    headers: {
      "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
      "x-rapidapi-key": "My_rapidAPI_KEY",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      if (response.data = "ERROR: The language does not support!") {
          document.getElementById("no-supoort-lang-from").classList.remove("hidden")
      }
      let newAudio = new Audio(`${response.data}`);
      newAudio.play();
    })
    .catch(function (error) {
      console.error(error);
    });
});

document.getElementById("playAudioBtnTo").addEventListener("click", () => {
  const options = {
    method: "GET",
    url: "https://voicerss-text-to-speech.p.rapidapi.com/",
    params: {
      hl: `${languageToSelect.value.split(" ")[1]}`,
      src: `${languageToInput.value}`,
      key: "key",
      f: "8khz_8bit_mono",
      c: "mp3",
      r: "0",
      b64: true,
    },
    headers: {
      "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
      "x-rapidapi-key": "My_rapidAPI_KEY",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      if (response.data === "ERROR: The language does not support audio!") {
        document
          .getElementById("no-supoort-lang-to")
          .classList.remove("hidden");
      }
      let newAudio = new Audio(`${response.data}`);
      newAudio.play();
    })
    .catch(function (error) {
      console.error(error);
    });
});

document.getElementById("year").textContent = new Date().getFullYear();

let copyBtn = document.querySelector("#copy-btn");
copyBtn.addEventListener("click", async (event) => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return;
  }
  const text = `${languageToInput.value}`;
  try {
    await navigator.clipboard.writeText(text);
    event.target.textContent = "Copied to clipboard";
  } catch (err) {
    console.error("Failed to copy!", err);
  }
  copyBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg>
  `;
  setTimeout(() => {
    copyBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
</svg>
    `;
  }, 3000);
});
