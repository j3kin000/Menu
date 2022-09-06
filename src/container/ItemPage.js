import React from "react";
import { useLocation } from "react-router-dom";
import ItemForm from "../component/ItemForm";
import { Link } from "react-router-dom";
const ItemPage = () => {
  const params = useLocation();
  return (
    <div>
      <ItemForm item={params?.state?.item} />
      <div className="d-flex justify-content-center">
        <Link to={`/home`} className=" my-2 text-center">
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default ItemPage;
