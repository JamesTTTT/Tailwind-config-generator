import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";
const SpacingTheme = ({ setTheme }) => {
  const [spacing, setSpacing] = useState();
  const [spacingValues, setSpacingValues] = useState([]);

  useEffect(() => {
    const groupedSpacings = groupByParent(spacingValues);

    const spacings = Object.keys(groupedSpacings).reduce((acc, parent) => {
      acc[parent] = groupedSpacings[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = `${item.value}${item.unit}`;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...spacings,
    }));
  }, [spacingValues]);

  const addSpacings = () => {
    setSpacingValues([
      ...spacingValues,
      {
        parent: spacing,
        value: "10",
        unit: "rem",
        name: `${spacing}${spacingValues.length}`,
      },
    ]);
  };

  const deleteSpacing = (spacing) => {
    setSpacingValues(spacingValues.filter((s) => s !== spacing));
  };

  const spacingPropList = [
    "spacing",
    "margin",
    "padding",
    "space",
    "gap",
    "inset",
    "translateY",
    "translateX",
  ];

  const unitList = ["px", "rem", "em", "vh", "vw", "%"];

  const spacingMap = () => {
    const groupedSpacings = groupByParent(spacingValues);

    return spacingPropList.map((parent) => {
      const spacings = groupedSpacings[parent] || [];

      if (spacings.length === 0) {
        return null;
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {spacings.map((spacing) => {
            const index = spacingValues.findIndex(
              (s) => s.name === spacing.name && s.parent === spacing.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
				  border-transparent focus:border-transparent focus:ring-0"
                  value={spacing.name}
                  onChange={(e) => {
                    const newSpacingValues = [...spacingValues];
                    newSpacingValues[index].name = e.target.value;
                    setSpacingValues(newSpacingValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral w-20 px-2 h-12 text-lg
				  border-transparent focus:border-transparent focus:ring-0"
                  value={spacing.value}
                  onChange={(e) => {
                    const newSpacingValues = [...spacingValues];
                    newSpacingValues[index].value = e.target.value;
                    setSpacingValues(newSpacingValues);
                  }}
                />
                <DropDown
                  value={spacing.unit}
                  orientation={"left"}
                  h="h-12"
                  onChange={(e) => {
                    const newSpacingValues = [...spacingValues];
                    newSpacingValues[index].unit = e.target.value;
                    setSpacingValues(newSpacingValues);
                  }}
                  content={unitList}
                />
                <button onClick={() => deleteSpacing(spacing)}>
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
    <div className=" w-full">
      <h1 className="mb-3">Create custom spacings</h1>
      <div className="flex w-full ">
        <DropDown
          orientation="right"
          value={spacing}
          onChange={(e) => {
            setSpacing(e.target.value);
          }}
          content={spacingPropList}
        />
        <button
          onClick={addSpacings}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">
        {spacingMap().filter((item) => item !== null)}
      </div>
    </div>
  );
};

export default SpacingTheme;
