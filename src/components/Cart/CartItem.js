import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../store/cartSlice";
import axios from "axios";
const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, id } = props.item;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cart/${id}`);
        setQuantity(response.data.quantity || 0);
      } catch (error) {
        console.log("Error fetching quantity:", error);
      }
    };
    fetchQuantity();
  }, [id]);
  const removeItemHandler = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:3001/cart/${id}`,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Removed from cart item");
          dispatch(cartActions.removeItemFromCart(id));
          setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        } else {
          alert("Cart Is Already Empty");
        }
      })
      .catch((error) => {
        console.log("Error removing from cart item", error);
      });
  };
  const addItemHandler = () => {
    axios({
      method: "POST",
      url: `http://localhost:3001/cart/${id}`,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Added to cart", response.data);
          dispatch(
            cartActions.addItemToCart({
              id,
              title,
              price,
            })
          );
          setQuantity((prevQuantity) => prevQuantity + 1);
        }
      })
      .catch((error) => {
        console.log("Error adding to cart:", error);
      });
  };

  const total = (quantity * price).toFixed(2);
  console.log("quantity:", quantity);
  console.log("price:", price);
  console.log("total:", total);
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>

        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
