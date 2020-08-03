import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./signin.css";

class SignIn extends Component {
  state = {
    account: { username: "", password: "" },
    signin: false,
    error: "",
  };

  handleSignIn = () => {
    this.setState({ signin: true });
  };

  handleSignUp = () => {
    this.setState({ signin: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.signin === false) {
      axios
        .post(`http://${this.props.url}/`, {
          username: this.state.account["username"],
          password: this.state.account["password"],
        })
        .then((response) => {
          if (response.data.message)
            this.setState({ error: response.data.message });
          else {
            localStorage.setItem("token", response.data.accessToken);
            this.props.history.replace("/questions");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      axios
        .post(`http://${this.props.url}/login`, {
          username: this.state.account["username"],
          password: this.state.account["password"],
        })

        .then((response) => {
          if (response.data.message)
            this.setState({ error: response.data.message });
          else {
            localStorage.setItem("token", response.data.accessToken);
            this.props.history.replace("/questions");
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value.trim();
    this.setState({ account });
  };

  getSignInClass = () => {
    let classes = "tab ";
    classes += this.state.signin ? "highlight" : "nothighlight";
    return classes;
  };

  getSignUpClass = () => {
    let classes = "tab ";
    classes += this.state.signin ? "nothighlight" : "highlight";
    return classes;
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="head">CLASH QUESTIONS</h2>
        <div className="row login">
          <div className="row tabs ">
            <div
              className={this.getSignInClass()}
              id="sgnin"
              onClick={this.handleSignIn}
            >
              Sign In
            </div>
            <div
              className={this.getSignUpClass()}
              id="sgnup"
              onClick={this.handleSignUp}
            >
              Sign Up
            </div>
          </div>

          <form className="row" onSubmit={this.handleSubmit}>
            <div className="col mx-auto" style={{ width: "90%" }}>
              <input
                onChange={this.handleChange}
                value={this.state.username}
                id="username"
                name="username"
                type="text"
                className="inp"
                placeholder="Username"
                required
              />
              <input
                style={{ marginTop: "5vh" }}
                onChange={this.handleChange}
                value={this.state.password}
                id="password"
                name="password"
                type="password"
                className="inp"
                placeholder="Password"
                required
              />

              {this.state.error && (
                <div className="error">
                  {this.state.error}
                  {/* <span id="warn">!</span> */}
                </div>
              )}
              <input type="submit" className="sbmt" value="Submit" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url.url,
  };
};

export default connect(mapStateToProps)(SignIn);
