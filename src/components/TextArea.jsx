import React, { useState, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";

function TextArea({ theme }) {
  const [configText, setConfigText] = useState("");

  useEffect(() => {
    const generateConfig = () => {
      const config = {
        theme: {
          ...theme,
        },
        variants: {},
        plugins: [],
      };
      return `/** @type {import('tailwindcss').Config} */\nexport default ${JSON.stringify(
        config,
        null,
        2
      )};`;
    };

    if (theme) {
      setConfigText(generateConfig());
    }
  }, [theme]);

  const handleExport = () => {
    const configData = new Blob([configText], { type: "text/plain" });
    const url = URL.createObjectURL(configData);
    const link = document.createElement("a");
    link.download = "tailwind.config.js";
    link.href = url;
    link.click();
  };

  const handleCopy = () => {
    const textarea = document.querySelector("#config-textarea");
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
  };

  return (
    <div>
      <div className="flex ml-6">
        {/* <button className="mr-4 px-2 text-neutral h-fit rounded-full bg-primary">
          <span>clear</span>
        </button> */}
        <div>
          <input
            type="radio"
            name="select"
            className="peer hidden"
            id="select-radio-1"
            onChange={() => {}}
          />
          <label
            for="select-radio-1"
            className="text-xl marker:text-info rounded-tl-xl
                h-full py-2 px-4 flex flex-row bg-neutral items-center 
                justify-center peer-checked:bg-slate-800"
          >
            <FaBoxes />
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="select"
            className="peer hidden"
            id="select-radio-2"
            onChange={() => {}}
          />
          <label
            for="select-radio-2"
            className="text-xl marker:text-info rounded-tr-xl
                h-full py-2 px-4 flex flex-row bg-neutral items-center 
                justify-center peer-checked:bg-slate-800"
          >
            <BsList />
          </label>
        </div>
      </div>
      <textarea
        id="config-textarea"
        rows="30"
        cols="50"
        value={configText}
        readOnly
        className="bg-neutral text-info text-xl p-2 rounded-lg"
        style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
      />
      <div className="flex mt-4">
        <button
          className="bg-accent hover:bg-opacity-75 text-neutral font-thin py-3 px-4 rounded-l-xl border-r border-neutral flex align-middle items-center"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          onClick={handleExport}
          className="bg-accent hover:bg-opacity-75  text-neutral font-thin py-3 px-4 rounded-r-xl flex align-middle items-center"
        >
          Export file
        </button>
      </div>
    </div>
  );
}

export default TextArea;
