import React, { Component } from 'react'
import AlertMessage from './AlertMessage';

class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             searchInput:'',
             sortby:'relevance',
             limit:'25',
             emptySearch:false,
        }
    }

    handleInputChange = (event) =>{
        const {name,value} = event.target;
        this.setState(()=>({
            [name]: value
        }))
    }

    handleSubmit = (event) =>{
        if(this.state.searchInput===''){
            this.setState(()=>({
                emptySearch:true
            }))
        }
        else{
            this.props.getQuery(this.state.searchInput,this.state.sortby,this.state.limit)
            this.setState(()=>({
                searchInput:''
            }),()=>this.props.getQuery(this.state.searchInput,this.state.sortby,this.state.limit))
        }
        event.preventDefault();
    }

    alertOff = () =>{
        setTimeout(()=>this.setState(()=>({
            emptySearch:false
        })),3000)
    }


    render() {
        return (
            <div className="container">

                { this.state.emptySearch && <AlertMessage classname='alert-danger' message='Please add search term' alertOff={this.alertOff}/> }

                <div className="card card-body bg-light mb-2">
                    <h4>Search Reddit</h4>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input name="searchInput" type="text" className="form-control mb-3" placeholder="Search..." value = {this.state.searchInput} onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-check form-check-inline">
                            Sort By:
                            <input className="form-check-input ml-2" id='relevance' type="radio" name="sortby" value="relevence" onChange={this.handleInputChange} defaultChecked/>
                            <label htmlFor='relevance' className="form-check-label">
                                Relevance
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" id='new' type="radio" name="sortby" value="new" onChange={this.handleInputChange}/>
                            <label htmlFor='new' className="form-check-label">
                                Latest
                            </label>
                        </div>

                        <h5 className="mt-2">Limit: </h5>

                        <div className="form-group">
                            <select name="limit" value={this.state.limit} className="form-control" onChange={this.handleInputChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-dark btn-block mt-4">Search</button>

                    </form>

                </div>
            </div>
        )
    }
}

export default Search
