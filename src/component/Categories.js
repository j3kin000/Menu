import React, { useEffect, useState } from "react";

const Categories = ({ categories, setFilterItems, activeItems }) => {
  const [value, setValue] = useState(categories);

  useEffect(() => {
    setValue(categories);
  }, [categories]);

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div className="d-flex flex-row  mb-2 ">
        {value.map((category, index) => (
          <button
            key={index}
            className="btn border-0 my-2 hover-shadow  mx-2  "
            onClick={() => setFilterItems(category)}
          >
            <p
              className="h6"
              style={{
                borderBottom: activeItems === category ? "2px solid" : "",
              }}
            >
              {category}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
