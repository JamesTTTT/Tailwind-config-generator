import React, { useState, useEffect } from "react";
import { groupByParent } from "../util/util";
import DropDown from "./util/DropDown";

const EffectsTheme = ({ setTheme }) => {
  const [effectProp, setEffectProp] = useState();
  const [effectValues, setEffectValues] = useState([]);

  useEffect(() => {
    const groupedEffects = groupByParent(effectValues);

    const effects = Object.keys(groupedEffects).reduce((acc, parent) => {
      acc[parent] = groupedEffects[parent].reduce((parentAcc, item) => {
        parentAcc[item.name] = item.value;
        return parentAcc;
      }, {});

      return acc;
    }, {});

    setTheme((prevTheme) => ({
      ...prevTheme,
      ...effects,
    }));
  }, [effectValues]);

  const addEffect = () => {
    setEffectValues([
      ...effectValues,
      {
        parent: effectProp,
        value: "10",
        name: `${effectProp}${effectValues.length}`,
      },
    ]);
  };

  const deleteEffect = (effect) => {
    setEffectValues(effectValues.filter((e) => e !== effect));
  };

  const effectPropList = [
    "boxShadow",
    "opacity",
    "backgroundBlendMode",
    "mixBlendMode",
  ];

  const effectMap = () => {
    const groupedEffects = groupByParent(effectValues);

    return effectPropList.map((parent) => {
      const effects = groupedEffects[parent] || [];

      if (effects.length === 0) {
        return [];
      }

      return (
        <div key={parent}>
          <h3 className="text-xl mt-2">{parent}</h3>
          {effects.map((effect) => {
            const index = effectValues.findIndex(
              (e) => e.name === effect.name && e.parent === effect.parent
            );

            return (
              <div
                className="flex items-center my-2"
                key={`${parent}-${index}`}
              >
                <input
                  className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={effect.name}
                  onChange={(e) => {
                    const newEffectValues = [...effectValues];
                    newEffectValues[index].name = e.target.value;
                    setEffectValues(newEffectValues);
                  }}
                />
                <input
                  className=" text-info py-2 bg-neutral w-60 px-2 h-12
				border-transparent focus:border-transparent focus:ring-0"
                  value={effect.value}
                  onChange={(e) => {
                    const newEffectValues = [...effectValues];
                    newEffectValues[index].value = e.target.value;
                    setEffectValues(newEffectValues);
                  }}
                />
                <button onClick={() => deleteEffect(effect)}>
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
      <h1 className="mb-3">Create custom effects</h1>
      <div className="flex w-full">
        <DropDown
          value={effectProp}
          onChange={(e) => {
            setEffectProp(e.target.value);
          }}
          content={effectPropList}
        />
        <button
          onClick={addEffect}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex items-center"
        >
          <span className="mr-3">Add</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">{effectMap()}</div>
    </div>
  );
};

export default EffectsTheme;
