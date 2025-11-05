import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const transitionPropList = [
  "transitionProperty",
  "transitionDuration",
  "transitionTimingFunction",
  "transitionDelay",
];

const TransitionsTheme = ({ setTheme }) => {
  const [transitionProp, setTransitionProp] = useState(transitionPropList[0]);
  const [transitionValues, setTransitionValues] = useState([]);

  useEffect(() => {
    const groupedTransitions = groupByParent(transitionValues);

    const transitions = Object.keys(groupedTransitions).reduce((acc, parent) => {
      acc[parent] = groupedTransitions[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      transitionPropList.forEach(prop => {
        if (transitions[prop] && Object.keys(transitions[prop]).length > 0) {
          newTheme[prop] = transitions[prop];
        } else {
          delete newTheme[prop];
        }
      });
      return newTheme;
    });
  }, [transitionValues, setTheme]);

  const addTransition = () => {
    setTransitionValues([
      ...transitionValues,
      {
        parent: transitionProp,
        value: "150ms",
        name: `${transitionProp}${transitionValues.length}`,
      },
    ]);
  };

  const deleteTransition = (transition) => {
    setTransitionValues(transitionValues.filter((t) => t !== transition));
  };

  const transitionMap = () => {
    const groupedTransitions = groupByParent(transitionValues);

    return transitionPropList.map((parent) => {
      const transitions = groupedTransitions[parent] || [];

      if (transitions.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {transitions.map((transition) => {
            const index = transitionValues.findIndex(
              (t) => t.name === transition.name && t.parent === transition.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                  value={transition.name}
                  onChange={(e) => {
                    const newTransitionValues = [...transitionValues];
                    newTransitionValues[index].name = e.target.value;
                    setTransitionValues(newTransitionValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 w-60 rounded-r-xl"
                  value={transition.value}
                  onChange={(e) => {
                    const newTransitionValues = [...transitionValues];
                    newTransitionValues[index].value = e.target.value;
                    setTransitionValues(newTransitionValues);
                  }}
                />
                <button onClick={() => deleteTransition(transition)}>
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
      <h1 className="mb-3">Create custom transitions</h1>
      <div className="flex w-full">
        <DropDown
          value={transitionProp}
          onChange={(e) => {
            setTransitionProp(e.target.value);
          }}
          content={transitionPropList}
        />
        <button
          onClick={addTransition}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{transitionMap()}</div>
    </div>
  );
};

export default TransitionsTheme;
