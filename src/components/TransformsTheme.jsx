import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const transformPropList = [
  "scale",
  "rotate",
  "skew",
];

const TransformsTheme = ({ setTheme }) => {
  const [transformProp, setTransformProp] = useState(transformPropList[0]);
  const [transformValues, setTransformValues] = useState([]);

  useEffect(() => {
    const groupedTransforms = groupByParent(transformValues);

    const transforms = Object.keys(groupedTransforms).reduce((acc, parent) => {
      acc[parent] = groupedTransforms[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      transformPropList.forEach(prop => {
        if (transforms[prop] && Object.keys(transforms[prop]).length > 0) {
          newTheme[prop] = transforms[prop];
        } else {
          delete newTheme[prop];
        }
      });
      return newTheme;
    });
  }, [transformValues, setTheme]);

  const addTransform = () => {
    setTransformValues([
      ...transformValues,
      {
        parent: transformProp,
        value: "1",
        name: `${transformProp}${transformValues.length}`,
      },
    ]);
  };

  const deleteTransform = (transform) => {
    setTransformValues(transformValues.filter((t) => t !== transform));
  };

  const transformMap = () => {
    const groupedTransforms = groupByParent(transformValues);

    return transformPropList.map((parent) => {
      const transforms = groupedTransforms[parent] || [];

      if (transforms.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {transforms.map((transform) => {
            const index = transformValues.findIndex(
              (t) => t.name === transform.name && t.parent === transform.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={transform.name}
                  onChange={(e) => {
                    const newTransformValues = [...transformValues];
                    newTransformValues[index].name = e.target.value;
                    setTransformValues(newTransformValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-60 rounded-r-xl"
                  value={transform.value}
                  onChange={(e) => {
                    const newTransformValues = [...transformValues];
                    newTransformValues[index].value = e.target.value;
                    setTransformValues(newTransformValues);
                  }}
                />
                <button onClick={() => deleteTransform(transform)}>
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
      <h1 className="mb-3">Create custom transforms</h1>
      <div className="flex w-full">
        <DropDown
          value={transformProp}
          onChange={(e) => {
            setTransformProp(e.target.value);
          }}
          content={transformPropList}
        />
        <button
          onClick={addTransform}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{transformMap()}</div>
    </div>
  );
};

export default TransformsTheme;
