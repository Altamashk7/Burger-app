import React, { Component } from "react";

import Order from "../../components/Order/admin";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });

    this.handleRemove = (id) => {
      axios.delete(`orders/${id}.json`).then((response) => {
        console.log(response.data);
      });

      this.setState({
        orders: this.state.orders.filter((order) => order.id !== id),
      });
      console.log("sgsd");
    };

    this.handleUpdate = (order) => {
      console.log(order.price);
      axios
        .put(`orders/${order.id}.json`, {
          ingredients: order.ingredients,
          price: order.price,
          orderData: order.orderData,
          status: "done",
        })
        .then((response) => {
          axios
            .get("/orders.json")
            .then((res) => {
              console.log(res);
              const fetchedOrders = [];
              for (let key in res.data) {
                fetchedOrders.push({
                  ...res.data[key],
                  id: key,
                });
              }
              this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch((err) => {
              this.setState({ loading: false });
            });
          console.log(response.data);
        });
      console.log("sgsd");
    };
  }

  render() {
    let orders = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      orders = this.state.orders.map((order) => (
        <Order
          id={order.id}
          ingredients={order.ingredients}
          price={order.price}
          data={order.orderData}
          status={order.status}
          handleRemove={() => this.handleRemove(order.id)}
          handleUpdate={() => this.handleUpdate(order)}
          key={order}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
