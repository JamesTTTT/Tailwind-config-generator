import React, { useState } from "react";
import "primeicons/primeicons.css";

const AddProp = ({ selectedProps, setSelectedProps }) => {
  const [selectedProp, setSelectedProp] = useState(null);

  const addProp = () => {
    setSelectedProps(
      selectedProps.map((prop) => {
        if (prop.name === selectedProp.name) {
          return { ...prop, enabled: true };
        } else {
          return prop;
        }
      })
    );
  };

  return (
    <div className="flex items-center">
      <div className="card flex justify-center">
        <select
          value={selectedProp?.name}
          onChange={(e) => {
            const prop = selectedProps.find(
              (prop) => prop.name === e.target.value
            );
            setSelectedProp(prop);
          }}
          className="bg-neutral py-2 px-4 text-lg rounded-l w-full"
        >
          <option>Select a property</option>
          {selectedProps
            .filter((item) => {
              return item.enabled != true;
            })
            .map((prop) => (
              <option key={prop.name} value={prop.name}>
                {prop.name}
              </option>
            ))}
        </select>
      </div>
      <button
        onClick={addProp}
        className="bg-accent text-neutral font-thin py-2 px-4 rounded-r flex align-middle items-center"
      >
        <span className="mr-2">Add</span>
        <i className="pi pi-plus"></i>
      </button>
    </div>
  );
};

export default AddProp;
