import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import FileList from "./components/FileList";
import HeroBanner from "./components/HeroBanner";
import Contacts from "./components/Contacts";
import News from "./components/News";
import Footer from "./components/Footer";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    let url = document.location.host;
    if (url.indexOf(':') >= 0) {
      url = document.location.host.split(':')[0];
    }

    fetch("http://" + url + ":1337/main-data")
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(
            function () {
              this.setState({isLoaded: true});
            }
              .bind(this),
            500
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const {error, isLoaded} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="App loading">
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
          <div className="container container--nomargin">
            <Footer/>
          </div>
          <div className="loader">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>);
    } else {
      return (
        <div className="App loaded">
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
          <div className="container container--nomargin">
            <Footer/>
          </div>
          <div className="loader">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
