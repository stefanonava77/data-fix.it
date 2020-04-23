import React from "react";
import VisibilitySensor from "react-visibility-sensor";

class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sensor: true,
    };
  }

  componentDidMount() {
    let items = [];
    let url = document.location.host;
    if(url.indexOf(':') >= 0){
      url = document.location.host.split(':')[0];
    }
    fetch("http://" + url + ":1337/file-objects")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach(element => items.push({
            title: element.Titolo,
            file: "http://" + url + ":1337" + element.File[0].url
          }));
              this.setState({
                isLoaded: true,
                items: items
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
    const {error, isLoaded, items, sensor} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (items.length > 0 ){
      return (
        <div className="file-list section" data-attribute="documents">
          <span className="section__title">Documenti</span>
          <ul className="file-list__container">
            {items.map(item =>
              <VisibilitySensor scrollThrottle={100} key={item.title} active={sensor} partialVisibility={true}>
                {({isVisible}) => {
                  return (
                    <li className={isVisible ? "file-list__item file-list__item--visible" : "file-list__item"} key={item.title}>
                      <a target="_blank"
                         href={item.file}>
                <span className="file-icon">
                  <svg id="pdf" viewBox="0 0 32 40"><g fill="none" fillRule="evenodd" opacity=".495"><path
                    d="M28.703 30.195L22.4 36.634v-4.975c0-.83.63-1.464 1.455-1.464h4.848zM1.939 34.098V5.902c0-2.146 1.746-3.95 3.83-3.95h20.46c2.135 0 3.832 1.755 3.832 3.95v22.342h-6.255c-1.842 0-3.394 1.56-3.394 3.415v6.39H5.77c-2.085 0-3.83-1.756-3.83-3.951zM32 5.902C32 2.634 29.43 0 26.23 0H5.77C2.57 0 0 2.634 0 5.902v28.244C0 37.366 2.57 40 5.77 40H21.576c.048 0 .048 0 .097-.049.048 0 .048 0 .097-.049.048 0 .048-.048.096-.048 0 0 .05 0 .05-.05l.145-.146 9.6-9.804s0-.05.048-.05l.097-.097c0-.049.049-.049.049-.097 0-.05.048-.05.048-.098 0-.049 0-.049.049-.098V5.902H32zm-14.11 16.83c-.338.146-.726.244-1.26.439l-.678.244a42.74 42.74 0 0 0-3.007 1.073c.146-.293.243-.586.388-.878l.049-.098c.29-.78.29-.78.485-1.268.097-.342.34-1.024.872-2.586.243-.634.388-1.22.534-1.707.727 1.269 1.309 2.244 2.182 3.464.339.438.581.829.872 1.17l-.436.147zM14.498 9.463c.048-.146.097-.293.145-.341.049.048.049.146.097.292.194 1.074.194 1.415-.097 2.83-.048-.147-.097-.293-.097-.39-.242-1.074-.29-1.61-.048-2.39zm-6.012 19.61c-.194.341-.34.683-.485.927-.485.927-.582 1.121-.873 1.415-.194.146-.436.048-.582-.05-.048-.048-.193-.145.146-1.024.194-.487 1.115-1.073 1.94-1.61a2.353 2.353 0 0 1-.146.342zm14.157-5.366c.485 0 .97 0 1.648.147.485.097.631.292.631.341v.341s-.048.05-.29.098c-.34.098-.825.098-.97.049-.243-.098-.63-.244-1.455-.927.194-.049.291-.049.436-.049zm.534 2.83c.582.146 1.406.097 1.94-.05 1.696-.438 1.745-1.707 1.793-2.243.048-.732-.388-2-2.279-2.342-.872-.146-1.454-.146-1.988-.146-.533 0-.97.049-1.648.146a2.885 2.885 0 0 1-.582.098c-.485-.488-.824-.976-1.357-1.707-1.019-1.464-1.649-2.488-2.667-4.293-.146-.244-.291-.537-.436-.78.096-.44.193-.928.29-1.513l.146-.683c.387-1.853.485-2.487.194-4-.34-1.658-1.503-2.049-2.037-2-.29 0-1.454.195-1.939 1.902-.34 1.172-.29 2.05 0 3.27.194.877.63 1.95 1.358 3.267-.243 1.024-.534 1.952-1.067 3.513-.533 1.61-.776 2.244-.873 2.633-.145.44-.145.44-.436 1.171l-.049.098c-.339.926-.92 2.049-1.309 2.78-.582.293-1.163.585-1.988 1.073-1.745 1.025-2.957 1.757-3.394 2.927-.242.634-.824 2.195.437 3.22.436.39 1.018.585 1.551.585.582 0 1.116-.195 1.552-.585.582-.537.824-1.025 1.309-1.951.145-.244.29-.537.485-.927.776-1.512 1.26-2.537 1.357-2.683 0-.049.049-.098.097-.146.34-.147.728-.293 1.164-.488 1.6-.683 2.279-.878 3.733-1.366l.68-.244c.532-.195.92-.293 1.308-.439.485-.195.873-.293 1.26-.439.34.293.68.634 1.115.976.97.78 1.601 1.17 2.28 1.366z"
                    fill="#000" mask="url(#b)"/></g>
                  </svg>
                </span>
                        <span className="file-title">{item.title}</span>
                      </a>
                    </li>
                  );
                }}
              </VisibilitySensor>
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="section section--empty"/>
      );
    }
  }
}

export default FileList;



