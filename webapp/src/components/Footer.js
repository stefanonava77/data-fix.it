import React from "react";
import '../css/footer.css';

class Footer extends React.Component {

  render() {
    return <div className="footer">
      <footer className="section section--small">
        <span className="footer__text">DATA-FIX SNC DI NAVA E TORRICELLI<br/>
        Via Giuseppe Mazzini 25 - 22035 Canzo (CO)</span>
        <span className="footer__text footer__text--small">© snava 2020</span>
      </footer>
    </div>
  }
}

export default Footer;
