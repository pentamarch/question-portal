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
      url: `http://${this.props.url}/${user.username}/questions`,
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {
      this.setState({
        ques: response.data,
      });
    });
  };

  handleEdit = (id) => {
    this.props.handleClick();
    this.props.handleId(id);
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    axios({
      method: "get",
      url:
        "http://" +
        `${this.props.url}` +
        "/" +
        `${user.username}` +
        "/" +
        `${id}`,
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {
      this.props.addTitle(response.data.heading);
      this.props.addRightans(response.data.rightopt);

      this.props.addop1(response.data.opt1);
      this.props.addop2(response.data.opt2);
      this.props.addop3(response.data.opt3);
      this.props.addop4(response.data.opt4);
      this.props.addQues(response.data.statement);
      this.props.addLang(response.data.lang);
      this.props.history.push(`/submit`);
    });
  };
  handleDelete = (id) => {
    const ques = this.state.ques.filter((q) => q.queid !== id);
    this.setState({ ques });
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    axios({
      method: "delete",
      url:
        "http://" +
        `${this.props.url}` +
        "/" +
        `${user.username}` +
        "/" +
        `${id}`,
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => {});
  };
  render() {
    if (this.state.ques.length == 0)
      return <h5 className="noq">You don't have any questions to display.</h5>;
    return (
      <div className="col" style={{ width: "84vw", marginLeft: "8vw" }}>
        <table className="table ">
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
              <Question
                key={index}
                index={index + 1}
                onEdit={() => this.handleEdit(q.queid)}
                onDelete={() => this.handleDelete(q.queid)}
                q={q}
              />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
