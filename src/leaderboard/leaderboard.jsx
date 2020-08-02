import React, { Component } from "react";

class Leaderboard extends Component {
  state = {
    users: [
      { rank: 1, username: "aditi", count: 1 },
      { rank: 2, username: "aditi", count: 1 },
      { rank: 3, username: "aditi", count: 1 },
    ],
  };
  render() {
    return (
      <div className="col" style={{ width: "84vw", marginLeft: "8vw" }}>
        <table class="table ">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Rank</th>
              <th style={{ textAlign: "center" }}>Username</th>
              <th style={{ textAlign: "center" }}>No. of Questions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr>
                <td style={{ width: "20%", textAlign: "center" }}>
                  {user.rank}
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {user.username}
                </td>
                <td style={{ width: "30%", textAlign: "center" }}>
                  {user.count}
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
