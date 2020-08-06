import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import "../questions/questions.css";

class AllQuestions extends Component {
  state = {
    ques: [],
    lower: 0,
    upper: 0,
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios({
      method: "get",
      url: `http://${this.props.url}/admin`,
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {
      this.setState({
        ques: response.data,
      });
    });
  };

  handleView = (q, index) => {
    this.props.addTitle(q.heading);
    this.props.addRightans(q.rightopt);
    this.props.addop1(q.opt1);
    this.props.addop2(q.opt2);
    this.props.addop3(q.opt3);
    this.props.addop4(q.opt4);
    this.props.addQues(q.statement);
    this.props.addLang(q.lang);
    this.props.handleId(index);
    this.props.verify(q.is_varified);
    this.props.history.push(`/submit`);
  };

  handleChange = (e) => {
    if (e.currentTarget.name === "lower")
      this.setState({ lower: e.currentTarget.value });
    else this.setState({ upper: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios({
      method: "get",
      url: `http://${this.props.url}/admin/${this.state.lower}/${this.state.upper}`,
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {
      this.setState({
        ques: response.data,
      });
    });
  };

  render() {
    return (
      <div className="col" style={{ width: "84vw", marginLeft: "8vw" }}>
        <form style={{ marginTop: "2vh" }} onSubmit={this.handleSubmit}>
          <label for="lower">lower</label>
          <input
            id="lower"
            name="lower"
            onChange={this.handleChange}
            type="text"
          />
          <label for="upper">upper</label>
          <input
            id="upper"
            name="upper"
            onChange={this.handleChange}
            type="text"
          />
          <input type="submit" value="Go" />
        </form>
        <table className="table ">
          <thead>
            <tr>
              <th style={{ width: "20%", textAlign: "center" }}>Sr. No.</th>
              <th style={{ width: "60%", textAlign: "center" }}>
                Question Title
              </th>
              <th>Username</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.ques.map((q, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{q.heading}</td>
                <td style={{ textAlign: "center" }}>{q.username}</td>
                <td>
                  <div
                    className="edit"
                    onClick={() => this.handleView(q, index)}
                  >
                    View
                  </div>
                </td>
                <td>
                  {q.is_varified === "yes" ? (
                    <span className="text-success">checked</span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url.url,
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
    handleClick: () => {
      dispatch({ type: "EDIT", value: true });
    },
    handleId: (id) => {
      dispatch({ type: "ID", id: id });
    },
    verify: (v) => {
      dispatch({ type: "VERIFY", value: v });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllQuestions);
