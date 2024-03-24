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

  const removeItemHandler = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:3001/cart/${id}`,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(cartActions.removeItemFromCart(id));

          const updatedCartItems = cartItems.filter((item) => item.id !== id);

          const existingCartItem = updatedCartItems.find(
            (item) => item.id === id
          );
          if (existingCartItem) {
            setQuantity(existingCartItem.quantity);
          } else {
            setQuantity(0);
          }

          axios({
            method: "PATCH",
            url: "http://localhost:3001/cart",
            data: updatedCartItems,
          })
            .then((response) => {
              console.log("Cart updated on the server:", response.data);
            })
            .catch((error) => {
              console.log("Error updating cart on the server:", error);
            });
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
          const existingCartItem = cartItems.find((item) => item.id === id);
          // if item already exists in cart, update quantity
          if (existingCartItem) {
            const updatedQuantity = existingCartItem.quantity + 1;
            axios({
              method: "PATCH",
              url: `http://localhost:3001/cart/${id}`,
              data: { quantity: updatedQuantity },
            }).then(() => {
              dispatch(
                cartActions
                  .updateItemQuantity({
                    id,
                    quantity: updatedQuantity,
                  })
                  .catch((error) => {
                    console.log("Error updating quantity:", error);
                  })
              );
              setQuantity(updatedQuantity);
            });
            // if item doesn't exist in cart, add it
          } else {
            dispatch(
              cartActions.addItemToCart({
                id,
                title: productDetails.title,
                price: productDetails.price,
                quantity: 1,
              })
            );
            setQuantity(quantity + 1);
          }
        }
      })
      .catch((error) => {
        console.log("Error adding to cart:", error);
      });
  };

  if (!productDetails) {
    return <p> loading...</p>;
  }

  const total = (productDetails.price * quantity).toFixed(2);

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
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
