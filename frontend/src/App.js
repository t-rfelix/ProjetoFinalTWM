import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';


import { Navbar1, Navbar2 } from './components/navbar';
import { Home1, Home2 } from './components/home';
import Login from './components/login';
import Register from './components/register';
import Question from './components/question';
import Respond from './components/respond';
import Ask from './components/ask';



function App() {
  const [usertoken, setUsertoken] = useState(sessionStorage.getItem('usertoken') || '');
 
  useEffect(() => {
    sessionStorage.setItem('usertoken', usertoken);
  }, [usertoken]);



  if(usertoken) {

    return (
      <Router>              
        <Navbar2 setUsertoken={setUsertoken}/>
        <br/>
        <Switch>
          <Route exact path="/">
            <Home2 />
          </Route>

          <Route path="/question/:id"><Question usertoken={usertoken}/></Route>

          <Route path="/respond/:q_id"><Respond usertoken={usertoken}/></Route>

          <Route path="/ask"><Ask/></Route>

          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>        
      </Router>
    );

  } else {

    return (
      <Router>              
        <Navbar1 />
        <br/>

        <Switch>
          <Route exact path="/">
            <Home1/>
          </Route>

          <Route exact path="/login">
            <Login setUsertoken={setUsertoken}/>
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>      
      </Router>
    );

  }  
}

export default App;
