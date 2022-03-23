import React, { Component} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Movie from "./components/movie/movie.component";
import Results from "./components/results/results.components";

import "./global.scss"

/**
 * The starting page for your App
 */

class App extends Component{
  render(){
    return(
      <>      
          <Header />
          <main>
            <section>
                <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"movie/:id"} element={<Movie />}/>
                  <Route exact path={"search/:query/:genre/:rating/:year/:sort/:page"} element={<Results />}/>                  
                </Routes>
            </section>
          </main>
        
      </>

    );
  }
}

export default App;