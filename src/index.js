import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import replikativ, {hashIt, toEdn, createUUID} from "replikativ";

// initialize replikativ
let user = "mail:alice@stechuhr.de";
let ormapId = createUUID("07f6aae2-2b46-4e44-bfd8-058d13977a8a");
let uri = "ws://localhost:31778";

let globalProps = {aptures: []};

const streamEvalFuncs = {"add": (old, params) => {
  var oldCaptures = old.captures;
  oldCaptures.push(params);
  return {captures: oldCaptures};
}};

function logError(err) {
  console.log(err);
}

let sync = {};

function checkIt(value) {
  replikativ.associate(sync.stage, user, ormapId, hashIt(toEdn(value)), [["add", value]]).then(function() {
    console.log("associated with " + value);
  }, logError);
}


function setupReplikativ() {
  replikativ.newMemStore().then(function(store) {
    sync.store = store;
    return replikativ.clientPeer(store);
  }, logError).then(function(peer) {
    sync.peer = peer;
    return replikativ.createStage(user, peer);
  }, logError).then(function(stage) {
    sync.stage = stage;
    sync.stream = replikativ.streamIntoIdentity(stage, user, ormapId, streamEvalFuncs, globalProps)
    return replikativ.createOrMap(stage, {id: ormapId, description: "transactions"})
  }, logError).then(function() {
    return replikativ.connect(sync.stage, uri);
  }, logError).then(function () {
    alert("stage connected!")
    checkIt({foo: "bar"})
  }, logError);
}

setupReplikativ();
//console.log(replikativ.onNode());

ReactDOM.render(<App props={globalProps}/>, document.getElementById("root"));
registerServiceWorker();
