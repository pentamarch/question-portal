import React, { Component } from "react";
import "./questions.css";

class Question extends Component {
  state = {};
  render() {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{this.props.index}</td>
        <td style={{ textAlign: "center" }}>{this.props.q.heading}</td>
        <td>
          <div className="edit" onClick={this.props.onEdit}>
            Edit
          </div>
        </td>
        <td>
          <div className="edit" onClick={this.props.onDelete}>
            Delete
          </div>
        </td>
      </tr>
    );
  }
}

export default Question;
