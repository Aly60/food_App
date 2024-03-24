import { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import imagesClasses from "./ProductItemImages.module.css";
import { cartActions } from "../store/cartSlice";
import MealInfo from "../Shop/MealInfo";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductItem = (props) => {
  const { title, price, description, id, img, ingredients } = props;
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
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
            })
          );
        }
      })
      .catch((error) => {
        console.log("Error adding to cart:", error);
      });
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
