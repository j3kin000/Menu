import React, { useState, useEffect } from "react";
import { addItem, updateItem, deleteItem } from "../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ItemForm = ({ item }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      price: item?.price,
      cost: item?.cost,
      stock: item?.stock,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    category: "breakfast",
    name: "",
    sizes: [""],
    price: "",
    cost: "",
    stock: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (item) {
      setPostData(item);
    }
  }, []);

  const handleSubmitted = async (e) => {
    if (item) {
      dispatch(updateItem(postData));
      setMessage("Updated Succesfully");
    } else {
      dispatch(addItem(postData), () => navigate("/home"));
      setMessage("Added Succesfully");
    }
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "40px" }}
    >
      <div
        className="w-100 m-auto "
        style={{ maxWidth: "350px", padding: "15px" }}
      >
        <form noValidate onSubmit={handleSubmit(handleSubmitted)}>
          <h1 className="h3 mb-3 fw-normal text-center">
            {item ? "Edit your Item" : "Add an Item "}
          </h1>
          {<span className="text-success"> {message}</span>}
          {errors.name ? (
            <span className="text-danger"> Name field is required</span>
          ) : errors.price ? (
            <span className="text-danger"> Price field is required</span>
          ) : errors.cost ? (
            <span className="text-danger"> Cost field is required</span>
          ) : errors.stock ? (
            <span className="text-danger"> Stock field is required</span>
          ) : null}

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control mt-1"
              name="category"
              value={postData.category}
              onChange={(e) =>
                setPostData({ ...postData, category: e.target.value })
              }
            >
              <option>breakfast</option>
              <option>lunch</option>
              <option>shakes</option>
              <option>drinks</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control mt-1"
              name="name"
              value={postData.name}
              {...register("name", { required: true })}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
              placeholder="product name"
            />
          </div>
          {postData.category === "shakes" || postData.category === "drinks" ? (
            <div>
              <label htmlFor="exampleInputPassword1">Sizes</label>
              <div className="form-group form-check">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="small"
                      defaultChecked={postData.sizes?.find(
                        (e) => e === "small"
                      )}
                      onChange={(e) => {
                        e.target.checked
                          ? postData.sizes.push("small")
                          : setPostData({
                              ...postData,
                              sizes: postData.sizes.filter(
                                (e) => e !== "small"
                              ),
                            });
                      }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      small
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="medium"
                      defaultChecked={postData.sizes?.find(
                        (e) => e === "medium"
                      )}
                      onChange={(e) => {
                        e.target.checked
                          ? postData.sizes.push("medium")
                          : setPostData({
                              ...postData,
                              sizes: postData.sizes.filter(
                                (e) => e !== "medium"
                              ),
                            });
                      }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      medium
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="large"
                      defaultChecked={postData.sizes?.find(
                        (e) => e === "large"
                      )}
                      onChange={(e) => {
                        e.target.checked
                          ? postData.sizes.push("large")
                          : setPostData({
                              ...postData,
                              sizes: postData.sizes.filter(
                                (e) => e !== "large"
                              ),
                            });
                      }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      large
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="extraLarge"
                      defaultChecked={postData.sizes?.find(
                        (e) => e === "extraLarge"
                      )}
                      onChange={(e) => {
                        e.target.checked
                          ? postData.sizes.push("extraLarge")
                          : setPostData({
                              ...postData,
                              sizes: postData.sizes.filter(
                                (e) => e !== "extraLarge"
                              ),
                            });
                      }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      extra large
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="form-group">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Price
            </label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder=" $ 0.00"
              name="price"
              value={postData.price}
              {...register("price", { required: true })}
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Cost
            </label>
            <input
              {...register("cost", { required: true })}
              type="number"
              className="form-control mt-1"
              placeholder=" $ 0.00"
              name="cost"
              value={postData.cost}
              onChange={(e) =>
                setPostData({ ...postData, cost: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Stock
            </label>
            <input
              {...register("stock", { required: true })}
              type="number"
              className="form-control mt-1"
              placeholder="0"
              name="stock"
              value={postData.stock}
              onChange={(e) =>
                setPostData({ ...postData, stock: e.target.value })
              }
            />
          </div>
          <div
            className={
              item
                ? "d-flex justify-content-between"
                : "d-flex justify-content-center"
            }
          >
            <button type="submit" className="btn btn-primary mt-3 px-5 ">
              {item ? "Edit" : "Add"}
            </button>
            {item ? (
              <button
                type="button"
                className="btn btn-danger mt-3 px-5 "
                onClick={() =>
                  dispatch(deleteItem(item, () => navigate("/home")))
                }
              >
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
