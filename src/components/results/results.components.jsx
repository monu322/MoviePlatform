import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import './results.styles.scss';

import Card from "../card/card.component";
import Search from "../search/search.component";

import Pagination from 'react-responsive-pagination';

import { useNavigate } from 'react-router-dom';

export const Results = () => {

    const [results, setResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    let url = window.location.pathname;
    let query = url.split('/')[2];
    let genre = url.split('/')[3];
    let rating = url.split('/')[4];
    let year = url.split('/')[5];
    let sort = url.split('/')[6];
    let page = 1;
    let page_query = '';
    let genre_query = '';
    let rating_query = '';
    let year_query = '';
    let sort_query = '';

    if(url.split('/')[7])
    {
        page = url.split('/')[7];

       page_query='&page='+page; 

    }

    if(genre!=='all')
    {
        genre_query='&with_genres='+genre;
    }

    if(rating!=='all')
    {
        rating_query='&vote_average.gte='+rating;
    }

    if(year!=='0')
    {
        year_query = '&year='+year;
    }

    if(sort==='latest')
    {
        sort_query = '&sort_by=release_date.desc'
    }
    else if(sort==='oldest')
    {
        sort_query = '&sort_by=release_date.asc'
    }
    else if(sort==='rating')
    {
        sort_query = '&sort_by=vote_average.desc'
    }
    

    
    let apiUrl = '';
    let apiKey = 'api_key=5c0858a40c4c16756db0514de41a5116';


    console.log(query, genre, rating, year, sort);

    useEffect(()=>{

        if(query!=='0')
        {
            apiUrl = 'https://api.themoviedb.org/3/search/movie?'+apiKey+'&query='+query+year_query;

            if(year!=='0')
            {
                apiUrl = apiUrl+'&year='+year
            }

            console.log('api url', apiUrl);
        }
        else
        {
            apiUrl = `https://api.themoviedb.org/3/discover/movie?${apiKey}${page_query}${genre_query}${rating_query}${year_query}${sort_query}&include_adult=false&include_video=false`;
            console.log('api url broad:', apiUrl);
        }

        axios.get(apiUrl)
        .then(function (response) {
            // handle success
            console.log('search result', response.data);
            setResults(response.data.results);
            setTotalPages(response.data.total_pages);
            setCurrentPage(response.data.page);
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

    const navigate = useNavigate();

    const handlePagination = (page)=>{
        navigate(`/search/${query}/${genre}/${rating}/${year}/${sort}/${page}`);
    }



  return (
    <>
    
      <Search query={query}/>
      <h1>Showing results {query!=='0'?' for "'+query+'"':null}</h1>

      <Pagination
            total={totalPages}
            current={currentPage}
            onPageChange={page => handlePagination(page)}
        />

      <div className='cards-container' style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", rowGap: "20px", columnGap: "15px"}}>
        {
            results.length>0?(
                results.map((item)=>{
                    
                    const genresArray = [];
                    
                    if(genres.length>0)
                    {
                        item.genre_ids.map((id)=>{
                            genresArray.push(genres.find(x => x.id === id).name);
                        });
                    }
                    


                    return(<Card id={item.id} rating={item.vote_average} key={item.id} image={item.poster_path} name={item.title} genres={genresArray} />)
                })
            ):(null)
        }
        
        
      </div>


    </>
  );
};

export default Results;