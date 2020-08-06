import React, { Component } from "react";
import "./submit.css";
import Option from "./option";
import { connect } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Add extends Component {
  state = {
    readonly: false,
    checked: "",
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  handlecheck = (e) => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    let is_varified = "";
    if (e.currentTarget.checked) is_varified = "yes";
    else is_varified = "no";

    this.setState({ checked: is_varified });
    axios({
      method: "put",
      url: `http://${this.props.url}/admin/${e.currentTarget.value}`,
      headers: { authorization: `Bearer ${token}` },
      data: { is_varified: is_varified },
    }).then((response) => {});
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (this.props.checked === "yes") this.setState({ checked: "yes" });
    else this.setState({ checked: "no" });

    if (user.role === "admin") this.setState({ readonly: true });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    if (this.props.edit != true) {
      axios({
        method: "post",
        url: `http://${this.props.url}/` + `${user.username}` + "/submit",
        headers: { authorization: `Bearer ${token}` },
        data: {
          heading: this.props.title,
          statement: this.props.question,
          opt1: this.props.option1,
          opt2: this.props.option2,
          opt3: this.props.option3,
          opt4: this.props.option4,
          lang: this.props.lang,
          rightopt: this.props.rightans,
        },
      }).then((response) => {
        this.props.history.push("/questions");
      });
    } else {
      axios({
        method: "put",
        url:
          "http://" +
          `${this.props.url}` +
          "/" +
          `${user.username}` +
          "/" +
          `${this.props.id}`,
        headers: { authorization: `Bearer ${token}` },
        data: {
          heading: this.props.title,
          statement: this.props.question,
          opt1: this.props.option1,
          opt2: this.props.option2,
          opt3: this.props.option3,
          opt4: this.props.option4,
          lang: this.props.lang,
          rightopt: this.props.rightans,
        },
      }).then((response) => {
        this.props.history.push("/questions");
      });
    }
  };
  onChangeValue = (event) => {
    this.props.addLang(event.target.value);
  };

  handleQuestion = (e) => {
    this.props.addQues(e.target.value);
  };

  handleTitle = (e) => {
    this.props.addTitle(e.target.value);
  };

  handleRightOption = (e) => {
    this.props.addRightans(e.target.value);
  };

  handleOption1 = (e) => {
    this.props.addop1(e.target.value);
  };
  handleOption2 = (e) => {
    this.props.addop2(e.target.value);
  };
  handleOption3 = (e) => {
    this.props.addop3(e.target.value);
  };
  handleOption4 = (e) => {
    this.props.addop4(e.target.value);
  };
  render() {
    return (
      <form className="frm" onSubmit={this.handleSubmit}>
        <div className="row first">
          <div className="col-lg-7">
            <div className="lang" onChange={this.onChangeValue}>
              <span className="h" style={{ margin: "1vw" }}>
                Select language:
              </span>
              <span>
                <input
                  checked={this.props.lang === "C" ? "checked" : null}
                  type="radio"
                  value="C"
                  name="lang"
                  required
                  readOnly={this.state.readonly}
                />
                <span style={{ margin: "1vw" }}>C</span>
              </span>
              <span style={{ margin: "2vw" }}>
                <input
                  checked={this.props.lang === "C++" ? "checked" : null}
                  type="radio"
                  value="C++"
                  name="lang"
                  readOnly={this.state.readonly}
                />
                <span style={{ margin: "1vw" }}>C++</span>
              </span>
              <span>
                <input
                  checked={this.props.lang === "Python" ? "checked" : null}
                  type="radio"
                  value="Python"
                  name="lang"
                  readOnly={this.state.readonly}
                />
                <span style={{ margin: "1vw" }}>Python</span>
              </span>
            </div>
            <div className="title">
              <textarea
                className="input"
                placeholder="Enter question title"
                id="title"
                name="title"
                value={this.props.title}
                onChange={this.handleTitle}
                rows="1"
                cols="70"
                required
                readOnly={this.state.readonly}
              ></textarea>
            </div>
            <div className="ques">
              <textarea
                placeholder="Enter question"
                className="input"
                id="question"
                name="question"
                rows="14"
                cols="70"
                value={this.props.question}
                onChange={this.handleQuestion}
                required
                readOnly={this.state.readonly}
              ></textarea>
            </div>
          </div>
          <div className="col">
            <div className="opt">
              <Option
                valueRadio={this.props.rightans}
                id="op1"
                valueOption={this.props.option1}
                nameOption="op1"
                onChange={this.handleOption1}
                label="Option 1"
                readonly={this.state.readonly}
              />
              <Option
                id="op2"
                valueOption={this.props.option2}
                nameOption="op2"
                onChange={this.handleOption2}
                label="Option 2"
                readonly={this.state.readonly}
              />
              <Option
                id="op3"
                valueOption={this.props.option3}
                nameOption="op3"
                onChange={this.handleOption3}
                label="Option 3"
                readonly={this.state.readonly}
              />
              <Option
                id="op4"
                valueOption={this.props.option4}
                nameOption="op4"
                onChange={this.handleOption4}
                label="Option 4"
                readonly={this.state.readonly}
              />
            </div>

            <div className="right" onChange={this.handleRightOption}>
              <span className="h">Select Right Option:</span>
              <br />
              <input
                style={{ marginTop: "1vw" }}
                type="radio"
                value={1}
                name="rightans"
                checked={this.props.rightans === 1 ? "checked" : null}
                required
                readonly={this.state.readonly}
              />{" "}
              option 1
              <input
                style={{ marginLeft: "2vw" }}
                type="radio"
                value={2}
                checked={this.props.rightans === 2 ? "checked" : null}
                name="rightans"
                readonly={this.state.readonly}
              />{" "}
              option 2
              <input
                style={{ marginLeft: "2vw" }}
                type="radio"
                value={3}
                name="rightans"
                checked={this.props.rightans === 3 ? "checked" : null}
                readonly={this.state.readonly}
              />{" "}
              option 3
              <input
                style={{ marginLeft: "2vw" }}
                type="radio"
                value={4}
                name="rightans"
                checked={this.props.rightans === 4 ? "checked" : null}
                readonly={this.state.readonly}
              />{" "}
              option 4
            </div>
          </div>
        </div>
        {this.state.readonly === false ? (
          <div className="row second">
            <input type="submit" className="sbmit" value="Submit" />
          </div>
        ) : (
          <div style={{ marginLeft: "45vw", fontSize: "4vh" }}>
            <label for="check">Select</label>
            <input
              id="check"
              type="checkbox"
              style={{ width: "4vw", height: "4vh" }}
              value={this.props.id}
              onChange={this.handlecheck}
              checked={this.state.checked === "yes" ? "checked" : null}
            />
          </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url.url,
    title: state.submit.title,
    question: state.submit.question,
    option1: state.submit.option1,
    option2: state.submit.option2,
    option3: state.submit.option3,
    option4: state.submit.option4,
    rightans: state.submit.rightans,
    lang: state.submit.lang,
    edit: state.submit.edit,
    id: state.submit.id,
    checked: state.submit.is_verified,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTitle: (title) => {
      dispatch({ type: "ADD_TITLE", title: title });
    },
    addQues: (question) => {
      dispatch({ type: "ADD_QUESTION", question: question });
    },
    addop1: (op1) => {
      dispatch({ type: "ADD_OPTION1", option1: op1 });
    },
    addop2: (op2) => {
      dispatch({ type: "ADD_OPTION2", option2: op2 });
    },
    addop3: (op3) => {
      dispatch({ type: "ADD_OPTION3", option3: op3 });
    },
    addop4: (op4) => {
      dispatch({ type: "ADD_OPTION4", option4: op4 });
    },
    addRightans: (rightans) => {
      dispatch({ type: "ADD_RIGHTANS", rightans: rightans });
    },
    addLang: (lang) => {
      dispatch({ type: "ADD_LANG", lang: lang });
    },
    reset: () => {
      dispatch({ type: "RESET" });
    },
    verify: (v) => {
      dispatch({ type: "VERIFY", value: v });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Add);
