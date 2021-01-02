import React from "react";
// import "./App.css";
import Students from "./components/students";
import StudentEditor from "./components/StudentEditor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/students"]} component={Students} />
          <Route exact path="/students/:id" component={StudentEditor} />
        </Switch>
      </Router>
      {/* <Students /> */}
    </div>
  );
}

export default App;
