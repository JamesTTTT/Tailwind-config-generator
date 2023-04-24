import React, { useState } from "react";
import "./App.css";
import ColorTheme from "./components/ColorTheme";
import TextArea from "./components/TextArea";
import SizeTheme from "./components/SizeTheme";
import AddProp from "./components/AddProp";
function App() {
  const [theme, setTheme] = useState({});
  const [selectedProps, setSelectedProps] = useState([
    {
      name: "colors",
      enabled: false,
      component: <ColorTheme theme={theme} setTheme={setTheme} />,
    },
    {
      name: "sizes",
      enabled: false,
      component: <SizeTheme theme={theme} setTheme={setTheme} />,
    },
  ]);

  const mapComponents = () => {
    return selectedProps.map((item) => {
      if (item.enabled) {
        return (
          <div key={item.name} className="my-4">
            {item.component}
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="p-5 min-h-screen w-full bg-base text-info">
        <h1 className="text-4xl font-thin py-5">Tailwind Config Generator</h1>
        <div className="flex justify-between">
          <div className="h-fit">
            <AddProp
              selectedProps={selectedProps}
              setSelectedProps={setSelectedProps}
            />
            {mapComponents()}
          </div>
          <div className="sticky">
            <TextArea theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
