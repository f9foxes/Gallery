import React from 'react';
import NotFound from './NotFound';
import Gif from './Gif';
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import { propTypes } from 'react-bootstrap/esm/Image';

const Results = (props) => {
    const results = props.photos;
    let gifs;
    let name;
    if (props.name) {
        name  =  props.name;
    } else  {
        name = props.match.params.name;
    }
    
    if(results.length > 0) {
        gifs = results.map(gif => <Gif gif={gif} key={gif.id} />)
        return(
            <div>
                <SearchForm gifs={props.photos } search={props.search} />
                <MainNav />
                <div className="photo-container">
                    <h2>{name}</h2>
                    <ul>
                        {gifs}
                    </ul>
                </div>
            </div>
            
        );     
    } else {
        gifs = <NotFound />
        return(
            <div className="container">
                <SearchForm gifs={props.photos } search={props.search} />
                <MainNav search={props.serach}/>
                <ul>
                    {gifs}
                </ul>
            </div>
        )
    }
}

export default Results;