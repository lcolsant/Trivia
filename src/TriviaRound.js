import React, { Component } from 'react';
import './TriviaRound.css';




class TriviaRound extends Component {
    render() {
      return (
        <div className="AnswerDiv">
            <button onClick={ ()=> this.props.onClick(this.props.answer) }>{this.props.answer.value}</button>
        </div>
      );
    }
  }

export default TriviaRound;
