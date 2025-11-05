import React, { useState, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";

function TextArea({ theme }) {
  const [configText, setConfigText] = useState("");
  const [isExtend, setIsExtend] = useState(false);
  const [outputFormat, setOutputFormat] = useState("v4-css"); // "v4-css" or "v3-js"

  useEffect(() => {
    const generateV3JSConfig = () => {
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

    const generateV4CSSConfig = () => {
      const themeLines = [];

      Object.entries(theme).forEach(([key, value]) => {
        if (key === 'colors' && typeof value === 'object') {
          Object.entries(value).forEach(([colorName, colorValue]) => {
            themeLines.push(`  --color-${colorName}: ${colorValue};`);
          });
        } else if (key === 'fontFamily' && typeof value === 'object') {
          Object.entries(value).forEach(([fontName, fontValue]) => {
            themeLines.push(`  --font-${fontName}: ${fontValue};`);
          });
        } else if (key === 'fontSize' && typeof value === 'object') {
          Object.entries(value).forEach(([sizeName, sizeValue]) => {
            themeLines.push(`  --text-${sizeName}: ${sizeValue};`);
          });
        } else if (key === 'screens' && typeof value === 'object') {
          Object.entries(value).forEach(([screenName, screenValue]) => {
            themeLines.push(`  --breakpoint-${screenName}: ${screenValue};`);
          });
        } else if (key === 'boxShadow' && typeof value === 'object') {
          Object.entries(value).forEach(([shadowName, shadowValue]) => {
            themeLines.push(`  --shadow-${shadowName}: ${shadowValue};`);
          });
        } else if (key === 'textShadow' && typeof value === 'object') {
          Object.entries(value).forEach(([shadowName, shadowValue]) => {
            themeLines.push(`  --text-shadow-${shadowName}: ${shadowValue};`);
          });
        } else if (key === 'animation' && typeof value === 'object') {
          Object.entries(value).forEach(([animName, animValue]) => {
            themeLines.push(`  --animate-${animName}: ${animValue};`);
          });
        } else if (key === 'keyframes' && typeof value === 'object') {
          Object.entries(value).forEach(([keyframeName, keyframeValue]) => {
            themeLines.push(`  --keyframes-${keyframeName}: ${keyframeValue};`);
          });
        } else if (typeof value === 'object') {
          // For other properties, use the property name as-is or convert camelCase to kebab-case
          const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          Object.entries(value).forEach(([propName, propValue]) => {
            themeLines.push(`  --${kebabKey}-${propName}: ${propValue};`);
          });
        }
      });

      if (themeLines.length === 0) {
        return `@import "tailwindcss";\n\n@theme {\n  /* Add your theme customizations here */\n}`;
      }

      return `@import "tailwindcss";\n\n@theme {\n${themeLines.join('\n')}\n}`;
    };

    if (theme && Object.keys(theme).length > 0) {
      if (outputFormat === "v4-css") {
        setConfigText(generateV4CSSConfig());
      } else {
        setConfigText(generateV3JSConfig());
      }
    } else {
      if (outputFormat === "v4-css") {
        setConfigText(`@import "tailwindcss";\n\n@theme {\n  /* Add your theme customizations here */\n}`);
      } else {
        setConfigText(`/** @type {import('tailwindcss').Config} */\nexport default {\n  theme: {},\n  variants: {},\n  plugins: [],\n};`);
      }
    }
  }, [theme, isExtend, outputFormat]);

  const handleExport = () => {
    const configData = new Blob([configText], { type: "text/plain" });
    const url = URL.createObjectURL(configData);
    const link = document.createElement("a");
    link.download = outputFormat === "v4-css" ? "app.css" : "tailwind.config.js";
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
      <div className="flex justify-between ml-6 w-full mb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${
              outputFormat === "v4-css"
                ? "bg-accent text-neutral"
                : "bg-slate-800 text-info"
            }`}
            onClick={() => setOutputFormat("v4-css")}
          >
            v4 CSS
          </button>
          <button
            className={`px-4 py-2 rounded ${
              outputFormat === "v3-js"
                ? "bg-accent text-neutral"
                : "bg-slate-800 text-info"
            }`}
            onClick={() => setOutputFormat("v3-js")}
          >
            v3 JS
          </button>
        </div>

        {outputFormat === "v3-js" && (
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => {
                  setIsExtend(e.target.checked);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
              <span className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Extend Mode
              </span>
            </label>
          </div>
        )}
      </div>
      <textarea
        id="config-textarea"
        rows="30"
        cols="50"
        value={configText}
        readOnly
        className="bg-neutral text-info text-xl p-2 rounded-lg w-full"
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
