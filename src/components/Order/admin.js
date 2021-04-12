import React from "react";

import classes from "./Order.css";
import Button from "../UI/Button/Button";

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  const orderInfo = props.data.name;
  console.log(props.id);
  return (
    <div className={classes.Order}>
      <p>Customer name: {orderInfo}</p>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
      <p>Status: {props.status}</p>
      <Button btnType="Danger" clicked={props.handleRemove}>
        Remove
      </Button>
      <Button btnType="Success" clicked={props.handleUpdate}>
        update
      </Button>
    </div>
  );
};

export default order;
