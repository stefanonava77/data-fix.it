import React from "react";
import HeroImage from '../images/sfondo.jpg';
import '../css/hero-banner.css';
import ReactMarkdown from "react-markdown";

class HeroBanner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bannerText: '',
    };
  }

  componentDidMount() {
    let url = document.location.host;
    if(url.indexOf(':') >= 0){
      url = document.location.host.split(':')[0];
    }
    fetch("http://" + url + ":1337/main-data")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bannerText: result[0].TestoBanner
          });
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
    const {error, isLoaded, bannerText} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return  <div className="hero-banner">
      </div>;
    } else {
      return (
        <div className="hero-banner">
          <h1 className="hero-text">  <ReactMarkdown source={bannerText}/></h1>
        </div>
      );
    }
  }
}

export default HeroBanner;



