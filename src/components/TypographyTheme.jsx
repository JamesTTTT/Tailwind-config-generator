import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";

const TypographyComponent = ({ setTheme }) => {
  const [property, setProperty] = useState();
  const [propertyValues, setPropertyValues] = useState([]);

  useEffect(() => {
    const groupedProperties = groupByParent(propertyValues);

    const properties = Object.keys(groupedProperties).reduce((acc, parent) => {
      acc[parent] = groupedProperties[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.unit
          ? `${item.value}${item.unit}`
          : item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...properties,
    }));
  }, [propertyValues]);

  const addProperty = () => {
    setPropertyValues([
      ...propertyValues,
      {
        parent: property,
        value: "10",
        unit: "rem",
        name: `${property}${propertyValues.length}`,
      },
    ]);
  };

  const deleteProperty = (property) => {
    setPropertyValues(propertyValues.filter((p) => p !== property));
  };

  const typographyPropList = [
    "fontSize",
    "fontWeight",
    "lineHeight",
    "letterSpacing",
  ];

  const unitList = ["px", "rem", "em", "vh", "vw", "%"];

  const typographyMap = () => {
    const groupedProperties = groupByParent(propertyValues);

    const hasFontProperties = (parent) => {
      return ["fontSize", "lineHeight", "letterSpacing"].includes(parent);
    };

    return typographyPropList.map((parent) => {
      const properties = groupedProperties[parent] || [];

      if (properties.length === 0) {
        return null;
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {properties.map((property) => {
            const index = propertyValues.findIndex(
              (p) => p.name === property.name && p.parent === property.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12 border-transparent focus:border-transparent focus:ring-0"
                  value={property.name}
                  onChange={(e) => {
                    const newPropertyValues = [...propertyValues];
                    newPropertyValues[index].name = e.target.value;
                    setPropertyValues(newPropertyValues);
                  }}
                />
                <input
                  className={`text-info py-2 bg-neutral w-20 px-2 h-12 border-transparent focus:border-transparent focus:ring-0 ${
                    hasFontProperties(parent) ? "" : "rounded-r-xl w-52"
                  }`}
                  value={property.value}
                  onChange={(e) => {
                    const newPropertyValues = [...propertyValues];
                    newPropertyValues[index].value = e.target.value;
                    setPropertyValues(newPropertyValues);
                  }}
                />
                {["fontSize", "lineHeight", "letterSpacing"].includes(
                  parent
                ) && (
                  <select
                    value={property.unit}
                    onChange={(e) => {
                      const newPropertyValues = [...propertyValues];
                      newPropertyValues[index].unit = e.target.value;
                      setPropertyValues(newPropertyValues);
                    }}
                    className="bg-neutral py-2 px-1 text-lg w-fit h-12 rounded-r-xl"
                  >
                    <option>Select a unit</option>
                    {unitList.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                )}
                <button onClick={() => deleteProperty(property)}>
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
      <h1 className="mb-3">Customize Typography</h1>
      <div className="flex w-full">
        <select
          value={property}
          onChange={(e) => {
            setProperty(e.target.value);
          }}
          className="bg-neutral py-2 px-4 text-lg rounded-l w-48 h-fit"
        >
          <option>Select a property</option>
          {typographyPropList.map((prop) => (
            <option key={prop} value={prop}>
              {prop}
            </option>
          ))}
        </select>
        <button
          onClick={addProperty}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">
        {typographyMap().filter((item) => item !== null)}
      </div>
    </div>
  );
};

export default TypographyComponent;
