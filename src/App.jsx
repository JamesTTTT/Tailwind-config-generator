import React, { useState } from "react";
import "./App.css";
import ColorTheme from "./components/ColorTheme";
import TextArea from "./components/TextArea";
import SizeTheme from "./components/SizeTheme";
import AddProp from "./components/AddProp";
import SpacingTheme from "./components/SpacingTheme";
function App() {
  const [theme, setTheme] = useState({});
  const [selectedProps, setSelectedProps] = useState([
    {
      name: "Colors",
      enabled: false,
      component: <ColorTheme setTheme={setTheme} />,
    },
    {
      name: "Sizes",
      enabled: false,
      component: <SizeTheme setTheme={setTheme} />,
    },
    {
      name: "Spacing",
      enabled: false,
      component: <SpacingTheme setTheme={setTheme} />,
    },
  ]);

  const mapComponents = () => {
    return selectedProps.map((item) => {
      if (item.enabled) {
        return (
          <div key={item.name} className="my-10">
            <h1 className="text-3xl">{item.name}</h1>
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
