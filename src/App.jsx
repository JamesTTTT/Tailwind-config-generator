import React, { useState } from "react";
import "./App.css";
import ColorTheme from "./components/ColorTheme";
import TextArea from "./components/TextArea";
function App() {
  const [theme, setTheme] = useState({});
  return (
    <>
      <div className="p-5 min-h-screen w-full bg-base text-info">
        <h1 className="text-2xl font-thin py-5">Tailwind Config Generator</h1>
        <div className="flex justify-between">
          <ColorTheme theme={theme} setTheme={setTheme} />
          <TextArea theme={theme} />
        </div>
      </div>
    </>
  );
}

export default App;
