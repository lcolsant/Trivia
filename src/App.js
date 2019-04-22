import React, { Component } from 'react';
import './App.css';
import TriviaRound from './TriviaRound';


const testQuestion = {
  "questionId": 1,
  "description": "What player holds the career record for most stolen bases?",
  "hint": "This player stole a single season record of 130 bases in 1983 as a member of the Oakland Athetics",
  "topicId": 1,
  "answers": [
    {
      "answerId": 1,
      "value": "Rickey Henderson",
      "questionId": 1,
      "isCorrect": true
    },
    {
      "answerId": 2,
      "value": "Wade Boggs",
      "questionId": 1,
      "isCorrect": false
    },
    {
      "answerId": 3,
      "value": "Willie Mays Hayes",
      "questionId": 1,
      "isCorrect": false
    }
  ]
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      start_time: new Date().getTime(),
      elapsed: 0,
      // question: testQuestion.description + ' (Click for hint: -5 pts)',
      question: testQuestion.description,
      answers: testQuestion.answers,
      score: 0,
      submitted: false,
      correct: false,
      hint: false
      
    }
  }
  
componentWillMount(){
    setInterval( ()=>{
      let end_time = new Date().getTime();
      let elapsed_time = Math.floor(((end_time-this.state.start_time)/1000));
      this.setState({elapsed: elapsed_time})
    },1000)
}


updateScore(name){
  
  this.setState({submitted: true})
  console.log(`You have selected ${name.value}!`);

  if(name.isCorrect === true ){
    
    if(this.state.hint === false){
      this.setState( (priorState)=>({
        score: priorState.score + 10,
        correct: true
      }))
    }else{
      this.setState( (priorState)=>({
        score: priorState.score + 5,
        correct: true
      }))
    }
    
  }
}


//this function is used if hints are allowed.
giveHint(){
  this.setState({
    
    question: testQuestion.hint,
    hint: true,

  })
}

nextQuestion(){
  this.setState({
    submitted: false,
    correct: false,
    hint: false
  })
}


  render() {
      let isCorrect;

      if (this.state.correct){
        isCorrect = 'correct'
      }else{
        isCorrect = 'incorrect'
      }
      let button_group;

      if(this.state.submitted){
         button_group = 
          <div>
           <p>Your answer is: {isCorrect}!</p>
           <button onClick={()=> this.nextQuestion()}>Next Question</button>
          </div>
      }else{
        button_group = 
        <div className="Answers">
            {/* for(let i=0; i<this.state.answers.length; i++){ */}
                <TriviaRound name={this.state.answers[0]}  onClick={ (name)=> this.updateScore(name)}/>
                <TriviaRound name={this.state.answers[1]}  onClick={ (name)=> this.updateScore(name)}/>
                <TriviaRound name={this.state.answers[2]}  onClick={ (name)=> this.updateScore(name)}/>
              {/* } */}
        </div>

      }

    return (
      <div className="App">
      <h2>TriviaRound</h2>
        <div className="Soreboard">
          <p id="score">Your Score: {this.state.score}</p>
          <p id="timer">Timer: {this.state.elapsed}</p>
        </div>
  
        {/* <button className="Question" onClick={()=>this.giveHint()}>
          {this.state.question}
        </button> */}
        <div className="Question">
          {this.state.question}
        </div>
        
          <h4>Select your answer:</h4>
          <div>{button_group}</div>

      </div>
    );
  }
}

export default App;

