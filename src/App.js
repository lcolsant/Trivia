import React, { Component } from 'react';
import './App.css';
import TriviaRound from './TriviaRound';
import sportsQs from './Sports';
import entertainmentQs from './Entertainment';
import scienceQs from './Science';


let i=0;
let timer;
let question;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      start_time: new Date().getTime(),
      elapsed: 0,
      penalty: false,
      // question: question[i].description,
      // answers: question[i].answers,
      question: null,
      answers: 5,
      score: 0,
      submitted: false,
      correct: false,
      hint: false,
      testLength: null,
      iscatagory: false,
      catagory: null
      
    }

    this.initialState = this.state;

  }
  
componentWillMount(){
    //   timer = setInterval( ()=>{
    //   let end_time = new Date().getTime();
    //   let elapsed_time = Math.floor(((end_time-this.state.start_time)/1000));
    //   this.setState({elapsed: elapsed_time})
    // },1000)
}

componentWillUnmount(){
  clearInterval(timer);
}


updateScore(name){
  
  i = i+1;

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

playAgain(){
  i=0
  this.setState(this.initialState);
}

nextQuestion(){

  if (this.state.catagory === "Sports"){
    question = sportsQs;
  }else if(this.state.catagory === "Entertainment"){
    question = entertainmentQs;
  }else{
    question = scienceQs;
  }
  
  this.setState({
    question: question[i].description,
    answers: question[i].answers,
    submitted: false,
    correct: false,
    hint: false
  })
}

clearTimer(timer){
  clearInterval(timer);
}

calcScore(){

  if(this.state.elapsed>60){

    return Math.max( (this.state.score-5),0);
  
  }else{
    return this.state.score
  }
}

selectCatagory(catagory){

  console.log(`You have selected ${catagory}`)

  if (catagory === "Sports"){
    question = sportsQs;
  }else if(catagory === "Entertainment"){
    question = entertainmentQs;
  }else{
    question = scienceQs;
  }

  this.setState({
    iscatagory: true,
    catagory: catagory,
    question: question[i].description,
    answers: question[i].answers,
    start_time: new Date().getTime(),
    testLength: question.length,

  })


  timer = setInterval( ()=>{
    let end_time = new Date().getTime();
    let elapsed_time = Math.floor(((end_time-this.state.start_time)/1000));
    this.setState({elapsed: elapsed_time})
  },1000)
}


  render() {
      let isCorrect;
      let iscatagory = this.state.iscatagory;
      
      if (this.state.correct){
        isCorrect = 'correct'
      }else{
        isCorrect = 'incorrect'
      }
      let button_group;
      
      if(this.state.submitted && i===this.state.testLength){
        this.clearTimer(timer);
         button_group = 
          <div>
            <p>Your answer is: {isCorrect}!</p>
            <p>Your final score is: {this.calcScore()} out of {10*this.state.testLength} points possible!</p>
            <p>{this.state.elapsed>60 ? 'You received a 5 pt penalty for exceeding 60 seconds.':''}</p>
            <button onClick={()=> this.playAgain()}>Play Again</button>
          </div>
      }else if(this.state.submitted && i<this.state.question.length){
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
          <div>
          { !iscatagory ?
            <React.Fragment>
              <p>Select Trivia Catagory:</p>
              <button onClick={()=> this.selectCatagory("Sports")}>Sports</button>
              <button onClick={()=> this.selectCatagory("Entertainment")}>Entertainment</button>
              <button onClick={()=> this.selectCatagory("Science")}>Science</button>
            </React.Fragment>: null
          }
          </div>
          { iscatagory ? 
            <React.Fragment>
            <div className="Soreboard">
              <p id="score">Your Score: {this.state.score}</p>
              <p id="timer">Timer: {this.state.elapsed}</p>
            </div>

            <div className="Question">
              {this.state.question}
            </div>
          
            <h4>Select your answer:</h4>
            <div>{button_group}</div>
          </React.Fragment>: null
          }
      </div>
    );
  }
}

export default App;

