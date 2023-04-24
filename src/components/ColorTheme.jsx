import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { ColorPicker } from "primereact/colorpicker";

const ColorTheme = ({ setTheme }) => {
  const [colors, setColors] = useState([]);
  const [colorType, setColorType] = useState();

  const colorPropList = [
    "background",
    "border",
    "text",
    "placeholder",
    "divide",
    "ring",
    "ring-offset",
    "gradient",
    "primary",
    "secondary",
    "neutral",
    "info",
    "warning",
    "success",
    "error",
  ];

  useEffect(() => {
    const colorMap = colors.reduce((acc, item) => {
      acc[item.name] = item.color;
      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: colorMap,
    }));
  }, [colors]);

  const addColor = () => {
    setColors([
      ...colors,
      { color: "#ffffff", name: `${colorType}${colors.length}` },
    ]);
  };

  const deleteColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const colorsMap = () => {
    return colors.map((color, index) => {
      return (
        <div key={index} className="flex items-center ">
          <div className="bg-neutral h-14 py-1 px-4 rounded-l-xl flex items-center">
            <ColorPicker
              value={color.color}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[index].color = `#${e.value}`;
                setColors(newColors);
              }}
            />
          </div>
          <input
            value={color.name}
            className=" text-info bg-neutral h-14 py-2 px-4 rounded-r-xl w-40"
            onChange={(e) => {
              const newColors = [...colors];
              newColors[index].name = e.target.value;
              setColors(newColors);
            }}
          />
          <button onClick={() => deleteColor(color)}>
            <i className="pi pi-times text-xl mx-2 hover:text-primary transition-colors" />
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <h1 className="mb-3">Create a custom color theme</h1>
      <div className="flex w-full">
        <select
          value={colorType}
          onChange={(e) => {
            setColorType(e.target.value);
          }}
          className="bg-neutral py-2 px-4 text-lg rounded-l w-48 h-fit"
        >
          <option>Select a property</option>
          {colorPropList.map((prop) => (
            <option key={prop} value={prop}>
              {prop}
            </option>
          ))}
        </select>
        <button
          onClick={addColor}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="w-80 flex-col max-h-96 overflow-scroll mt-4">
        {colorsMap()}
      </div>
    </div>
  );
};

export default ColorTheme;
