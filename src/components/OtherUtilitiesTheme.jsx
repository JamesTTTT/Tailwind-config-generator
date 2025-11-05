import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const otherUtilityPropList = [
  "zIndex",
  "aspectRatio",
  "columns",
  "cursor",
  "accentColor",
  "caretColor",
  "scrollMargin",
  "scrollPadding",
  "fill",
  "stroke",
  "strokeWidth",
  "textIndent",
  "textDecorationColor",
  "textDecorationThickness",
  "textUnderlineOffset",
  "textShadow",
  "outlineWidth",
  "outlineColor",
  "outlineOffset",
  "outlineStyle",
  "fontFamily",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "screens",
];

const OtherUtilitiesTheme = ({ setTheme }) => {
  const [utilityProp, setUtilityProp] = useState(otherUtilityPropList[0]);
  const [utilityValues, setUtilityValues] = useState([]);

  useEffect(() => {
    const groupedUtilities = groupByParent(utilityValues);

    const utilities = Object.keys(groupedUtilities).reduce((acc, parent) => {
      acc[parent] = groupedUtilities[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      otherUtilityPropList.forEach(prop => {
        if (utilities[prop] && Object.keys(utilities[prop]).length > 0) {
          newTheme[prop] = utilities[prop];
        } else {
          delete newTheme[prop];
        }
      });
      return newTheme;
    });
  }, [utilityValues, setTheme]);

  const addUtility = () => {
    setUtilityValues([
      ...utilityValues,
      {
        parent: utilityProp,
        value: utilityProp === "fontFamily" ? "sans-serif" : "1",
        name: `${utilityProp}${utilityValues.length}`,
      },
    ]);
  };

  const deleteUtility = (utility) => {
    setUtilityValues(utilityValues.filter((u) => u !== utility));
  };

  const utilityMap = () => {
    const groupedUtilities = groupByParent(utilityValues);

    return otherUtilityPropList.map((parent) => {
      const utilities = groupedUtilities[parent] || [];

      if (utilities.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {utilities.map((utility) => {
            const index = utilityValues.findIndex(
              (u) => u.name === utility.name && u.parent === utility.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={utility.name}
                  onChange={(e) => {
                    const newUtilityValues = [...utilityValues];
                    newUtilityValues[index].name = e.target.value;
                    setUtilityValues(newUtilityValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-60 rounded-r-xl"
                  value={utility.value}
                  onChange={(e) => {
                    const newUtilityValues = [...utilityValues];
                    newUtilityValues[index].value = e.target.value;
                    setUtilityValues(newUtilityValues);
                  }}
                />
                <button onClick={() => deleteUtility(utility)}>
                  <i className="pi pi-times py-2 h-12 px-4 text-lg rounded-r-xl transition-colors" />
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
      <h1 className="mb-3">Create custom utilities</h1>
      <div className="flex w-full">
        <DropDown
          value={utilityProp}
          onChange={(e) => {
            setUtilityProp(e.target.value);
          }}
          content={otherUtilityPropList}
        />
        <button
          onClick={addUtility}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{utilityMap()}</div>
    </div>
  );
};

export default OtherUtilitiesTheme;
