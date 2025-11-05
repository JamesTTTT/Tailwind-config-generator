import React, { useState, useEffect } from "react";
import DropDown from "./util/DropDown";

const AnimationsTheme = ({ setTheme }) => {
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const animationMap = animations.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});

    const keyframesMap = animations.reduce((acc, item) => {
      if (item.keyframes) {
        acc[item.name] = item.keyframes;
      }
      return acc;
    }, {});

    setTheme((prevTheme) => {
      const newTheme = { ...prevTheme };
      if (Object.keys(animationMap).length > 0) {
        newTheme.animation = animationMap;
      } else {
        delete newTheme.animation;
      }
      if (Object.keys(keyframesMap).length > 0) {
        newTheme.keyframes = keyframesMap;
      } else {
        delete newTheme.keyframes;
      }
      return newTheme;
    });
  }, [animations, setTheme]);

  const addAnimation = () => {
    setAnimations([
      ...animations,
      {
        name: `anim${animations.length}`,
        value: "1s ease-in-out infinite",
        keyframes: "{}",
      },
    ]);
  };

  const deleteAnimation = (animation) => {
    setAnimations(animations.filter((a) => a !== animation));
  };

  return (
    <div className="w-full">
      <h1 className="mb-3">Create custom animations</h1>
      <div className="flex w-full mb-4">
        <button
          onClick={addAnimation}
          className="bg-accent text-neutral font-thin py-2 px-4 rounded flex items-center"
        >
          <span className="mr-3">Add Animation</span>
          <i className="pi pi-plus"></i>
        </button>
      </div>
      <div className="flex-col max-h-96 overflow-scroll">
        {animations.map((animation, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-800 rounded">
            <div className="flex items-center mb-2">
              <input
                className="text-info py-2 bg-neutral w-40 rounded-l-xl px-2 h-12
                border-transparent focus:border-transparent focus:ring-0"
                value={animation.name}
                placeholder="Animation name"
                onChange={(e) => {
                  const newAnimations = [...animations];
                  newAnimations[index].name = e.target.value;
                  setAnimations(newAnimations);
                }}
              />
              <input
                className="text-info py-2 bg-neutral w-60 px-2 h-12
                border-transparent focus:border-transparent focus:ring-0 rounded-r-xl"
                value={animation.value}
                placeholder="Animation value"
                onChange={(e) => {
                  const newAnimations = [...animations];
                  newAnimations[index].value = e.target.value;
                  setAnimations(newAnimations);
                }}
              />
              <button onClick={() => deleteAnimation(animation)}>
                <i className="pi pi-times py-2 h-12 px-4 text-lg transition-colors" />
              </button>
            </div>
            <textarea
              className="text-info py-2 bg-neutral w-full px-2 rounded
              border-transparent focus:border-transparent focus:ring-0"
              rows="3"
              value={animation.keyframes}
              placeholder="Keyframes (CSS object)"
              onChange={(e) => {
                const newAnimations = [...animations];
                newAnimations[index].keyframes = e.target.value;
                setAnimations(newAnimations);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationsTheme;
