import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./signin/signin";
import Questions from "./questions/questions";
import Navbar from "./navbar/navbar";
import Leaderboard from "./leaderboard/leaderboard";
import Add from "./submit/submit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Navbar />
      </Switch>
      <Route path="/:username/questions" component={Questions}></Route>
      <Route path="/:username/submit" component={Add}></Route>
      <Route path="/leaderboard" component={Leaderboard}></Route>
    </BrowserRouter>
  );
}

export default App;
