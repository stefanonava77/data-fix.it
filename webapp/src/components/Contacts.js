import React from "react";
import '../css/contacts.css';
import ReactMarkdown from "react-markdown";

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      contactMail: '',
      openTime: ''
    };
  }

  componentDidMount() {
    let items = [];
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
            contactMail: result[0].EmailContatto,
            openTime: result[0].Orari
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
    const {error, isLoaded, contactMail, openTime} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="contacts section" data-attribute="contact">
          <span className="section__title">Contatti</span>

          <div className="contacts__container">
            <div className="contacts__item">
            <span className="contact__title">I nostri orari</span>
            <ReactMarkdown source={openTime}/>
            </div>
            <div className="contacts__item">
              <span className="contact__title">I nostri contatti</span>
              <a href={"mailto:" + contactMail} className="contact__mail">{contactMail}</a>
            </div>
          </div>

          <iframe title="contacts"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.080480654885!2d9.271807315570365!3d45.849688579107294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47841e3789ac735d%3A0xa6466ece5b7a776b!2sDATA-FIX%20SNC%20di%20Nava%20e%20Torricelli!5e0!3m2!1sit!2sit!4v1585840535575!5m2!1sit!2sit"
                  width="100%" height="500" frameBorder="0" allowFullScreen="" aria-hidden="false"
                  tabIndex="0"/>
        </div>
      );
    }
  }
}

export default Contacts;



