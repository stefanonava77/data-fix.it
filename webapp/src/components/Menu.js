import React from "react";
import '../css/menu.css';
import Logo from '../images/logo.png';
import Logo2 from '../images/logo2.png';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true, scroll: false};

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleScroll = this.toggleScroll.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.removeScroll = this.removeScroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    if (!this.isDesktop()) {
      this.state = {open: false, scroll: false};
    }
  }

  toggleMenu() {
    this.setState(state => ({
      open: !state.open
    }));
  }

  openMenu() {
    this.setState(state => ({
      open: true
    }));
  }

  removeScroll() {
    this.setState(state => ({
      scroll: false
    }));
  }

  toggleScroll() {
    this.setState(state => ({
      scroll: true
    }));
    if (this.state.scroll) {
      this.setState(state => ({
        open: false
      }));
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  isDesktop() {
    return window.matchMedia("(min-width: 1025px)").matches;
  }

  handleScroll() {
    let lastScrollTop = 0;
    let delta = 0;
    let scrollTop = window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;


    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > "75" && scrollTop > lastScrollTop && !this.state.menu) {
      this.toggleScroll();
    }

    if (scrollTop <= "75" && this.isDesktop()) {
      this.openMenu();
      this.removeScroll();
    }

    lastScrollTop = scrollTop;

  }

  goToSection(e) {
    let data= e.currentTarget.getAttribute('data-attribute');
    console.log(data);
    document.querySelector('.section[data-attribute="' + data + '"]').scrollIntoView({behavior: 'smooth'});
  }

  render() {
    return <div className="m-header">
      <header
        className={this.state.open ? 'm-header-menu m-header-menu__open m-header-menu__open-trigger' : 'm-header-menu'}>
        <div className="m-header-menu__wrapper">
          <div className="m-header-menu__container">
            <div className="m-header-menu__logo">
              <a href="/">
                <img className="logoBlue" src={Logo} alt="data-fix"/>
                <img className="logoRed" src={Logo2} alt="data-fix"/>
                <span>Data-Fix</span>
              </a>
            </div>
            <div className={this.state.open ? 'm-header-menu__nav m-header-menu__nav--visible' : 'm-header-menu__nav'}>
              <div className='m-header-menu__nav-menu'>
                <span onClick={this.goToSection} className="m-header-menu__item" data-attribute="news">NEWS</span>
                <span onClick={this.goToSection} className="m-header-menu__item"
                      data-attribute="documents">DOCUMENTI</span>
                <span onClick={this.goToSection} className="m-header-menu__item"
                      data-attribute="contact">CONTATTI</span>
              </div>
            </div>
            <div className="m-header-menu__actions">
              <div
                className={this.state.scroll ? 'm-header-menu__actions--wrapper m-header-menu__actions--wrapper--visible' : 'm-header-menu__actions--wrapper'}>
                <div className="m-header-menu__trigger-wrapper" onClick={this.toggleMenu}>
                  <div className="m-header-menu__trigger">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>;
  }
}

export default Menu;
