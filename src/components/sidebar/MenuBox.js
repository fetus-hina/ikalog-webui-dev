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
    const selected = this.props.target === this.props.chrome.content;
    const classes = 'btn btn-block ' + (selected ? 'btn-primary' : 'btn-secondary');
    return (
      <button type="button" className={classes} onClick={this._onClick}>
        {window.i18n.t(this.props.text, {ns: 'sidebar'})}
      </button>
    );
  }

  _onClick() {
    this.dispatch('chrome:changeContent', this.props.target);
  }
}

export default class MenuBox extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          {window.i18n.t('Menu', {ns:'sidebar'})}
        </div>
        <div className="card-block">
          <Button text="Preview" target="preview" {...this.props} />
          <Button text="Video Input" target="input" {...this.props} />
          <Button text="Plugins" target="output" {...this.props} />
        </div>
      </div>
    );
  }
}
