import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import Search from './components/Search'
import DisplayResult from './components/DisplayResult'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        searchInput:'',
        sortBy:'',
        limit:'',
        results:[]
    }
  }



  componentDidMount(){
      if(this.state.searchInput!==''){
        axios.get(`https://www.reddit.com/search.json?q=${this.state.searchInput}&sort=${this.state.sortBy}&limit=${this.state.limit}`)
        .then(res=> this.setState({results:res.data.data.children.map(item=>item.data)}))
        .catch(err=>console.log(err))
      }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.searchInput!=='' && (this.state.searchInput!==prevState.searchInput || this.state.sortBy!==prevState.sortBy || this.state.limits!==prevState.limits)){
        axios.get(`https://www.reddit.com/search.json?q=${this.state.searchInput}&sort=${this.state.sortBy}&limit=${this.state.limit}`)
        .then(res=> this.setState({results:res.data.data.children.map(item=>item.data)}))
        .catch(err=>console.log(err))
    }
  }


  getQuery = (searchInput,sortBy,limit) => {
      this.setState({
          searchInput,
          sortBy,
          limit
      })
  }

  render() {
    return (
      <>
        <Navbar/>
        <Search getQuery={this.getQuery}/>
        <DisplayResult results={this.state.results}/>
      </>
    )
  }
}

export default App

