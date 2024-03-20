import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./productsDetail.module.css";
//import DUMMY_MEALS from "./dummyMeals";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
//import CartItem from "../Cart/CartItem";
const ProductsDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [Cart, setIsCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const selectedProduct = useSelector((state) =>
    state.cart.items.find((product) => product.id === productId)
  );

  useEffect(() => {
    const productInCart = cart.items.find(
      (item) => item.id === selectedProduct?.id
    );
    setIsCart(!productInCart);
  }, [selectedProduct?.id, cart.items]);

  // use useEffect to fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/meals/${productId}`
        );

        const product = response.data;

        setIsCart(product);
      } catch (error) {
        console.log("error from Product Details", error);
      }
    };
    //fetch data from the server
    fetchData();
  }, [productId, selectedProduct]);

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: Cart.id,
        title: Cart.title,
        price: Cart.price,
        description: Cart.description,
        ingrediants: Cart.ingrediants,
      })
    );
  };
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(selectedProduct?.id));
  };

  return (
    <div className={classes.detailsContainer}>
      <h2>Product Details</h2>
      <img src={Cart.img} alt="Product" />
      <div className={classes.priceDetail}>
        <p>Price: {Cart.price} $</p>
      </div>
      <p>Title Of The Meal:{Cart.title}</p>
      <p>Description: {Cart.description}</p>
      <p>Ingrediants: {Cart.ingrediants}</p>
      <div className={classes.action}>
        <button onClick={addToCartHandler}> Add </button>
        {selectedProduct && (
          <button onClick={removeItemHandler} disabled={cartQuantity === 0}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductsDetail;
