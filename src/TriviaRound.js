import React, { Component } from 'react';
import './TriviaRound.css';




class TriviaRound extends Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
        <div className="AnswerDiv">
            <button onClick={ ()=> this.props.onClick(this.props.name) }>{this.props.name.value}</button>
        </div>
      );
    }
  }

export default TriviaRound;
