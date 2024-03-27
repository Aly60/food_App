import OrderConfirm from "../pages/orderConfirm/orderConfirm";
import Products from "../pages/products/Products";
import ProductsDetail from "../pages/productsDetail/ProductsDetail";

export const routes = [
  { path: "/order-confirm", element: <OrderConfirm /> },
  { path: "/", element: <Products /> },
  { path: "/product/:productId", element: <ProductsDetail /> },
  { path: "*", element: <Products /> },
];
