import React, { useEffect } from "react";
import classes from "./orderConfirm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/Cart/CartItem";
import { uiActions } from "../../components/store/uiSlice";
//import { clearOrderActions } from "../components/store/clearOrderSlice";
import { cartActions } from "../../components/store/cartSlice";

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  //const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const selectedItems = location.state?.selectedItems || [];

  useEffect(() => {
    dispatch(uiActions.setOrderConfirm(true));
    return () => {
      dispatch(uiActions.setOrderConfirm(false));
    };
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/", { replace: true });
    }, 50000000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  const goBackHandler = () => {
    navigate(-1);
  };
  const clearOrderConfirm = () => {
    dispatch(cartActions.clearCart());
    navigate("/");
  };
  return (
    <div className={classes.oderMain}>
      <h2 className={classes.orderConfirmHeader}>Order Confirmation</h2>

      <ul className={classes.ulListITems}>
        {selectedItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
              description: item.description,
            }}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount: ${totalAmount.toFixed(2)}</span>
      </div>
      <div>
        <button className={classes.goBack} onClick={goBackHandler}>
          Go Back
        </button>
        <button className={classes.clearOrder} onClick={clearOrderConfirm}>
          New Order
        </button>
      </div>
    </div>
  );
};
export default OrderConfirm;
