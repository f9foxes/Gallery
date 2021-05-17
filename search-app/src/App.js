import  React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import Results from './components/Results';
import axios from 'axios';
import apiKeys from './config';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
      api: apiKeys
    };
  }

componentDidMount() {
  this.performSearch()
}

performSearch = (query = 'cats') => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=705f69cc53ce4da17f94b0de15fecd70&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      gifs: response.data.photos.photo,
      loading: false
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  })
}

  render () {
    return (
      <div className="container">
        <SearchForm />
        <MainNav />
        <Results photos={this.state.gifs}/>
          
      </div>
    );
  }
}

