import React, { Component } from "react"
import Capture from "./components/Capture"
import TransactionTable from "./components/TransactionTable"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [
        {description: "Aldi", date: new Date(), type: "expense", value: 4243},
        {description: "Rewe", date: new Date(), type: "expense", value: 2223},
        {description: "Stuff", date: new Date(), type: "expense", value: 123},
        {description: "salary", date: new Date(), type: "income", value: 996699},
      ]
    }
  }
  render() {
    return (
      <div className="main-container">
        <div>
          <Capture></Capture>
          <TransactionTable transactions={this.state.transactions}></TransactionTable>
        </div>
      </div>
    )
  }
}

export default App
