import { useMachine } from "@xstate/react";
import Home from "components/home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { appMachine, MachineContext } from "state";

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </MachineContext.Provider>
  );
}

export default App;
