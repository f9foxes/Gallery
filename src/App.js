import  React, { Component } from 'react';
import Results from './components/Results';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import axios from 'axios';
import apiKeys from './config';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      cats: [],
      dogs: [],
      computers: [],
      loading: true,
      api: apiKeys
    };
  }

componentDidMount() {
    this.performSearchCats()
    this.performSearchDogs()
    this.performSearchComputers()
}



performSearch = (query, searched) => {
  if(query) {
    this.setState({
      loading: true
    });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=705f69cc53ce4da17f94b0de15fecd70&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        gifs: response.data.photos.photo,
        loading: false,
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    })
  } else {return}
}
  

performSearchCats = (query = 'cats') => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=705f69cc53ce4da17f94b0de15fecd70&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      cats:  response.data.photos.photo,
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  })
}

performSearchDogs = (query = 'dogs') => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=705f69cc53ce4da17f94b0de15fecd70&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      dogs: response.data.photos.photo,
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  })
}

performSearchComputers = (query = 'computers') => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=705f69cc53ce4da17f94b0de15fecd70&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      computers: response.data.photos.photo,
      loading: false
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  })
}

  render () {
    return (
      <BrowserRouter> 
        <div className="container">
          <SearchForm search={this.performSearch} />
          <MainNav />
          {(this.state.loading)
          ? <p>Loading...</p>
          : <Switch>
              <Route exact path="/" 
                render={() => <Redirect to="/cats" /> } />
              <Route path="/cats" render={() => <Results  name="cats" photos={this.state.cats} search={this.performSearch} /> } />
              <Route path="/dogs" render={() => <Results   name="dogs" photos={this.state.dogs} search={this.performSearch} /> } />
              <Route path="/computers" render={() => <Results   name="computers" photos={this.state.computers} search={this.performSearch} /> } />
              <Route path="/:name" render={(props) => <Results {...props} photos={this.state.gifs } search={this.performSearch}/> }/>
              <Route component={Results} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}