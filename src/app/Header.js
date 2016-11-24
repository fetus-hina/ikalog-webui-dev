import React, { Component } from 'react'

class Logo extends Component {
  render() {
    const url = 'https://dl.dropboxusercontent.com/u/14421778/IkaLog/ikalog_logo1.png';
    return (
      <img src={url} width="30" height="30" className="d-inline-block align-top mr-1" alt="" />
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="nav-lang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Language
          </a>
          <div className="dropdown-menu" aria-labelledby="nav-lang">
            <a className="dropdown-item" href="#">日本語</a>
            <a className="dropdown-item" href="#">English (North America)</a>
            <a className="dropdown-item" href="#">English (Europe)</a>
          </div>
        </li>
      </ul>
    );
  }
}

export default class Header extends Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-inverse bd-navbar">
        <div className="container">
          <nav>
            <h1 className="navbar-brand mb-0">
              <Logo />
              IkaLog
            </h1>
            <Nav />
          </nav>
        </div>
      </header>
    );
  }
}
