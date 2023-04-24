import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const SizeTheme = ({ setTheme }) => {
  const [size, setSize] = useState();
  const [sizeValues, setSizeValues] = useState([]);

  useEffect(() => {
    const groupedSizes = groupByParent(sizeValues);

    const sizes = Object.keys(groupedSizes).reduce((acc, parent) => {
      acc[parent] = groupedSizes[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = `${item.value}${item.unit}`;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...sizes,
    }));
  }, [sizeValues]);

  const addSizes = () => {
    setSizeValues([
      ...sizeValues,
      {
        parent: size,
        value: "10",
        unit: "rem",
        name: `${size}${sizeValues.length}`,
      },
    ]);
  };

  const deleteSize = (size) => {
    setSizeValues(sizeValues.filter((s) => s !== size));
  };

  const sizePropList = [
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight",
    "container",
  ];

  const unitList = ["px", "rem", "em", "vh", "vw", "%"];

  const sizeMap = () => {
    const groupedSizes = groupByParent(sizeValues);

    return sizePropList.map((parent) => {
      const sizes = groupedSizes[parent] || [];

      if (sizes.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {sizes.map((size) => {
            const index = sizeValues.findIndex(
              (s) => s.name === size.name && s.parent === size.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={size.name}
                  onChange={(e) => {
                    const newSizeValues = [...sizeValues];
                    newSizeValues[index].name = e.target.value;
                    setSizeValues(newSizeValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral w-20 px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={size.value}
                  onChange={(e) => {
                    const newSizeValues = [...sizeValues];
                    newSizeValues[index].value = e.target.value;
                    setSizeValues(newSizeValues);
                  }}
                />
                <DropDown
                  value={size.unit}
                  onChange={(e) => {
                    const newSizeValues = [...sizeValues];
                    newSizeValues[index].unit = e.target.value;
                    setSizeValues(newSizeValues);
                  }}
                  content={unitList}
                />
                <button onClick={() => deleteSize(size)}>
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
      <h1 className="mb-3">Create custom sizes</h1>
      <div className="flex w-full ">
        <DropDown
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
          content={sizePropList}
        />

        <button
          onClick={addSizes}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className=" flex-col max-h-96 overflow-scroll">{sizeMap()}</div>
    </div>
  );
};

export default SizeTheme;
