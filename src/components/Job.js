import React, { Component } from 'react';

export default class Job extends Component {


    constructor(match, props) {
        super();

        this.state = {
            title: String,
            description: String,
            category: String,
            area: String
        }
    }

    render() {
        return (
            <div className="bg-dark text-light media-body p-3 mb-4">
                <h5 className="font-weight-bold text-warning">Title</h5> <p>{this.props.title}</p>
                <h5 className="font-weight-bold text-warning">Description</h5> <p>{this.props.description}</p>
                <h5 className="font-weight-bold text-warning">Area </h5> <p>{this.props.area}</p>
                <h5 className="font-weight-bold text-warning">Category</h5> <p>{this.props.category}</p>
            </div>
        );
    }
}