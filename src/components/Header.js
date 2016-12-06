/*
 *  IkaLog
 *  ======
 *
 *  Copyright (C) 2015 Takeshi HASEGAWA
 *  Copyright (C) 2016 AIZAWA Hina
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import { Component } from 'flumpt';
import { RadioButton } from './elements';
import logoImg30 from '../data/logo-30.png';
import logoImg60 from '../data/logo-60.png';
import logoImg90 from '../data/logo-90.png';

class Logo extends Component {
  constructor(props) {
    super(props);
    this._url = this._decideLogo();
  }

  render() {
    return (
      <img src={this._url} width="30" height="30" className="d-inline-block align-top mr-1" alt="" />
    );
  }

  _decideLogo() {
    const ratio = window ? (window.devicePixelRatio || 1) : 1;
    if (ratio >= 2.25) {
      return logoImg90;
    } else if (ratio >= 1.25) {
      return logoImg60;
    } else {
      return logoImg30;
    }
  }
}

class NavLang extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const checked = this.props.lang === this.props.chrome.lang;
    return (
      <a className="dropdown-item" href="#" data-lang={this.props.lang} onClick={this._onClick}>
        <RadioButton
            name="header-ui-lang"
            checked={checked}
            onChange={() => {}}
            text={this.props.name}
          />
      </a>
    );
  }

  _onClick() {
    this.dispatch('chrome:changelang', this.props.lang);
  }
}

class Nav extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="nav-lang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            UI Language
          </a>
          <div className="dropdown-menu" aria-labelledby="nav-lang">
            <NavLang lang="ja" name="日本語" {...this.props} />
            <NavLang lang="en" name="English" {...this.props} />
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
              <Logo {...this.props} />
              IkaLog
            </h1>
            <Nav {...this.props} />
          </nav>
        </div>
      </header>
    );
  }
}
