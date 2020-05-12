import React from "react";
const Worker = props => {
  return (
    <div className="worker">
      <img
        src={props.worker.image}
        alt={props.worker.name}
        height="10%"
        width="10%"
        className="workerImage"
      />
      <div className="workerInfo">
        <ul>
          <ol>{props.worker.name}</ol>
          <ol>{props.worker.companyName}</ol>
          <ol>{props.worker.email}</ol>
        </ul>
      </div>
    </div>
  );
};
export default Worker;
