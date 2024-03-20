import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";
import { Fragment } from "react";
import mealsImage from "../../assets/table.jpg";
import { Link } from "react-router-dom";
const MainHeader = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FreeMeals</h1>
        <Link to="/product-item">
          <div className={classes.home}>Home</div>
        </Link>
        <nav>
          <ul>
            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="meals" />
      </div>
    </Fragment>
  );
};

export default MainHeader;
