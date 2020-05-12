import React, { Component } from "react";
class Sort extends Component {
  state = {
    sorted: false
  };
  handleToggle = () => {
    if (this.state.sorted) {
      this.props.sort("asc");
    } else {
      this.props.sort("desc");
    }
    this.setState({ sorted: !this.state.sorted });
  };
  render() {
    return (
      <div className="sort">
        <div className="sortText">Earliest first --- Latest first</div>
        <input
          checked={this.state.sorted}
          onChange={this.handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          style={{ background: this.state.sorted && "#06D6A0" }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>
    );
  }
}
export default Sort;
