import React, { Component } from 'react';
import './App.css';
import jsTPS from './transaction/jsTPS'
import {Num} from './transaction/Num'
import {AddToNum_Transaction} from './transaction/AddToNum_Transaction'
import {AndMask_Transaction} from './transaction/AndMask_Transaction'
import {OrMask_Transaction} from './transaction/OrMask_Transaction'
import { jsTPS_Unit_Tests } from './transaction/jsTPS_Unit_Tests';



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
    this.action = 0;
    this.unitTest=false;
  }
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    change: null
  }

  additem = () =>{
    this.setState({currentScreen:AppScreen.ADD_SCREEN})
    this.setState({change:null})
  }

  additem0 = () =>{
    this.action=0;
    this.additem();
  }

  additem1 = () =>{
    this.action=1;
    this.additem();
  }

  additem2 = () =>{
    this.action=2;
    this.additem();
  }

  changeNum = (evt) =>{
    let adding = parseInt(evt.target.value);
    this.setState({change:adding})
  }
  addTransaction = () =>{
    if(this.action === 0)
    {
      let transaction = new AddToNum_Transaction(this.number,this.state.change);
      this.tps.addTransaction(transaction);
    }
    else if(this.action ===1)
    {
      let num = JSON.parse(JSON.stringify(this.number.getNum()));
      let transaction = new AndMask_Transaction(this.number,num, this.state.change);
      this.tps.addTransaction(transaction);
      console.log(num)
    }
    else if(this.action ===2)
    {
      let num = JSON.parse(JSON.stringify(this.number.getNum()));
      let transaction = new OrMask_Transaction(this.number,num, this.state.change);
      this.tps.addTransaction(transaction);
    }
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

  numValue = () =>{
    return this.number.getNum();
  }

  unitTesting = () =>{
    let unitTest = new jsTPS_Unit_Tests();
    unitTest.testAdd();
    unitTest.testAndMask();
    unitTest.testOrMask();
    unitTest.testRedo();
    unitTest.testUndo();
    unitTest.testClear();
    console.log("unit testing ran fine");
    this.unitTest=true;
    this.unitTestResult();
    this.refresh();
  }

  unitTestResult = () =>{
    console.log(this.unitTest===true);
    if(this.unitTest===true)
      return "Passed"
    else if(this.unitTest===false)
      return "Not Run Yet"
  }

  render() {
    switch(this.state.currentScreen){
      case AppScreen.HOME_SCREEN:
        return (
          <div >
              <h1>jsTPS TESTER</h1>
              <div>Unit Test:{this.unitTestResult()}</div>
              <div>Current Number:{this.numValue()}</div>
              <div>CURRENT jsTPS:</div>
              <div>{this.tps.toString()}</div>
              <button onClick={this.additem0}>Add number</button>
              <button onClick={this.additem1}>And Mask</button>
              <button onClick={this.additem2}>Or Mask</button>
              <button onClick={this.undo}>Undo a Transaction</button>
              <button onClick={this.redo}>Redo a Transaction</button>
              <button onClick={this.clear}>Clear All Transaction</button>
              <button onClick={this.reset}>Reset Num and Transaction</button>
              <button onClick={this.unitTesting}>unit testing</button>
          </div>
        )
      case AppScreen.ADD_SCREEN:
        return (
          <div>
            <div>Enter a number for transaction:</div>
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
      default:
          return (
            <div>ERROR</div>
          )
    }
  }
}

export default App;
