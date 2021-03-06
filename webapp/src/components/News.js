import React from "react";
import ReactMarkdown from "react-markdown";
import VisibilitySensor from "react-visibility-sensor";
import '../css/news.css';


class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sensor: true,
    };

    this.stopSensor = this.stopSensor.bind(this);
  }

  componentDidMount() {
    let items = [];
    let url = document.location.host;
    if(url.indexOf(':') >= 0){
      url = document.location.host.split(':')[0];
    }
    fetch("http://" + url + ":1337/notizies")
      .then(res => res.json())
      .then(
        (result) => {
          result.reverse().forEach(element =>
            items.push({
              title: element.Titolo,
              text: element.Testo,
              file: element.File ? "http://" + url + ":1337" + element.File.File[0].url : '',
              fileName: element.File ? element.File.Titolo : ''
            }));

          this.setState({
            isLoaded: true,
            items: items
          });

        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  stopSensor(e) {
    this.setState({
      sensor: false,
    });
  }



  render() {
    const {error, items, sensor} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if(items.length > 0) {
      return (
        <div className="news section" data-attribute="news">
          <span className="section__title">Notizie</span>
          <div className="news__container">
            {items.map(item =>
              <VisibilitySensor onChange={this.stopSensor} scrollThrottle={100} key={item.title} active={sensor} partialVisibility={true}>
                {({isVisible}) => {
                  return (
                    <div className={isVisible || !sensor ? "news__item news__item--visible" : "news__item"} key={item.title}>
                      <span className="news__item-title">{item.title}</span>
                      <div className="news__item-text">
                        <ReactMarkdown source={item.text}/>
                        {item.file.length > 0 && (
                          <a className="news__item-file" target="_blank"
                             href={item.file} rel="noopener noreferrer">
                             <span>
                                <svg viewBox="0 0 21 20" id="document"><g transform="translate(1)" strokeWidth="2" stroke="#505050" fill="none" fillRule="evenodd"><g transform="rotate(45 3.478 11.569)" strokeLinecap="square"><path d="M.5.5L8.936 9M4.576 9.5H9M9.5 4.576V9"/></g><path d="M0 12.183v6h18.386v-6"/></g></svg>
                            </span>
                            {item.fileName}
                          </a>
                        )}
                      </div>
                    </div>
                  );

                }}
              </VisibilitySensor>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="section section--empty"/>
      );
    }
  }
}


export default News;



