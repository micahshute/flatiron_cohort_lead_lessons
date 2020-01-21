//Clock.js

import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.tickInterval = setInterval(() => {
      this.setState(prevState => {
        console.log(new Date().toLocaleTimeString());
        return { date: new Date() };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.id);
  }

  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
        <button onClick={this.handleDelete.bind(this)}>X</button>
      </div>
    );
  }
}


// App.js


import React, { useState } from "react";
import Clock from "./Clock";
import "./styles.css";


export default function App(props) {
  const [clockIDs, setClockIDs] = useState([1, 2]);

  const handleDelete = id => {
    const newClockIDs = clockIDs.filter(i => i !== id);
    setClockIDs(newClockIDs);
  };

  const renderClocks = () => {
    return clockIDs.map(id => (
      <Clock id={id} handleDelete={handleDelete} key={id} />
    ));
  };

  return <div className="App">{renderClocks()}</div>;
}
