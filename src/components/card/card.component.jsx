import React from "react";
import { Link } from "react-router-dom";

import './card.styles.scss';

/**
 * This should be a React component that, at the very least, comprises an image component a title and a description or subheading.
 * 
 * @param props 
 * @returns 
 * 
 */
const Card = (props) => {
  const {image, id, name, rating, genres} = props;
  return (
    <div className="card">
      <div className="card-image" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${image})`}}>
        <div className="hover-content">
          <span className="rating-span">{rating}/10</span>
          <Link className="btn" to={`movie/${id}`}>View Details</Link>
        </div>
      </div>
      <div className="card-text">
        <h1>{name}</h1>
        <div>
        {
          genres.map((item, ind)=><span key={ind} className="genre-span">{item}</span>)
        }
        </div>
        
      </div>
    </div>
  )
}

export default Card