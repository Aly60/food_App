import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/uiSlice";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import axios from "axios";
import { fetchCartItems } from "../store/cartSlice";
const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartItems, setCartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cart`);
        setCartItem(response.data);
        const items = response.data;
        setCartItem(items);
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalAmount(total);
      } catch (error) {
        console.log("error from fetch Product Details", error);
      }
    };
    fetchProductDetails();
  }, []);

  const orderHandler = () => {
    navigate("/order-confirm", { state: { selectedItems: cartItems } });
    dispatch(uiActions.toggle());
  };
  return (
    <Modal onClosed={props.onClosed}>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className={classes.total}>
            <span>
              Total Amount: ${totalAmount ? totalAmount.toFixed(2) : 0}
            </span>
          </div>
          <div>
            <button className={classes["button--alt"]} onClick={props.onClosed}>
              Close
            </button>
            <button
              className={classes.button}
              onClick={orderHandler}
              disabled={cartItems === 0}
            >
              Order
            </button>
          </div>
        </ul>
      </Card>
    </Modal>
  );
};

export default Cart;
