import React, { useState } from "react";
import { Link } from "react-router-dom";
const Menu = ({ menuItems }) => {
  const [items, setItems] = useState(menuItems);
  return (
    <div className="container-fluid ">
      <div className="row m-5">
        {menuItems.map((item, key) => {
          const { name, price, stock, sizes } = item;
          return (
            <div className="col-md-6 mb-3 py-2 " key={key}>
              <div
                className="card   bg-transparent d-flex  flex-row "
                // style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <header className="d-flex justify-content-between border-bottom">
                    <h5 className="card-title  mb-2">{name}</h5>
                    <h6> ${price}</h6>
                  </header>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Cost</p>
                    <p className="card-text">{stock}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    {sizes?.length > 0 ? (
                      <p className="card-text">Sizes</p>
                    ) : null}
                    <div>
                      {sizes?.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className="btn btn-light mr-2 border"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Stock</p>
                    <p className="card-text">{stock}</p>
                  </div>
                  <Link
                    to={`/item/${item.key}`}
                    state={{ item: item }}
                    className="btn btn-primary  float-end"
                  >
                    edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
