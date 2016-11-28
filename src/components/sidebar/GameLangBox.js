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

const t = text => window.i18n.t(text, {ns: 'sidebar'});

class Button extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const selected = this.props.target === this.props.game.lang;
    const classes = 'btn btn-block ' + (selected ? 'btn-info active' : 'btn-secondary');
    return (
      <button type="button" className={classes} onClick={this._onClick}>
        {t(this.props.text)}
      </button>
    );
  }

  _onClick() {
    this.dispatch('game:changelang', this.props.target);
  }
}

export default class GameLangBox extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          {t('Game Language')}
        </div>
        <div className="card-block">
          <div className="btn-group-vertical btn-block">
            <Button text="Japanese" target="ja" {...this.props} />
            <Button text="English (NA)" target="en_NA" {...this.props} />
            <Button text="English (EU)" target="en_EU" {...this.props} />
          </div>
          <p className="mb-0">
            {t('Needs restart IkaLog after Apply')}
          </p>
        </div>
      </div>
    );
  }
}
