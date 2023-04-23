import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { ColorPicker } from "primereact/colorpicker";

const ColorTheme = ({ setTheme, theme }) => {
  const [colours, setColours] = useState([]);

  useEffect(() => {
    const colors = colours.reduce((acc, item) => {
      acc[item.name] = item.color;
      return acc;
    }, {});

    setTheme({
      ...theme,
      colors: colors,
    });
  }, [colours]);

  const addColor = () => {
    setColours([
      ...colours,
      { color: "#ffffff", name: `ColorName${colours.length}` },
    ]);
  };

  const deleteColour = (colour) => {
    setColours(colours.filter((c) => c !== colour));
  };

  const coloursMap = () => {
    return colours.map((colour, index) => {
      return (
        <div key={index} className="flex items-center my-4 px-2">
          <ColorPicker
            value={colour.color}
            onChange={(e) => {
              const newColours = [...colours];
              newColours[index].color = e.value;
              setColours(newColours);
            }}
          />
          <input
            value={colour.name}
            className="ml-4 bg-transparent text-info border-b border-accent w-40"
            onChange={(e) => {
              const newColours = [...colours];
              newColours[index].name = e.target.value;
              setColours(newColours);
            }}
          />
          <button onClick={() => deleteColour(colour)}>
            <i className="pi pi-times text-xl mx-2 hover:text-primary transition-colors" />
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Create a custom color theme</h1>
      <button
        onClick={addColor}
        className="bg-accent text-neutral font-thin py-2 px-4 rounded flex items-center my-8"
      >
        <span className="mr-7">Add Colour</span>
        <i className="pi pi-plus"></i>
      </button>
      <div className=" w-80 flex-col max-h-96 overflow-scroll">
        {coloursMap()}
      </div>
    </div>
  );
};

export default ColorTheme;
