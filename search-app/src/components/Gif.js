import React from 'react';

const Gif = props => {
    const url = `https://live.staticflickr.com/${props.gif.server}/${props.gif.id}_${props.gif.secret}.jpg`
    
    return(
        <li>
            <img src={url} alt="" />
        </li>
    )
    
}

export default Gif;