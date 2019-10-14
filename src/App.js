import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsTPS from './transaction/jsTPS'
import {Num} from './transaction/Num'
import {AddToNum_Transaction} from './transaction/AddToNum_Transaction'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  ADD_SCREEN: "ADD_SCREEN",
  REFRESH: "REFRESH"
}

class App extends Component {
  constructor(){
    super();
    this.tps = new jsTPS();
    this.number = new Num();
  }
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    change: null
  }

  additem = () =>{
    this.setState({currentScreen:AppScreen.ADD_SCREEN})
    this.setState({change:null})
  }

  changeNum = (evt) =>{
    let adding = parseInt(evt.target.value);
    this.setState({change:adding})
  }

  addTransaction = () =>{
    let transaction = new AddToNum_Transaction(this.number,this.state.change);
    this.tps.addTransaction(transaction);
    this.setState({currentScreen:AppScreen.HOME_SCREEN});
  }

  undo=()=>{
    this.tps.undoTransaction();
    this.refresh();
  }

  redo=()=>{
    this.tps.doTransaction();
    this.refresh();
  }

  refresh=()=>{
    this.setState({currentScreen:AppScreen.REFRESH})
    this.setState({currentScreen:AppScreen.HOME_SCREEN})
  }

  clear=()=>{
    this.tps.clearAllTransactions();
    this.refresh();
  }

  reset=()=>{
    console.log("this")
    this.tps.clearAllTransactions();
    this.number.setNum(0);
    this.refresh();
  }

  render() {
    switch(this.state.currentScreen){
      case AppScreen.HOME_SCREEN:
        return (
          <div >
              <h1>jsTPS TESTER</h1>
              <div>Current Number:{this.number.getNum()}</div>
              <div>CURRENT jsTPS:</div>
              <div>{this.tps.toString()}</div>
              <button onClick={this.additem}>Add a Transaction</button>
              <button onClick={this.undo}>Undo a Transaction</button>
              <button onClick={this.redo}>Redo a Transaction</button>
              <button onClick={this.clear}>Clear All Transaction</button>
              <button onClick={this.reset}>Reset Num and Transaction</button>
          </div>
        )
      case AppScreen.ADD_SCREEN:
        return (
          <div>
            <div>Enter an amount to add:</div>
            <input 
            type="text"
            value={this.state.change}
            onChange={this.changeNum}/>
            <button
            onClick={this.addTransaction}
            >add transaction</button>
          </div>
        )
      case AppScreen.REFRESH:
        return (
          <div></div>
        )
    }
  }
}

export default App;
