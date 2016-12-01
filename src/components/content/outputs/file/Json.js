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
import { Checkbox } from '../../../elements';

const INDENT = 'push-xs-1 col-xs-11';
const t = (text) => window.i18n.t(text, {ns: 'output-file'});

export default class Json extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    this._onChangePath = this._onChangePath.bind(this);
  }

  render() {
    const input = this.props.plugins.output.json.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          {t('JSON output')}
        </legend>
        <div className="form-group">
          <Checkbox
              name="output-json-enable"
              checked={!!this.props.plugins.output.json.enabled}
              text={t('Enable JSON Log')}
              onChange={this._onChangeEnable}
            />
          {input}
        </div>
      </fieldset>
    );
  }

  _renderInput() {
    return (
      <div className="row">
        <div className={INDENT}>
          <label htmlFor="output-json-filepath">
            {t('Log filename')}:
          </label>
          <input
              type="text"
              className="form-control"
              id="output-json-filepath"
              value={this.props.plugins.output.json.path}
              required={true}
              onChange={this._onChangePath}
              onFocus={e => {e.target.select()}}
            />
        </div>
      </div>
    );
  }

  _onChangeEnable() {
    this.dispatch('output:changeJsonEnable', !this.props.plugins.output.json.enabled);
  }

  _onChangePath(e) {
    this.dispatch('output:changeJsonPath', String(e.target.value).trim())
  }
}
