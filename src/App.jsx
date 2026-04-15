import {useState} from 'react';
import bgImage from "./assets/bg.jpeg";
import { Copy } from "lucide-react";

function App(){
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputMessage, setOutputMessage] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const translateText = async () => {
    if (!language) {
      setOutputMessage(" Please select a language");
      return;
    }
  try {
    setLoading(true);

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`
    );

    const data = await response.json();

    console.log(data);

    setTranslated(
      data.responseData.translatedText
    );
    const result = data.responseData.translatedText;

    setTranslated(result);

    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      setDisplayText(result.slice(0, i + 1));
      i++;
      if (i === result.length) clearInterval(interval);
    }, 20);

    setLoading(false);

  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
  }
};
  const languages = [
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "ko", name: "Korean" },
  ];

  return (
  <div className="min-h-screen flex flex-col md:flex-row font-sans">

    {/* LEFT IMAGE */}
    <div 
      className="h-64 md:h-auto md:w-[50%] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    ></div>

    {/* RIGHT PANEL */}
    <div className="w-full md:w-[50%] bg-[#E3D1C3] flex items-center justify-center px-4 md:px-6 py-8 relative overflow-hidden">

      {/* FLOATING BACKGROUND BLOBS */}
      <div className="absolute w-72 h-72 bg-[#C8A19C]/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#976D61]/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="w-full max-w-md space-y-5 relative z-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#976D61]">
          Language Translator
        </h1>

        {/* INPUT */}
        <div className="relative group">
          <textarea
            className="w-full p-4 pt-6 rounded-xl bg-white/40 backdrop-blur-lg border border-white/50 text-[#3a2e2a] focus:outline-none transition duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label className="absolute left-4 top-1 text-sm text-[#976D61]">
            Enter text
          </label>
        </div>

        {/* DROPDOWN */}
        <select
          className="w-full p-3 rounded-xl bg-white/50 border border-white/50 text-[#3a2e2a] focus:outline-none cursor-pointer hover:shadow-md transition"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Choose a language</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        {/* OUTPUT */}
        <div className="relative p-4 rounded-xl bg-white/40 backdrop-blur-lg border border-white/50 min-h-[120px] text-[#3a2e2a] transition duration-300 hover:shadow-xl hover:scale-[1.02]">

          {/* TRANSLATED TEXT */}
          {translated ? (
            <p className="animate-fadeIn">{displayText}</p>
          ) : (
            <p className="text-center text-[#976D61]/70">
              Your translation will appear here
            </p>
          )}

          {/* COPY ICON (BOTTOM RIGHT) */}
          {translated && (
            <button
              onClick={handleCopy}
              className="absolute bottom-3 right-3 text-[#976D61] hover:scale-110 transition"
            >
              <Copy size={18} />
            </button>
          )}

        </div>
        
        {/* TRANSLATE BUTTON */}
        <button
          onClick={translateText}
          className="w-full py-3 rounded-xl bg-[#976D61] text-white font-semibold 
          hover:bg-[#7f5b50] hover:shadow-lg hover:scale-[1.02] 
          transition duration-300"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        <p className="fixed bottom-4 right-4 text-sm text-[#976D61]/70">
          Built with ❤️ by Rishita
        </p>

      </div>
    </div>
  </div>
);
}
export default App;