import burger from "../../assets/burger.jpg";
import Pizza from "../../assets/pizza.jpg";
import sushi from "../../assets/sushi.jpg";
import schnitzel from "../../assets/schnitzel.jpg";

const DUMMY_MEALS = [
  {
    id: "m1",
    title: "Sushi",
    description: "finest fish and veggies",
    price: 22.29,
    img: sushi,
    ingrediants: "Fish, rice, seaweed, vegetables",
  },
  {
    id: "m2",
    title: "Schnitzel",
    description: "A german speciality",
    price: 16.5,
    img: schnitzel,
    ingrediants: "chicken, breadcrumbs, flour, eggs",
  },
  {
    id: "m3",
    title: "Barbeque burger",
    description: "American, raw, meaty",
    price: 12.99,
    img: burger,
    ingrediants: "Beef patty, barbecue sauce, cheese, lettuce, tomato",
  },
  {
    id: "m4",
    title: "Pizza",
    description: "Full of Cheese that will melt in your mouth",
    price: 15.6,
    img: Pizza,
    ingrediants: "Dough, tomato sauce, cheese, toppings of your choice",
  },
];
console.log("DUMMY_MEALS", DUMMY_MEALS);

export default DUMMY_MEALS;
