// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./components/store/uiSlice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import { routes } from "./routes";
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
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
