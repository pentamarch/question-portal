import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

class Navbar extends Component {
  state = {};

  handleLogout = () => {};

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/aditi/submit">
                  Add Question
                </NavLink>
              </li>
              <li style={{ marginLeft: "2vw" }} className="nav-item">
                <NavLink className="nav-link" to="/aditi/questions">
                  All Questions
                </NavLink>
              </li>
              <li style={{ marginLeft: "2vw" }} className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="logout" onClick={this.handleLogout}>
            Logout
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
