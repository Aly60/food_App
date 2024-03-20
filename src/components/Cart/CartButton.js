import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../store/uiSlice";

//import { useLocation } from "react-router-dom";
const CartButton = (props) => {
  const dispatch = useDispatch();
  //const location = useLocation();
  // const isOrderConfirm = location.pathname === "/order-confirm";
  const isOrderConfirm = useSelector((state) => state.ui.isOrderConfirm);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const toogleCartHandler = () => {
    if (!isOrderConfirm) {
      dispatch(uiActions.toggle());
    }
  };
  return (
    <button className={classes.button} onClick={toogleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
