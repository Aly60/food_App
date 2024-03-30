import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import classes from "./ProductItem.module.css";
import imagesClasses from "./ProductItemImages.module.css";
import { cartActions } from "../../components/store/cartSlice";
import MealInfo from "../../components/Shop/MealInfo";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductItem = (props) => {
  const { title, price, description, id, img, ingredients } = props;
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addToCartHandler = () => {
    const existingCartItem = cartItems.find((item) => item.id === id);
    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + 1;
      // const updatedPrice = existingCartItem.price + price;
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
                quantity: updatedQuantity,
                price,
              })
            );
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
          title,
          price,
          description,
          img,
          ingredients,
          quantity: 1,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("Added to cart", response.data);
            dispatch(
              cartActions.addItemToCart({
                id,
                title,
                price,
                description,
                img,
                ingredients,
                quantity: 1,
              })
            );
          }
        })
        .catch((error) => {
          console.log("Error adding to cart:", error);
        });
    }
  };

  const openInfo = () => {
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <div
            className={`${classes.imageContainer} ${imagesClasses.imageContainer}`}
            onClick={openInfo}
          >
            <Link to={`/product/${id}`}>
              <img
                src={img}
                alt={title}
                className={`${classes.image} ${imagesClasses.image}`}
              />
            </Link>
          </div>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add To Cart</button>
        </div>
      </Card>
      {showInfo && (
        <MealInfo
          meal={{ title, description, price, ingredients }}
          onClose={closeInfo}
        />
      )}
    </li>
  );
};

export default ProductItem;
