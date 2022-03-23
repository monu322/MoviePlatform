import React, {useState, useEffect} from 'react';
import Card from '../../components/card/card.component';
import dummyData from "../../dummyData.json"; // To be replaced with your api response data

import axios from 'axios';

export const TopMovies = () => {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);

  useEffect(()=>{
    console.log('use effect fired');

    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=5c0858a40c4c16756db0514de41a5116&page=1')
    .then(function (response) {
      // handle success
      console.log(response.data.results[0]);

      setNowPlaying(response.data.results);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5c0858a40c4c16756db0514de41a5116&page=1')
    .then(function (response) {
      // handle success
      console.log('generes', response.data.genres);
      setGenres(response.data.genres);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  },[]);

  return (
    <>
      <h1>Now playing</h1>

      <div className='cards-container' style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", rowGap: "20px", columnGap: "15px"}}>
        {
            nowPlaying.length>0?(
                nowPlaying.map((item)=>{
                    
                    const genresArray = [];
                    
                    if(genres.length>0)
                    {
                        item.genre_ids.map((id)=>{
                            genresArray.push(genres.find(x => x.id === id).name);
                        });
                    }
                    


                    return(<Card id={item.id} rating={item.vote_average} key={item.id} image={item.poster_path} name={item.title} genres={genresArray} home_port={dummyData.home_port} roles={dummyData.roles} />)
                })
            ):(null)
        }
        
        
      </div>


    </>
  );
};

export default TopMovies;