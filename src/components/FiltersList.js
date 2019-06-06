import React, { Component } from 'react';
import Job from "./Job";
import Filter from "./Filter";
const axios = require('axios');

export default class FiltersList extends Component {

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            selectedFilters: [],
            jobs: []
        };

        this.getCategories = this.getCategories.bind(this);
        this.getSelectedFilters = this.getSelectedFilters.bind(this);
        this.removeFilter = this.removeFilter.bind(this);

    }

    componentDidMount() {
        axios.post("http://localhost:8080/get-filters")
            .then( res => {
                this.setState({
                    jobs: res.data
                });
            })
            .catch(function(error){
                console.log(error)
            })
    }

    getCategories() {
        let categories = this.state.jobs.map(a => a.category);
        return [...new Set(categories)];
    }

    getAreas() {
        let areas = this.state.jobs.map(a => a.area);
        return [...new Set(areas)];
    }

    getSelectedFilters(selectedFilters){
        let newFilters = this.state.selectedFilters;
        newFilters.push(selectedFilters);
        console.log(selectedFilters);
        this.setState({selectedFilters: newFilters});

        console.log(this.state.selectedFilters);

        this.props.getFilters(this.state.selectedFilters);
    }

    removeFilter(filter){
        console.log(filter);
        let index = this.state.selectedFilters.indexOf(filter);
        this.state.selectedFilters.splice(index, 1);

        this.props.getFilters(this.state.selectedFilters);
    }

    render() {
        return (
            <div className="ml-2">
                <h3>Filters</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    <h5 className="ml-2">Category</h5>
                    { this.getCategories().map((category) => (
                        <Filter removeFilter={this.removeFilter} getFilters={this.getSelectedFilters } key={this.getCategories().indexOf(category)} value={category}/>
                    ))}
                </div>
                <div className="ml-2" style={{marginTop: 20}}>
                    <h5>Location</h5>
                    { this.getAreas().map((area) => (
                        <Filter removeFilter={this.removeFilter} getFilters={this.getSelectedFilters } key={this.getAreas().indexOf(area)} value={area}/>
                    ))}
                </div>
            </div>
        );
    }
}