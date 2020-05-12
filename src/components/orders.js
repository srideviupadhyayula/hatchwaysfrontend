import React, { Component } from "react";
import Order from "./workorder.js";
class Orders extends Component {
  renderOrders = () => {
    if (this.props.orders.length > 0) {
      //no filter
      let orders = this.props.orders;
      //if filter
      if (
        this.props.filtered === true &&
        this.props.foundWorker !== undefined
      ) {
        orders = this.props.orders.filter(order => {
          return order.workerId === this.props.foundWorker.id;
        });
      }
      return orders.map(order => {
        return (
          <Order
            order={order}
            workers={this.props.workers}
            sort={this.props.sort}
          />
        );
      });
    }
  };
  render() {
    return <div className="workOrders">{this.renderOrders()}</div>;
  }
}
export default Orders;
