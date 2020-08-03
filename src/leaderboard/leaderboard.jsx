import React, { Component } from "react";
import axios from "axios";

class Leaderboard extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "/leaderboard",
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {
    return (
      <div className="col" style={{ width: "84vw", marginLeft: "8vw" }}>
        <table className="table ">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Rank</th>
              <th style={{ textAlign: "center" }}>Username</th>
              <th style={{ textAlign: "center" }}>No. of Questions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => (
              <tr key={index}>
                <td style={{ width: "20%", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {user.username}
                </td>
                <td style={{ width: "30%", textAlign: "center" }}>
                  {user.numberQue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
