import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import JobsList from "./components/JobsList";
import NewJob from "./components/NewJob";
import Login from "./components/Login";
import Authentication from './components/Authentication';

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filters: []
        };

        this.Auth = new Authentication();
        this.LogoutHandler = this.LogoutHandler.bind(this);
        this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    axios.post("http://localhost:8080/")
        .then( res => {
          this.setState({
            data: res.data
          });
        })
        .catch(function(error){
          console.log(error)
        })
  };




  LogoutHandler(){
      window.location.reload();
      this.Auth.Logout();
  }

    LoginButtonRenderer(){
        if(!this.Auth.Loggedin()){
            return(
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            )
        }
    }

  LogoutButtonRenderer(){
      if(this.Auth.Loggedin()){
          return(
              <li className="navbar-item">
                  <div onClick={ () => this.LogoutHandler()} className="nav-link bg-warning text-dark">Log Out</div>
              </li>
          )
      }
  }


    reRender(){
        this.setState(this.state)
    }

  JobButtonRenderer(){
      if(this.Auth.Loggedin()){
          return(
              <li className="navbar-item ">
                  <Link to="/add-job" className="nav-link">Add job</Link>
              </li>
          )
      }
  }




  render() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="mr-3 border-right border-warning">{this.LogoutButtonRenderer()}</li>
                    {this.LoginButtonRenderer()}
                    <Link to="/" className="nav-link">Home</Link>
                    {this.JobButtonRenderer()}
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
                <Route exact path={'/add-job'}
                       render={(props) =>
                           <NewJob {...props}/>}
                />
                <Route exact path={'/Login'}
                       render={(props) =>
                           <Login {...props} rerenderParent={this.reRender}/>}
                />
                <Route exact path={'/'}
                     render={(props) =>
                         <JobsList {...props}/>}
                />
            </Switch>

        </Router>
    );
  }
}

export default App;
