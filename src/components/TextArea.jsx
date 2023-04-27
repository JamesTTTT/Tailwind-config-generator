import React, { useState, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";

function TextArea({ theme }) {
  const [configText, setConfigText] = useState("");
  const [isExtend, setIsExtend] = useState(false);

  useEffect(() => {
    const generateConfig = () => {
      let config = {
        theme: {
          ...theme,
        },
        variants: {},
        plugins: [],
      };
      if (isExtend) {
        config = {
          theme: {
            extend: {
              ...theme,
            },
          },
          variants: {},
          plugins: [],
        };
      }

      return `/** @type {import('tailwindcss').Config} */\nexport default ${JSON.stringify(
        config,
        null,
        2
      )};`;
    };

    if (theme) {
      setConfigText(generateConfig());
    }
  }, [theme, isExtend]);

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
      <div className="flex justify-between ml-6 w-80">
        {/* <button className="mr-4 px-2 text-neutral h-fit rounded-full bg-primary">
          <span>clear</span>
        </button> */}

        <div className="flex">
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
                h-full py-2 px-4 flex flex-row items-center 
                justify-center peer-checked:bg-neutral bg-slate-800"
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
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <label
              for="select-radio-2"
              className="text-xl marker:text-info rounded-tr-xl
                h-full py-2 px-4 flex flex-row items-center 
                justify-center peer-checked:bg-neutral bg-slate-800"
            >
              <BsList />
            </label>
          </div>
        </div>
        <div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              onChange={(e) => {
                setIsExtend(e.target.checked);
                console.log(e.target.checked);
              }}
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
            <span class="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Extend Mode
            </span>
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
