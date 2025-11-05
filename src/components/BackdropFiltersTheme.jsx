import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const backdropFilterPropList = [
  "backdropBlur",
  "backdropBrightness",
  "backdropContrast",
  "backdropGrayscale",
  "backdropHueRotate",
  "backdropInvert",
  "backdropOpacity",
  "backdropSaturate",
  "backdropSepia",
];

const BackdropFiltersTheme = ({ setTheme }) => {
  const [backdropFilterProp, setBackdropFilterProp] = useState(backdropFilterPropList[0]);
  const [backdropFilterValues, setBackdropFilterValues] = useState([]);

  useEffect(() => {
    const groupedBackdropFilters = groupByParent(backdropFilterValues);

    const backdropFilters = Object.keys(groupedBackdropFilters).reduce((acc, parent) => {
      acc[parent] = groupedBackdropFilters[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      backdropFilterPropList.forEach(prop => {
        if (backdropFilters[prop] && Object.keys(backdropFilters[prop]).length > 0) {
          newTheme[prop] = backdropFilters[prop];
        } else {
          delete newTheme[prop];
        }
      });
      return newTheme;
    });
  }, [backdropFilterValues, setTheme]);

  const addBackdropFilter = () => {
    setBackdropFilterValues([
      ...backdropFilterValues,
      {
        parent: backdropFilterProp,
        value: "1",
        name: `${backdropFilterProp}${backdropFilterValues.length}`,
      },
    ]);
  };

  const deleteBackdropFilter = (backdropFilter) => {
    setBackdropFilterValues(backdropFilterValues.filter((f) => f !== backdropFilter));
  };

  const backdropFilterMap = () => {
    const groupedBackdropFilters = groupByParent(backdropFilterValues);

    return backdropFilterPropList.map((parent) => {
      const backdropFilters = groupedBackdropFilters[parent] || [];

      if (backdropFilters.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {backdropFilters.map((backdropFilter) => {
            const index = backdropFilterValues.findIndex(
              (f) => f.name === backdropFilter.name && f.parent === backdropFilter.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={backdropFilter.name}
                  onChange={(e) => {
                    const newBackdropFilterValues = [...backdropFilterValues];
                    newBackdropFilterValues[index].name = e.target.value;
                    setBackdropFilterValues(newBackdropFilterValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-60 rounded-r-xl"
                  value={backdropFilter.value}
                  onChange={(e) => {
                    const newBackdropFilterValues = [...backdropFilterValues];
                    newBackdropFilterValues[index].value = e.target.value;
                    setBackdropFilterValues(newBackdropFilterValues);
                  }}
                />
                <button onClick={() => deleteBackdropFilter(backdropFilter)}>
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
      <h1 className="mb-3">Create custom backdrop filters</h1>
      <div className="flex w-full">
        <DropDown
          value={backdropFilterProp}
          onChange={(e) => {
            setBackdropFilterProp(e.target.value);
          }}
          content={backdropFilterPropList}
        />
        <button
          onClick={addBackdropFilter}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{backdropFilterMap()}</div>
    </div>
  );
};

export default BackdropFiltersTheme;
