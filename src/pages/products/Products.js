import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../productItem/ProductItem";
import classes from "./Products.module.css";
const Products = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/meals");

        const mealsData = response.data;
        console.log(mealsData);
        setMeals(mealsData);
      } catch (error) {
        console.log("error from products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className={classes.products}>
      <ul>
        {meals.map((meal) => (
          <ProductItem
            key={meal.id}
            id={meal.id}
            title={meal.title}
            price={meal.price}
            description={meal.description}
            img={meal.img}
            ingredients={meal.ingredients}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
