import React, {useState, useEffect} from 'react';


import TopMovies from '../../components/top-movies/top-movies.container';
import Search from '../../components/search/search.component';

export const Home = () => {

  return (
    <>
      <Search/>
      <TopMovies/>
    </>
  );
};

export default Home;