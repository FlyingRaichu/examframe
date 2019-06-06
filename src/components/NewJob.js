import React, { Component } from 'react';
import Authentication from "./Authentication";
const axios = require('axios');

export default class NewJob extends Component {

    constructor(match, props) {
        super(props);
        this.state = {
            title: String,
            description: String,
            category: String,
            area: String
        }

        this.Authen = new Authentication();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        if(!this.Authen.Loggedin())
            this.props.history.replace('/Login');
    }

    onSubmit(e){
        e.preventDefault();
        axios.post('https://examframe.herokuapp.com/add-job', {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            area: this.state.area
        });

        window.location.reload()
    }

    onChange(e) {
        console.log(e.target.name + " " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
            <div>
                <h3>New position offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><h6 className={"m-0"}>Title </h6></label>
                        <input type="text"
                               name="title"
                               className="form-control bg-dark text-warning  mb-2"
                               placeholder="Title"
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Description </h6></label>
                        <input type="text"
                               name="description"
                               className="form-control bg-dark text-warning  mb-2"
                               placeholder="Description"
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Area </h6></label>
                        <input type="text"
                               name="area"
                               className="form-control bg-dark text-warning  mb-2"
                               placeholder="Area"
                               onChange={this.onChange}
                               required
                        />

                        <label><h6 className={"m-0"}>Category </h6></label>
                        <input type="text"
                               name="category"
                               className="form-control bg-dark text-warning  mb-2"
                               placeholder="Category"
                               onChange={this.onChange}
                               required
                        />
                        <input type='submit' className="btn btn-warning mt-2" value='Confirm'/>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}