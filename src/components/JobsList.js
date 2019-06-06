import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Job from "./Job";
import FiltersList from "./FiltersList";
const axios = require('axios');

export default class JobList extends Component {


    constructor(match, props) {
        super();

        this.state = {
            jobs: [],
            filters: []
        };

        this.getFilters = this.getFilters.bind(this);
    }

    componentDidMount() {
        axios.post("https://examframe.herokuapp.com/",{
            filters: this.state.filters
        })
            .then( res => {
                this.setState({
                    jobs: res.data
                }, function(){
                    console.log(res);
                });
            })
            .catch(function(error){
                console.log(error)
            })
    };

    getFilters(filters){
        this.setState({filters: filters}, function(){
            axios.post("https://examframe.herokuapp.com/get-filtered-jobs", { filters: this.state.filters})
                .then(res => {
                    this.setState({jobs: res.data })
                })
        });

    }

    render() {
        return (
            <div>
                <FiltersList getFilters={this.getFilters} jobs={this.state.jobs}/>
                <h3 className="mt-5 ml-3">Available positions</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    {this.state.jobs.map((jobs) => (
                        <Job key={jobs._id} title={jobs.title} description={jobs.description} category={jobs.category} area={jobs.area}/>
                    ))}
                </div>
            </div>
        );
    }
}