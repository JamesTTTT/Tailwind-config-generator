import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const flexGridPropList = [
  "flexGrow",
  "flexShrink",
  "order",
  "gridColumn",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRow",
  "gridRowStart",
  "gridRowEnd",
  "gridAutoFlow",
  "gridAutoColumns",
  "gridAutoRows",
  "gridTemplateColumns",
  "gridTemplateRows",
  "gap",
];

const FlexGridTheme = ({ setTheme }) => {
  const [flexGridProp, setFlexGridProp] = useState(flexGridPropList[0]);
  const [flexGridValues, setFlexGridValues] = useState([]);

  useEffect(() => {
    const groupedFlexGrid = groupByParent(flexGridValues);

    const flexGrid = Object.keys(groupedFlexGrid).reduce((acc, parent) => {
      acc[parent] = groupedFlexGrid[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...flexGrid,
    }));
  }, [flexGridValues]);

  const addFlexGrid = () => {
    setFlexGridValues([
      ...flexGridValues,
      {
        parent: flexGridProp,
        value: "1",
        name: `${flexGridProp}${flexGridValues.length}`,
      },
    ]);
  };

  const deleteFlexGrid = (flexGrid) => {
    setFlexGridValues(flexGridValues.filter((fg) => fg !== flexGrid));
  };

  const flexGridMap = () => {
    const groupedFlexGrid = groupByParent(flexGridValues);

    return flexGridPropList.map((parent) => {
      const flexGrids = groupedFlexGrid[parent] || [];

      if (flexGrids.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {flexGrids.map((flexGrid) => {
            const index = flexGridValues.findIndex(
              (fg) => fg.name === flexGrid.name && fg.parent === flexGrid.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={flexGrid.name}
                  onChange={(e) => {
                    const newFlexGridValues = [...flexGridValues];
                    newFlexGridValues[index].name = e.target.value;
                    setFlexGridValues(newFlexGridValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-20 rounded-r-xl"
                  value={flexGrid.value}
                  onChange={(e) => {
                    const newFlexGridValues = [...flexGridValues];
                    newFlexGridValues[index].value = e.target.value;
                    setFlexGridValues(newFlexGridValues);
                  }}
                />
                <button onClick={() => deleteFlexGrid(flexGrid)}>
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
      <h1 className="mb-3">Customize flexbox and grid properties</h1>
      <div className="flex w-full">
        <DropDown
          value={flexGridProp}
          onChange={(e) => {
            setFlexGridProp(e.target.value);
          }}
          content={flexGridPropList}
        />
        <button
          onClick={addFlexGrid}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{flexGridMap()}</div>
    </div>
  );
};

export default FlexGridTheme;
