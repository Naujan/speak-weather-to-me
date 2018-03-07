import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Weather } from "./Weather";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Speak weather to me</h1>
        </header>
        <p className="App-intro" />
        <Weather />
      </div>
    );
  }
}
export default App;
