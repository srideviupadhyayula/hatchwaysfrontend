import React, { Component } from "react";
import Worker from "./workerData";

class Order extends Component {
  state = {
    worker: null
  };
  renderWorker = () => {
    if (!!this.props.workers) {
      let worker = this.props.workers.find(worker => {
        return worker.id === this.props.order.workerId;
      });
      return <Worker worker={worker} />;
    }
  };
  renderConvertedDate = () => {
    let d = new Date(this.props.order.deadline * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = "AM",
      time;
    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }
    time = mm + "/" + dd + "/" + yyyy + ", " + h + ":" + min + " " + ampm;
    return time;
  };

  render() {
    return (
      <div className="workOrder">
        <div className="margin">
          <h1>{this.props.order.name}</h1>
          <p>{this.props.order.description}</p>
          {this.renderWorker()}
          <div className="date">{this.renderConvertedDate()}</div>
        </div>
      </div>
    );
  }
}
export default Order;
