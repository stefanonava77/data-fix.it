import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from "./components/Menu";
import FileList from "./components/FileList";
import HeroBanner from "./components/HeroBanner";
import Contacts from "./components/Contacts";
import News from "./components/News";

function App() {
  return (
    <div className="App">
      <Menu/>
      <div className="container">
        <HeroBanner/>
      </div>
      <div className="container container--white">
        <News/>
      </div>
      <div className="container container--nomargin">
        <FileList/>
      </div>
      <div className="container container--white">
        <Contacts/>
      </div>
    </div>
  );
}

export default App;
