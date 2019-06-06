import React, { Component } from 'react';
const axios = require('axios');

export default class Filter extends Component {


    constructor(match, props) {
        super();

        this.state = {
            selectedCategories: []
        };

        this.handleClick = this.handleClick.bind(this);

        window.onbeforeunload = function() {
            localStorage.removeItem('filters');
        };
    }


    handleClick(e) {
        if(e.target.classList.contains("selected")){


            this.props.removeFilter(e.target.value);

            e.target.classList.remove("selected");
            e.target.classList.add("btn-outline-dark");
            e.target.classList.remove("btn-dark");
        } else {
            let newFilters = this.state.selectedCategories
            newFilters.push(e.target.innerHTML);
            this.setState({selectedCategories: newFilters}, function(){
                    this.props.getFilters(this.state.selectedCategories);
            });

            e.target.classList.add("selected");
            e.target.classList.remove("btn-outline-dark");
            e.target.classList.add("btn-dark");
        }
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)} className="mr-2 mt-1 btn bg-warning">{ this.props.value }</button>
        );
    }
}