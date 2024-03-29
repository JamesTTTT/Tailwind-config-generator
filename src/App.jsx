import React, { useState } from "react";
import ColorTheme from "./components/ColorTheme";
import TextArea from "./components/TextArea";
import SizeTheme from "./components/SizeTheme";
import AddProp from "./components/AddProp";
import SpacingTheme from "./components/SpacingTheme";
import TypographyTheme from "./components/TypographyTheme";
import BorderTheme from "./components/BorderTheme";
import EffectsTheme from "./components/EffectsTheme";
import FlexGridTheme from "./components/FlexGridTheme";
import { SiTailwindcss } from "react-icons/si";
import { removePropertiesFromTheme } from "./util/util";
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
    {
      name: "Typography",
      enabled: false,
      component: <TypographyTheme setTheme={setTheme} />,
    },
    {
      name: "Border",
      enabled: false,
      component: <BorderTheme setTheme={setTheme} />,
    },
    {
      name: "Effects",
      enabled: false,
      component: <EffectsTheme setTheme={setTheme} />,
    },
    {
      name: "Flex & Grid",
      enabled: false,
      component: <FlexGridTheme setTheme={setTheme} />,
    },
  ]);

  const mapComponents = () => {
    return selectedProps.map((item) => {
      if (item.enabled) {
        return (
          <div key={item.name} className="my-10">
            <div className="flex flex-row items-center">
              <h1 className="text-3xl">{item.name}</h1>{" "}
              <button
                className="mx-4 text-3xl"
                onClick={() => {
                  const updatedTheme = removePropertiesFromTheme(
                    item.name,
                    theme
                  );
                  setTheme(updatedTheme);
                  setSelectedProps(
                    selectedProps.map((prop) => {
                      if (prop.name === item.name) {
                        return { ...prop, enabled: false };
                      } else {
                        return prop;
                      }
                    })
                  );
                }}
              >
                <i className="pi pi-times py-2 h-12 px-4 text-lg rounded-r-xl  transition-colors" />
              </button>
            </div>
            {item.component}
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="p-5 min-h-screen w-full bg-base text-info">
        <div className="flex justify-center">
          <div className="h-fit w-2/5">
            <h1 className="text-4xl font-thin py-5 flex items-center">
              Tailwind Theme Builder <SiTailwindcss />
            </h1>
            <p className="pb-4">Select a property to add</p>
            <AddProp
              selectedProps={selectedProps}
              setSelectedProps={setSelectedProps}
            />
            {mapComponents()}
          </div>
          <div className="sticky w-2/5">
            <TextArea theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
