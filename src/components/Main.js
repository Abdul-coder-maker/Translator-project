import React from "react";
import axios from "axios";
function Main() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [formData, setFormData] = React.useState({
    languageFrom: "en en-us",
    languageTo: "es es-es",
    inputFrom: "",
    inputTo: "",
  });

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  React.useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
      if (windowWidth > "1024") {
        document.getElementById("inputFrom").setAttribute("rows", "12");
        document.getElementById("inputTo").setAttribute("rows", "12");
      } else {
        document.getElementById("inputFrom").setAttribute("rows", "6");
        document.getElementById("inputTo").setAttribute("rows", "6");
      }
    }
    if (windowWidth > "1024") {
      document.getElementById("inputFrom").setAttribute("rows", "12");
      document.getElementById("inputTo").setAttribute("rows", "12");
    }
    window.addEventListener("resize", watchWidth);

    return function () {
      window.removeEventListener("resize", watchWidth);
    };
  }, [windowWidth]);
  const handleTranslate = async () => {
    const { inputFrom, languageFrom, languageTo } = formData;
    const data = {
      inputFrom,
      languageFrom,
      languageTo,
    };
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", inputFrom);
    encodedParams.append("target", (languageTo || "").split(" ")[0]);
    encodedParams.append("source", (languageFrom || "").split(" ")[0]);
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setFormData((prevData) => {
        return {
          ...prevData,
          inputTo: response.data.data.translations[0].translatedText,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="px-8 mt-12 antialiased md:px-0 grow-1">
      <div
        id="select-wrapper"
        className="flex items-center justify-between max-w-3xl mx-auto space-x-3 sm:space-x-5"
      >
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 w-5 h-5 text-gray-800 transform -translate-y-1/2 pointer-events-none top-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <label htmlFor="languageFrom" className="sr-only">
            Choose a language to translate from:
          </label>
          <select
            name="languageFrom"
            id="languageFrom"
            onChange={handleChange}
            value={formData.languageFrom}
            className="w-full px-4 py-2 text-sm text-center bg-white border-b appearance-none border-cyan-500"
          >
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="am">Amharic</option>
            <option value="ar ar-sa">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="az">Azerbaijani</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="bg bg-bg">Bulgarian</option>
            <option value="ca ca-es">Catalan</option>
            <option value="ceb">Cebuano</option>
            <option value="ny">Chichewa</option>
            <option value="zh zh-cn">Chinese</option>
            <option value="co">Corsican</option>
            <option value="hr hr-hr">Croatian</option>
            <option value="cs cs-cz">Czech</option>
            <option value="da da-dk">Danish</option>
            <option value="nl nl-nl">Dutch</option>
            <option value="en en-gb">English (UK)</option>
            <option value="en en-us">English (US)</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="tl">Filipino</option>
            <option value="fi fi-fi">Finnish</option>
            <option value="fr fr-fr">French</option>
            <option value="fy">Frisian</option>
            <option value="gl">Galician</option>
            <option value="ka">Georgian</option>
            <option value="de de-de">German</option>
            <option value="el el-gr">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="haw">Hawaiian</option>
            <option value="iw he-il">Hebrew</option>
            <option value="hi hi-in">Hindi</option>
            <option value="hmn">Hmong</option>
            <option value="hu hu-hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="ig">Igbo</option>
            <option value="id id-id">Indonesian</option>
            <option value="ga">Irish</option>
            <option value="it it-it">Italian</option>
            <option value="ja ja-jp">Japanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="rw">Kinyarwanda</option>
            <option value="ko ko-kr">Korean</option>
            <option value="ku">Kurdish (Kurmanji)</option>
            <option value="ky">Kyrgyz</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="lb">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="mg">Malagasy</option>
            <option value="ms ms-my">Malay</option>
            <option value="ml">Malayalam</option>
            <option value="mt">Maltese</option>
            <option value="mi">Maori</option>
            <option value="mr">Marathi</option>
            <option value="mn">Mongolian</option>
            <option value="my">Myanmar (Burmese)</option>
            <option value="ne">Nepali</option>
            <option value="no nb-no">Norwegian</option>
            <option value="or">Odia (Oriya)</option>
            <option value="ps">Pashto</option>
            <option value="fa">Persian</option>
            <option value="pl pl-pl">Polish</option>
            <option value="pt pt-pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro ro-ro">Romanian</option>
            <option value="ru ru-ru">Russian</option>
            <option value="sm">Samoan</option>
            <option value="gd">Scots Gaelic</option>
            <option value="sr">Serbian</option>
            <option value="st">Sesotho</option>
            <option value="sn">Shona</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhala</option>
            <option value="sk sk-sk">Slovak</option>
            <option value="sl sl-si">Slovenian</option>
            <option value="so">Somali</option>
            <option value="es es-es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili</option>
            <option value="sv sv-se">Swedish</option>
            <option value="tg">Tajik</option>
            <option value="ta ta-in">Tamil</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu</option>
            <option value="th th-th">Thai</option>
            <option value="tr tr-tr">Turkish</option>
            <option value="tk">Turkmen</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="ug">Uyghur</option>
            <option value="uz">Uzbek</option>
            <option value="vi vi-vn">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba</option>
            <option value="zu">Zulu</option>
          </select>
        </div>
        <button
          type="button"
          id="switch-btn"
          className="focus:outline-none"
          onClick={() => {
            setFormData((prev) => {
              return {
                ...prev,
                languageTo: prev.languageFrom,
                languageFrom: prev.languageTo,
                inputFrom: prev.inputTo,
                inputTo: prev.inputFrom,
              };
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer h-7 w-7 sm:h-8 sm:w-8 text-cyan-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 w-5 h-5 text-gray-800 transform -translate-y-1/2 pointer-events-none top-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <label htmlFor="languageTo" className="sr-only">
            Choose a language to translate from:
          </label>
          <select
            style={{ textAlignLast: "center" }}
            name="languageTo"
            value={formData.languageTo}
            onChange={handleChange}
            id="languageTo"
            className="w-full px-4 py-2 text-sm text-center bg-white border-b appearance-none border-cyan-500"
          >
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="am">Amharic</option>
            <option value="ar ar-sa">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="az">Azerbaijani</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="bg bg-bg">Bulgarian</option>
            <option value="ca ca-es">Catalan</option>
            <option value="ceb">Cebuano</option>
            <option value="ny">Chichewa</option>
            <option value="zh zh-cn">Chinese</option>
            <option value="co">Corsican</option>
            <option value="hr hr-hr">Croatian</option>
            <option value="cs cs-cz">Czech</option>
            <option value="da da-dk">Danish</option>
            <option value="nl nl-nl">Dutch</option>
            <option value="en en-gb">English (UK)</option>
            <option value="en en-us">English (US)</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="tl">Filipino</option>
            <option value="fi fi-fi">Finnish</option>
            <option value="fr fr-fr">French</option>
            <option value="fy">Frisian</option>
            <option value="gl">Galician</option>
            <option value="ka">Georgian</option>
            <option value="de de-de">German</option>
            <option value="el el-gr">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="haw">Hawaiian</option>
            <option value="iw he-il">Hebrew</option>
            <option value="hi hi-in">Hindi</option>
            <option value="hmn">Hmong</option>
            <option value="hu hu-hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="ig">Igbo</option>
            <option value="id id-id">Indonesian</option>
            <option value="ga">Irish</option>
            <option value="it it-it">Italian</option>
            <option value="ja ja-jp">Japanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="rw">Kinyarwanda</option>
            <option value="ko ko-kr">Korean</option>
            <option value="ku">Kurdish (Kurmanji)</option>
            <option value="ky">Kyrgyz</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="lb">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="mg">Malagasy</option>
            <option value="ms ms-my">Malay</option>
            <option value="ml">Malayalam</option>
            <option value="mt">Maltese</option>
            <option value="mi">Maori</option>
            <option value="mr">Marathi</option>
            <option value="mn">Mongolian</option>
            <option value="my">Myanmar (Burmese)</option>
            <option value="ne">Nepali</option>
            <option value="no nb-no">Norwegian</option>
            <option value="or">Odia (Oriya)</option>
            <option value="ps">Pashto</option>
            <option value="fa">Persian</option>
            <option value="pl pl-pl">Polish</option>
            <option value="pt pt-pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro ro-ro">Romanian</option>
            <option value="ru ru-ru">Russian</option>
            <option value="sm">Samoan</option>
            <option value="gd">Scots Gaelic</option>
            <option value="sr">Serbian</option>
            <option value="st">Sesotho</option>
            <option value="sn">Shona</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhala</option>
            <option value="sk sk-sk">Slovak</option>
            <option value="sl sl-si">Slovenian</option>
            <option value="so">Somali</option>
            <option value="es es-es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili</option>
            <option value="sv sv-se">Swedish</option>
            <option value="tg">Tajik</option>
            <option value="ta ta-in">Tamil</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu</option>
            <option value="th th-th">Thai</option>
            <option value="tr tr-tr">Turkish</option>
            <option value="tk">Turkmen</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="ug">Uyghur</option>
            <option value="uz">Uzbek</option>
            <option value="vi vi-vn">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba</option>
            <option value="zu">Zulu</option>
          </select>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-4 space-y-3 md:space-y-0 md:flex md:justify-between md:items-center md:space-x-4">
        <div className="relative w-full">
          <textarea
            dir="auto"
            id="inputFrom"
            name="inputFrom"
            value={formData.inputFrom}
            onChange={handleChange}
            rows="6"
            className="w-full px-5 py-2 text-lg border rounded resize-none border-cyan-500 text-slate-700 focus:outline-none placeholder:font-medium"
            spellCheck="true"
            placeholder="Text ..."
            lang="en"
          ></textarea>

          <button
            id="playAudioBtnFrom"
            onClick={() => {
              const { inputFrom, languageFrom } = formData;
              const msg = new SpeechSynthesisUtterance(inputFrom);
              msg.lang = languageFrom.split(" ")[0];
              window.speechSynthesis.speak(msg);
            }}
            className="absolute bottom-3 right-4 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            {/* <audio className="clip" id="audio" src={}>
              Your browser does not support the
              <code>audio</code> element.
            </audio> */}
          </button>
        </div>
        <div className="">
          <button
            id="translate-btn"
            type="button"
            onClick={handleTranslate}
            className="flex items-center justify-center w-full py-2 transition-colors duration-700 ease-in-out border rounded-md md:p-2 border-cyan-500 focus:outline-none hover:bg-cyan-100 hover:ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="relative w-full">
          <textarea
            dir="auto"
            id="inputTo"
            name="inputTo"
            value={formData.inputTo}
            onChange={handleChange}
            rows="6"
            className="w-full px-5 py-2 text-lg border rounded resize-none border-cyan-500 text-slate-700 focus:outline-none"
            spellCheck="true"
            lang="ar"
          ></textarea>
          <button
            className="absolute focus:outline-none bottom-3 right-12"
            id="copy-btn"
            onClick={async () => {
              if (!navigator.clipboard) {
                // Clipboard API not available
                return;
              }
              const text = formData.inputTo;
              try {
                await navigator.clipboard.writeText(text);
                alert("Copied to clipboard");
              } catch (err) {
                console.error("Failed to copy!", err);
              }
            }}
            type="button"
            title="copy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
          </button>
          <button
            id="playAudioBtnTo"
            onClick={() => {
              const { inputTo, languageTo } = formData;
              const msg = new SpeechSynthesisUtterance(inputTo);
              msg.lang = languageTo.split(" ")[0];
              window.speechSynthesis.speak(msg);
            }}
            className="absolute bottom-3 right-4 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Main;
