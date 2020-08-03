import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import "./navbar.css";

class Navbar extends Component {
  state = {};

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
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
                <NavLink className="nav-link" to={`/submit`}>
                  Add Question
                </NavLink>
              </li>
              <li style={{ marginLeft: "2vw" }} className="nav-item">
                <NavLink className="nav-link" to={`/questions`}>
                  All Questions
                </NavLink>
              </li>
              <li style={{ marginLeft: "2vw" }} className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>

              <li style={{ marginLeft: "50vw" }} className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link logout"
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch({ type: "EDIT", value: false });
    },
    reset: () => {
      dispatch({ type: "RESET" });
    },
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
