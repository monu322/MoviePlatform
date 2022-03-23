import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Results = () => {

    const [results, setResults] = useState([])

    let url = window.location.pathname;
    let query = url.split('/')[2];
    let genre = url.split('/')[3];
    let rating = url.split('/')[4];
    let year = url.split('/')[5];
    let sort = url.split('/')[6];

    console.log(query, genre, rating, year, sort);

    useEffect(()=>{

        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=5c0858a40c4c16756db0514de41a5116&page=1&sort_by=popularity.desc&include_adult=false&include_video=false&with_keywords=spider')
        .then(function (response) {
            // handle success
            console.log('jaws result', response.data);
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    },[]);



  return (
    <>
        results
    </>
  );
};

export default Results;