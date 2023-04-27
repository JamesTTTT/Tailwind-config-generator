import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";
const borderPropList = [
  "borderWidth",
  "borderColor",
  "borderRadius",
  "borderStyle",
  "ringWidth",
];
const BorderTheme = ({ setTheme }) => {
  const [borderProp, setBorderProp] = useState(borderPropList[0]);
  const [borderValues, setBorderValues] = useState([]);

  useEffect(() => {
    const groupedBorders = groupByParent(borderValues);

    const borders = Object.keys(groupedBorders).reduce((acc, parent) => {
      acc[parent] = groupedBorders[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = `${item.value}${item.unit}`;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...borders,
    }));
  }, [borderValues]);

  const addBorder = () => {
    setBorderValues([
      ...borderValues,
      {
        parent: borderProp,
        value: "1",
        unit: "px",
        name: `${borderProp}${borderValues.length}`,
      },
    ]);
  };

  const deleteBorder = (border) => {
    setBorderValues(borderValues.filter((b) => b !== border));
  };

  const unitList = ["px", "rem", "em", "vh", "vw", "%"];
  const borderMap = () => {
    const groupedBorders = groupByParent(borderValues);

    return borderPropList.map((parent) => {
      const borders = groupedBorders[parent] || [];

      if (borders.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {borders.map((border) => {
            const index = borderValues.findIndex(
              (b) => b.name === border.name && b.parent === border.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={border.name}
                  onChange={(e) => {
                    const newBorderValues = [...borderValues];
                    newBorderValues[index].name = e.target.value;
                    setBorderValues(newBorderValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral w-20 px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={border.value}
                  onChange={(e) => {
                    const newBorderValues = [...borderValues];
                    newBorderValues[index].value = e.target.value;
                    setBorderValues(newBorderValues);
                  }}
                />
                <DropDown
                  value={border.unit}
                  orientation={"left"}
                  h={"h-12"}
                  onChange={(e) => {
                    const newBorderValues = [...borderValues];
                    newBorderValues[index].unit = e.target.value;
                    setBorderValues(newBorderValues);
                  }}
                  content={unitList}
                />
                <button onClick={() => deleteBorder(border)}>
                  <i className="pi pi-times py-2 h-12 px-4 text-lg rounded-r-xl  transition-colors" />
                </button>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <h1 className="mb-3">Create custom borders</h1>
      <div className="flex w-full">
        <DropDown
          value={borderProp}
          onChange={(e) => {
            setBorderProp(e.target.value);
          }}
          content={borderPropList}
        />
        <button
          onClick={addBorder}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{borderMap()}</div>
    </div>
  );
};

export default BorderTheme;
