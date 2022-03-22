import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import './movie.styles.scss';


const Movie = () => {

    const id = window.location.pathname.split('/')[2];
    const [movieData, setMovieData] = useState(null);

    useEffect(()=>{
        // Make a request for a user with a given ID
        axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=5c0858a40c4c16756db0514de41a5116&page=1`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            setMovieData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

        
    },[]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className='movie-container' style={{display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "10px", columnGap: "35px"}}>
    {
       movieData?(
        
        <>
            <div>
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}/>
            </div>
            <div>
                <h1 className="movie-title">{movieData.title}</h1>
                <p>{movieData.tagline}</p>
                {
                    movieData.genres.map((item, index)=><span key={index} className="genre-span">{item.name}</span>)
                }

                <p className="movie-desc">{movieData.overview}</p>

                <p className="release-date">Released: {monthNames[parseInt(movieData.release_date.split('-')[1])]+" "+parseInt(movieData.release_date.split('-')[0])}</p>

                <p>Rating: <span className="movie-rating">{movieData.vote_average}/10</span></p>

                <p>Budget: {movieData.budget>0?<span>${parseFloat(movieData.budget/1000000).toFixed(1)} million</span>:<span>Unknown</span>}</p>
                <p>Revenue: {movieData.revenue>0?<span>${parseFloat(movieData.revenue/1000000).toFixed(1)} million</span>:<span>Unknown</span>}</p>
                

                <p>Languages:&#160;  
                    {
                        movieData.spoken_languages.map((item, index)=>item.name)
                    }
                </p>

                

                <div>

                    

                    {movieData.homepage?<a className="movie-link" target="_blank" href={movieData.homepage}>Movie Page</a>:null}
                    <a className="movie-link" target="_blank" href={`https://www.imdb.com/title/${movieData.imdb_id}/`}>IMDB Page</a>

                    <div className="production-div">
                        Produced By
                        <div className="production-list">
                            {
                                movieData.production_companies.map((item, index)=>{
                                    return item.logo_path?<img key={index} alt={item.name} src={`https://image.tmdb.org/t/p/w92${item.logo_path}`}/>:null
                                })
                            }
                        </div>
                    </div>

                    
                </div>
            </div>
        </>    
        
       ):(null)
   }
   </div>
  )
}

export default Movie