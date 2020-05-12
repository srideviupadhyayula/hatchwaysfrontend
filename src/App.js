import React, { Component } from "react";

import Search from "./components/search";
import Sort from "./components/sort";
import Orders from "./components/orders";

class App extends Component {
  state = {
    orders: [],
    sortType: "asc",
    workers: [],
    foundWorker: null,
    filtered: false
  };

  getOrders() {
    fetch("https://www.hatchways.io/api/assessment/work_orders")
      .then(res => res.json())
      .then(r => {
        let sorted = r.orders.sort(function(a, b) {
          return a.deadline - b.deadline;
        });
        this.setState({ orders: sorted }, this.getWorkerData);
      });
  }
  getWorkerData = () => {
    this.state.orders.map(order => {
      fetch(`https://www.hatchways.io/api/assessment/workers/${order.workerId}`)
        .then(r => r.json())
        .then(r => {
          this.setState({ workers: [...this.state.workers, r.worker] });
        });
    });
  };
  sort = sortType => {
    if (sortType === "asc") {
      this.setState({
        orders: this.state.orders.sort(function(a, b) {
          return a.deadline - b.deadline;
        }),
        sortType: "asc"
      });
    } else if (sortType === "desc") {
      this.setState({
        orders: this.state.orders.sort(function(a, b) {
          return b.deadline - a.deadline;
        }),
        sortType: "desc"
      });
    }
  };

  filterWorker = input => {
    let worker = this.state.workers.find(worker => {
      return worker.name === input;
    });
    this.setState({ foundWorker: worker, filtered: true });
  };
  renderSort = () => {
    if (this.state.orders.length > 0 && this.state.workers.length > 0) {
      return <Sort sort={this.sort} />;
    }
  };
  renderOrders = () => {
    if (
      this.state.workers.length === this.state.orders.length &&
      this.state.orders.length > 0 &&
      this.state.sortType === "asc"
    ) {
      return (
        <Orders
          orders={this.state.orders}
          sort={this.sort}
          workers={this.state.workers}
          filtered={this.state.filtered}
          foundWorker={this.state.foundWorker}
        />
      );
    } else if (this.state.sortType === "desc") {
      return (
        <Orders
          orders={this.state.orders}
          sort={this.sort}
          workers={this.state.workers}
          filtered={this.state.filtered}
          foundWorker={this.state.foundWorker}
        />
      );
    }
  };
  componentDidMount = () => {
    this.getOrders();
  };

  render() {
    return (
      <div className="App">
        <Search filterWorker={this.filterWorker} />
        <br />
        {this.renderSort()}
        {this.renderOrders()}
      </div>
    );
  }
}

export default App;
