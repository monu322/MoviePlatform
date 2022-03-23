import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import './search.styles.scss';

export const Search = () => {

    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [results, setResults] = useState([]);

    const handleSearch = (e)=>{
        e.preventDefault();

        let query = encodeURIComponent(e.target.query.value);
        console.log('query', query);

        if(query==='')
        {
            query = 0
        }

        console.log(e.target.year.value)
        console.log(e.target.rating.value)
        console.log(e.target.sort.value)
        console.log(e.target.genre.value)

        navigate(`search/${query}/${e.target.genre.value}/${e.target.rating.value}/${e.target.year.value}/${e.target.sort.value}`, { replace: true });

    }

    useEffect(()=>{

        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5c0858a40c4c16756db0514de41a5116&page=1')
        .then(function (response) {
            // handle success
            console.log('generes in search', response.data.genres);
            setGenres(response.data.genres);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });


        

    },[]);


  return (
    <form onSubmit={(e)=>handleSearch(e)} className="search-form">
        <div className='search-container' style={{display: "grid", gridTemplateColumns: "1fr", rowGap: "10px", columnGap: "15px"}}>
            <input className="search-field" type="text" name="query"/>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", rowGap: "10px", columnGap: "15px"}}>
            <div className="form-group">
                <label>Genre </label>
                <select name="genre">
                    <option value="horror">All</option>
                    {
                        genres.map((item, index)=><option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Rating </label>
                <select defaultValue={"all"} name="rating">
                    <option value="all">All</option>
                    <option value="9">9+</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                    <option value="2">2+</option>
                    <option value="1">1+</option>
                </select>
            </div>
            <div className="form-group">
                <label>Year </label>
                <select defaultValue={"0"} name="year">
                    <option value="0">All</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2000-2009">2000-2009</option>
                    <option value="1990-1999">1990-1999</option>
                    <option value="1980-1989">1980-1989</option>
                    <option value="1970-1979">1970-1979</option>
                    <option value="1950-1969">1950-1969</option>
                    <option value="1900-1949">1900-1949</option>
                </select>
            </div>
            <div className="form-group">
                <label>Order by </label>
                <select defaultValue={"latest"} name="sort">
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="featured">Featured</option>
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                    <option value="likes">Likes</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>
            <div className="form-group">
                <button type="submit">Search</button>
            </div>
        </div>
    </form>
  );
};

export default Search;