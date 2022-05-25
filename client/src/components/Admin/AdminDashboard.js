import React, { useState, useEffect } from "react";

// Components
import AdminHeader from "./AdminHeader";
import AdminCategorymodal from "./AdminCategorymodal";
import AdminProductmodal from "./AdminProductmodal";
import AdminBody from "./AdminBody";
// Redux
import { useDispatch } from "react-redux";
import { loadCategories } from "../../redux/actions/categoryActions";
import AdminOrdersModal from "./AdminOrdersModal";
import { getProducts } from "../../redux/actions/productActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleOpenOrders = () => {
    setOpenOrders(true);
  };

  return (
    <>
      <AdminHeader
        handleOpenCategory={handleOpenCategory}
        handleOpenProduct={handleOpenProduct}
        handleOpenOrders={handleOpenOrders}
      />
      <AdminCategorymodal
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
      />
      <AdminProductmodal
        openProduct={openProduct}
        setOpenProduct={setOpenProduct}
      />
      <AdminOrdersModal openOrders={openOrders} setOpenOrders={setOpenOrders} />
      <AdminBody />
    </>
  );
};

export default AdminDashboard;
