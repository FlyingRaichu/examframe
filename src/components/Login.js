import React, { Component } from 'react';
import Authentication from './Authentication';


export default class Login extends Component {

    constructor(match, props) {
        super();
        this.state = {
            username: String,
            password: String,
            error: null
        }
        this.Auth = new Authentication();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.Auth.Login(this.state.username, this.state.password).then(res =>{
            console.log(res.msg);
            if(res.msg) {
                this.state.error = res.msg;
            }
            if(this.Auth.Loggedin()){
                this.props.rerenderParent();
                this.props.history.replace('/');
            }
        })
            .catch(err =>{
                alert(err);
            })


    }



    onChange(e) {
        console.log(e.target.name + " " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillMount(){
        if(this.Auth.Loggedin())
            this.props.history.replace('/');
    }

    displayError(){
        if(this.state.error != null) {
            return(
                <div className="alert alert-danger">{ this.state.error }</div>
            )
        }
    }

    render() {
        return (
            <div className="container">
            <div>
                <h3>Login</h3>
                { this.displayError()}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><h6 className={"m-0"}>Username </h6></label>
                        <input type="text"
                               name="username"
                               className="form-control bg-dark text-warning mb-2"
                               placeholder="Username"
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Password </h6></label>
                        <input type="password"
                               name="password"
                               className="form-control bg-dark text-warning  mb-2"
                               placeholder="Password"
                               onChange={this.onChange}
                               required
                        />
                        <input type='submit' className="btn  btn-warning mt-2" value='Confirm'/>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}