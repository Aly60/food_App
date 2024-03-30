import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../store/cartSlice";
import axios from "axios";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id } = props.item;
  const cartItems = useSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems, id]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/meals/${id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.log("error from fetch Product Details", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      setTotal((productDetails.price * quantity).toFixed(2));
    }
  }, [productDetails, quantity]);

  const removeItemHandler = () => {
    if (quantity === 1) {
      axios({
        method: "DELETE",
        url: `http://localhost:3001/cart/${id}`,
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(cartActions.clearCart(id));
            setQuantity(0);
          }
        })
        .catch((error) => {
          console.log("Error removing from cart:", error);
        });
    } else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/cart/${id}`,
        data: { quantity: quantity - 1 },
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              cartActions.removeItemFromCart({ id, quantity: quantity - 1 })
            );
            setQuantity(quantity - 1);
            /*
           const updatedCartItems = cartItems.filter((item) => item.id !== id);

            const existingCartItem = updatedCartItems.find(
              (item) => item.id === id
            );
            if (existingCartItem) {
             setQuantity(existingCartItem.quantity);
             } else {
              setQuantity(quantity - 1);
            }*/
          }
        })
        .catch((error) => {
          console.log("Error removing from cart item", error);
        });
    }
  };
  const addItemHandler = () => {
    const existingCartItem = cartItems.find((item) => item.id === id);

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + 1;
      axios({
        method: "PATCH",
        url: `http://localhost:3001/cart/${id}`,
        data: { quantity: updatedQuantity },
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              cartActions.addItemToCart({
                id,
                title: productDetails.title,
                price: productDetails.price,
                quantity: updatedQuantity,
              })
            );
            setQuantity(updatedQuantity);
          }
        })
        .catch((error) => {
          console.log("Error updating cart item:", error);
        });
    } else {
      axios({
        method: "POST",
        url: `http://localhost:3001/cart`,
        data: {
          id,
          title: productDetails.title,
          price: productDetails.price,
          quantity: 1,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            dispatch(
              cartActions.addItemToCart({
                id,
                title: productDetails.title,
                price: productDetails.price,
                quantity: 1,
              })
            );
            setQuantity(1);
          }
        })
        .catch((error) => {
          console.log("Error adding item to cart:", error);
        });
    }
  };

  if (!productDetails) {
    return <p> loading...</p>;
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{productDetails.title}</h3>
        <div className={classes.price}>
          ${total}
          <span className={classes.itemprice}>
            (${productDetails.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>

        <div className={classes.actions}>
          <button className={classes.remove} onClick={removeItemHandler}>
            -
          </button>
          <button className={classes.add} onClick={addItemHandler}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
