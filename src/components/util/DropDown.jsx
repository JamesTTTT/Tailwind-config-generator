import React from "react";

const DropDown = ({ content, onChange, value, orientation, h }) => {
  const orientationClass =
    orientation === "left" ? "rounded-r-xl" : "rounded-l-lg";
  return (
    <select
      className={`bg-neutral py-2 px-3 text-lg w-fit ${h} ${orientationClass}`}
      onChange={onChange}
      value={value}
    >
      {content.map((unit) => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
