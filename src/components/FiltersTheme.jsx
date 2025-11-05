import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const filterPropList = [
  "blur",
  "brightness",
  "contrast",
  "dropShadow",
  "grayscale",
  "hueRotate",
  "invert",
  "saturate",
  "sepia",
];

const FiltersTheme = ({ setTheme }) => {
  const [filterProp, setFilterProp] = useState(filterPropList[0]);
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    const groupedFilters = groupByParent(filterValues);

    const filters = Object.keys(groupedFilters).reduce((acc, parent) => {
      acc[parent] = groupedFilters[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      // Remove old filter properties that no longer have values
      filterPropList.forEach(prop => {
        if (filters[prop] && Object.keys(filters[prop]).length > 0) {
          newTheme[prop] = filters[prop];
        } else {
          delete newTheme[prop];
        }
      });
      return newTheme;
    });
  }, [filterValues, setTheme]);

  const addFilter = () => {
    setFilterValues([
      ...filterValues,
      {
        parent: filterProp,
        value: "1",
        name: `${filterProp}${filterValues.length}`,
      },
    ]);
  };

  const deleteFilter = (filter) => {
    setFilterValues(filterValues.filter((f) => f !== filter));
  };

  const filterMap = () => {
    const groupedFilters = groupByParent(filterValues);

    return filterPropList.map((parent) => {
      const filters = groupedFilters[parent] || [];

      if (filters.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {filters.map((filter) => {
            const index = filterValues.findIndex(
              (f) => f.name === filter.name && f.parent === filter.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={filter.name}
                  onChange={(e) => {
                    const newFilterValues = [...filterValues];
                    newFilterValues[index].name = e.target.value;
                    setFilterValues(newFilterValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-60 rounded-r-xl"
                  value={filter.value}
                  onChange={(e) => {
                    const newFilterValues = [...filterValues];
                    newFilterValues[index].value = e.target.value;
                    setFilterValues(newFilterValues);
                  }}
                />
                <button onClick={() => deleteFilter(filter)}>
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
      <h1 className="mb-3">Create custom filters</h1>
      <div className="flex w-full">
        <DropDown
          value={filterProp}
          onChange={(e) => {
            setFilterProp(e.target.value);
          }}
          content={filterPropList}
        />
        <button
          onClick={addFilter}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{filterMap()}</div>
    </div>
  );
};

export default FiltersTheme;
