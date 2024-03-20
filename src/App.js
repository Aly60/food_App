// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./components/store/uiSlice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import OrderConfirm from "./pages/orderConfirm";
import ProductsDetail from "./components/Shop/ProductsDetail";
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <Router>
      <Layout>
        {showCart && <Cart onClosed={toggleCartHandler} />}
        <Routes>
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<ProductsDetail />} />
          <Route path="*" element={<Products />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
