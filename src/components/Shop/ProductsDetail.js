import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./productsDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
const ProductsDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(null);
  const cart = useSelector((state) => state.cart);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/meals/${productId}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.log("error from Product Details", error);
      }
    };
    fetchData();
  }, [productId]);

  const addToCartHandler = async () => {
    try {
      await axios.post("http://localhost:3001/cart", productDetails);
      dispatch(
        cartActions.addItemToCart({
          id: productDetails.id,
          title: productDetails.title,
          price: productDetails.price,
          description: productDetails.description,
          ingrediants: productDetails.ingrediants,
        })
      );
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
  const removeItemHandler = async () => {
    try {
      await axios.delete(`http://localhost:3001/cart/${productId}`);
      dispatch(cartActions.removeItemFromCart(productId));
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };
  if (!productDetails) {
    return <p>loading</p>;
  }
  return (
    <div className={classes.detailsContainer}>
      <h2>Product Details</h2>
      <img src={productDetails.img} alt="Product" />
      <div className={classes.priceDetail}>
        <p>Price: {productDetails.price} $</p>
      </div>
      <p>Title Of The Meal:{productDetails.title}</p>
      <p>Description: {productDetails.description}</p>
      <p>Ingrediants: {productDetails.ingrediants}</p>
      <div className={classes.action}>
        <button onClick={addToCartHandler}> Add </button>
        {cart.items.find((item) => item.id === productDetails.id) && (
          <button onClick={removeItemHandler} disabled={cartQuantity === 0}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductsDetail;
