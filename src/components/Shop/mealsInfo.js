import React from "react";
import classes from "../Shop/mealInfo.module.css";

const MealInfo = ({ meal, onClose }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>{meal.title}</h2>
        <p>{meal.description}</p>
        <p>${meal.price.toFixed(2)}</p>
        <p> Ingrediants: {meal.ingrediants}</p>
        <button onClick={onClose}> Close</button>
      </div>
    </div>
  );
};
export default MealInfo;
