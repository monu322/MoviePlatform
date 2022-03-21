import React from "react";

import './cards-container.styles.scss';

/**
 * This should be a React component that, at the very least, comprises an image component a title and a description or subheading.
 * 
 * @param props 
 * @returns 
 * 
 */
const CardsContainer = (props) => {



    if(props.data)
    {
        console.log('props:', props.data[0]);
    }
    
  
  return (
    <div className="cards-container">
      {
          props.data?(
            <p>{props.data[0].title}</p>
          ):(null)
      }
    </div>
  )
}

export default CardsContainer