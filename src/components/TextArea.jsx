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
        className="bg-neutral text-info text-xl p-2"
        style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}

export default TextArea;
