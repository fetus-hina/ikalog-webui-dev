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
const t = (text) => window.i18n.t(text, {ns: 'output-speech'});

export default class MMMouth extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    this._onChangeHost = this._onChangeHost.bind(this);
    this._onChangePort = this._onChangePort.bind(this);
  }

  render() {
    const input = this.props.plugins.output.mikumikumouth.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          {t('MikuMikuMouth')}
          <small>
            <a href="http://mikumikumouth.net/" target="_blank">
              <span className="fa fa-fw fa-external-link" />
            </a>
          </small>
        </legend>
        <div className="form-group">
          <Checkbox
              name="output-mikumikumouth-enable"
              checked={!!this.props.plugins.output.mikumikumouth.enabled}
              text={t('Enable TCP server for MikuMikuMouth')}
              onChange={this._onChangeEnable}
            />
          {input}
        </div>
      </fieldset>
    );
  }

  _renderInput() {
    return (
      <div className={INDENT}>
        <div className="form-group">
          <label htmlFor="output-mikumikumouth-host">
            {t('Host')}:
          </label>
          <input
              type="text"
              className="form-control"
              id="output-mikumikumouth-host"
              value={this.props.plugins.output.mikumikumouth.host}
              onChange={this._onChangeHost}
              onFocus={e => {e.target.select()}}
              placeholder={t('Example') + ': 127.0.0.1'}
            />
        </div>
        <div className="form-group">
          <label htmlFor="output-mikumikumouth-port">
            {t('Port')}:
          </label>
          <input
              type="text"
              className="form-control"
              id="output-mikumikumouth-port"
              value={this.props.plugins.output.mikumikumouth.port}
              onChange={this._onChangePort}
              onFocus={e => {e.target.select()}}
              placeholder={t('Example') + ': 50001'}
            />
        </div>
      </div>
    );
  }

  _onChangeEnable() {
    this.dispatch('output:changeMikuMikuMouthEnable', !this.props.plugins.output.mikumikumouth.enabled);
  }

  _onChangeHost(e) {
    this.dispatch('output:changeMikuMikuMouthHost', String(e.target.value).trim())
  }

  _onChangePort(e) {
    this.dispatch('output:changeMikuMikuMouthPort', parseInt(String(e.target.value).trim(), 10));
  }
}
