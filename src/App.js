import React, { Component } from 'react';
import './App.css';
import TriviaRound from './TriviaRound';
import testQuestion from './TestQuestions';

let i=0;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      start_time: new Date().getTime(),
      elapsed: 0,
      // question: testQuestion.description + ' (Click for hint: -5 pts)',
      question: testQuestion[i].description,
      answers: testQuestion[i].answers,
      score: 0,
      submitted: false,
      correct: false,
      hint: false,
      testLength: testQuestion.length
      
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
  
  i = i+1;
  console.log(`in updateScore...i=: ${i}`)

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
    question: testQuestion[i].description,
    answers: testQuestion[i].answers,
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

      if(this.state.submitted && i===testQuestion.length){
         button_group = 
          <div>
           <p>Your answer is: {isCorrect}!</p>
           <p>Your final score is: {this.state.score} out of {10*this.state.testLength} points possible!</p>
           <button onClick={()=> window.location.reload()}>Play Again</button>

           {/* <button onClick={()=> this.nextQuestion()}>Next Question</button> */}
          </div>
      }else if(this.state.submitted && i<testQuestion.length){
         button_group = 
          <div>
           <p>Your answer is: {isCorrect}!</p>
           <button onClick={()=> this.nextQuestion()}>Next Question</button>
          </div>
      }else{
        button_group = 
        <div className="Answers">
                <TriviaRound name={this.state.answers[0]}  onClick={ (name)=> this.updateScore(name)}/>
                <TriviaRound name={this.state.answers[1]}  onClick={ (name)=> this.updateScore(name)}/>
                <TriviaRound name={this.state.answers[2]}  onClick={ (name)=> this.updateScore(name)}/>
                <TriviaRound name={this.state.answers[3]}  onClick={ (name)=> this.updateScore(name)}/>
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

