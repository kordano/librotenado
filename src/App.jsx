import React, { Component } from "react"
import Capture from "./components/Capture"
import TransactionTable from "./components/TransactionTable"
import replikativ, {hashIt, toEdn, createUUID} from "replikativ";
import "./App.css"

// initialize replikativ
const user = "mail:alice@stechuhr.de";
const ormapId = createUUID("07f6aae2-2b46-4e44-bfd8-058d13977a8a");
const uri = "ws://localhost:31778";
const replica = createReplica();


function createEvalFns(component)  {
  return {"add": (supervisor, old, params) => {
    const transactions = old.transactions;
    transactions.push(params);
    component.setState({transactions});
    return {transactions};
  }};
}

function logError(err) {
  console.log(err);
}

function checkIt(value) {
  replikativ.associate(replica.stage, user, ormapId, hashIt(toEdn(value)), [["add", value]]).then(function() {
    console.log("associated with " + JSON.stringify(value));
  }, logError);
}

function createReplica(evalFns) {
  var replica = {
    state: {transactions: []},
    checkIt
  };
  replikativ.newMemStore().then(function(store) {
    replica.store = store;
    return replikativ.clientPeer(store);
  }, logError).then(function(peer) {
    replica.peer = peer;
    return replikativ.createStage(user, peer);
  }, logError).then(function(stage) {
    replica.stage = stage;
    replica.stream = replikativ.streamIntoIdentity(stage, user, ormapId, evalFns, replica.state)
    return replikativ.createOrMap(stage, {id: ormapId, description: "transactions"})
  }, logError).then(function () {
    console.log("associated");
    return replikativ.connect(replica.stage, uri);
  }, logError).then((result) => {
    console.log("stage connected")
  }, logError);
  return replica;
}

class App extends Component {
  constructor(props) {
    super(props)
    const evalFns = createEvalFns(this)
    const replica = createReplica(evalFns)

    this.state = {
      transactions: [],
      replica
    };

    this.addTransaction = this.addTransaction.bind(this)
  }
  addTransaction({description, value, type}) {
    const tx = {description, value, date: new Date()}
    const replica = this.state.replica
    replikativ.associate(replica.stage, user, ormapId, hashIt(toEdn(tx)), [["add", tx]]).then(function() {
      console.log("associated with " + JSON.stringify(tx));
    }, logError);
  }
  render() {
    return (
      <div className="main-container">
        <div>
          <Capture addTransaction={this.addTransaction}></Capture>
          <TransactionTable transactions={this.state.transactions}></TransactionTable>
        </div>
      </div>
    )
  }
}

export default App
