import React, { useState, useEffect } from "react";

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
      return JSON.stringify(config, null, 2);
    };

    if (theme) {
      setConfigText(generateConfig());
    }
  }, [theme]);

  return (
    <div>
      <textarea
        rows="30"
        cols="50"
        value={configText}
        readOnly
        className="bg-neutral text-info text-xl p-2 rounded-lg"
        style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
      />
      <div className="flex mt-4">
        <button className="bg-accent hover:bg-opacity-75  text-neutral font-thin py-3 px-4 rounded-l-xl border-r border-neutral flex align-middle items-center">
          Copy
        </button>
        <button className="bg-accent hover:bg-opacity-75  text-neutral font-thin py-3 px-4 rounded-r-xl flex align-middle items-center">
          Export file
        </button>
      </div>
    </div>
  );
}

export default TextArea;
