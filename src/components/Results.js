import React from 'react';
import NotFound from './NotFound';
import Gif from './Gif';

const Results = (props) => {
        
    let name;
    if (props.name) {
        name  =  props.name;
    } else  {
        name = props.match.params.name;
    }
    
    const results = props.photos;
    let gifs;
    
    
    if(results.length > 0) {
        gifs = results.map(gif => <Gif gif={gif} key={gif.id} />)
        return(
                
            <div className="photo-container">
                <h2>{name}</h2>
                <ul>
                    {gifs}
                </ul>
            </div>            
        );     
    } else {
        gifs = <NotFound />
        return(
            <ul>
                {gifs}
            </ul>
        )
    } 
}

export default Results;