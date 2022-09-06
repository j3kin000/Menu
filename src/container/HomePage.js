import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import menu from "../data";
import Categories from "../component/Categories";
import Menu from "../component/Menu";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchAllItems, fetchItemsCategory } from "../redux/action";
const HomePage = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuState.menu);
  const categories = useSelector((state) => state.menuState.categories);
  const [menuItems, setMenuItems] = useState(menu);
  const [activeItems, setActiveItems] = useState("all");
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    setMenuItems(menu);
  }, [menu]);
  const fetchItems = async () => {
    dispatch(fetchAllItems());
  };
  const setFilterItems = (category) => {
    setActiveItems(category);
    if (category === "all") {
      setMenuItems(menu);
      return;
    }
    const categoryItem = menu?.filter((item) => item.category === category);
    setMenuItems(categoryItem);
  };
  return (
    <div>
      <main>
        <section className=" text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h2 className="">Menu List</h2>
              <p className="lead text-muted">
                Something great happen when it comes to business. Let's create
                your menu now!
              </p>
              <p>
                <Link to={`/item`} className="btn btn-primary my-2">
                  Add Product
                </Link>
              </p>
            </div>
          </div>
        </section>
        <Categories
          categories={categories}
          activeItems={activeItems}
          setFilterItems={setFilterItems}
        />
        <Menu menuItems={menuItems} />
      </main>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
