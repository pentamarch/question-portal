import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./signin/signin";
import Questions from "./questions/questions";
import Navbar from "./navbar/navbar";
import AllQuestions from "./admin/allquestions";
import Leaderboard from "./leaderboard/leaderboard";
import Add from "./submit/submit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Navbar />
      </Switch>
      <Route path="/questions" component={Questions}></Route>
      <Route path="/submit" component={Add}></Route>
      <Route path="/leaderboard" component={Leaderboard}></Route>
      <Route path="/admin/allquestions" component={AllQuestions}></Route>
    </BrowserRouter>
  );
}

export default App;
