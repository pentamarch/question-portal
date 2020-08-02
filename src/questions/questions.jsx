import React, { Component } from "react";
import Question from "./question";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import "./questions.css";

class Questions extends Component {
  state = {
    ques: [],
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    axios({
      method: "get",
      url:
        "http://" +
        `${this.props.url}` +
        "/" +
        `${user.username}` +
        "/questions",
      headers: { accessToken: token },
    }).then((response) => {
      this.setState({
        ques: response.data,
      });
    });
  };

  handleEdit = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    axios({
      method: "get",
      url:
        "http://" +
        `${this.props.url}` +
        "/" +
        `${user.username}` +
        "/questions",
    }).then((response) => {
      this.setState({
        ques: response.data,
      });
    });
  };

  render() {
    if (this.state.ques.length == 0)
      return <h5 className="noq">You don't have any questions to display.</h5>;
    return (
      <div className="col" style={{ width: "84vw", marginLeft: "8vw" }}>
        <table class="table ">
          <thead>
            <tr>
              <th style={{ width: "20%", textAlign: "center" }}>Sr. No.</th>
              <th style={{ width: "60%", textAlign: "center" }}>
                Question Title
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.ques.map((q, index) => (
              <Question index={index} q={q} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
  };
};
export default connect(mapStateToProps)(Questions);
