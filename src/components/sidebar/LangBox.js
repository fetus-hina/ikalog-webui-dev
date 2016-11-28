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

class Button extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const selected = this.props.target === this.props.chrome.lang;
    const classes = 'btn btn-block ' + (selected ? 'btn-primary' : 'btn-secondary');
    return (
      <button type="button" className={classes} onClick={this._onClick}>
        {this.props.text}
      </button>
    );
  }

  _onClick() {
    this.dispatch('chrome:changelang', this.props.target);
  }
}

export default class LangBox extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          UI Language
        </div>
        <div className="card-block">
          <Button text="日本語" target="ja" {...this.props} />
          <Button text="English" target="en" {...this.props} />
        </div>
      </div>
    );
  }
}
