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

export default class Boyomi extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    this._onChangeHost = this._onChangeHost.bind(this);
    this._onChangePort = this._onChangePort.bind(this);
  }

  render() {
    const input = this.props.plugins.output.boyomi.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          {t('Bouyomi Chan')}
          <small>
            <a href="http://chi.usamimi.info/Program/Application/BouyomiChan/" target="_blank">
              <span className="fa fa-fw fa-external-link" />
            </a>
          </small>
        </legend>
        <div className="form-group">
          <Checkbox
              name="output-boyomi-enable"
              checked={!!this.props.plugins.output.boyomi.enabled}
              text={t('Enable Bouyomi client')}
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
          <label htmlFor="output-boyomi-host">
            {t('Host')}:
          </label>
          <input
              type="text"
              className="form-control"
              id="output-boyomi-host"
              value={this.props.plugins.output.boyomi.host}
              onChange={this._onChangeHost}
              onFocus={e => {e.target.select()}}
              placeholder={t('Example') + ': 127.0.0.1'}
            />
        </div>
        <div className="form-group">
          <label htmlFor="output-boyomi-port">
            {t('Port')}:
          </label>
          <input
              type="number"
              className="form-control"
              id="output-boyomi-port"
              value={this.props.plugins.output.boyomi.port}
              onChange={this._onChangePort}
              onFocus={e => {e.target.select()}}
              placeholder={t('Example') + ': 50001'}
              min="1"
              max="65535"
            />
        </div>
      </div>
    );
  }

  _onChangeEnable() {
    this.dispatch('output:changeBoyomiEnable', !this.props.plugins.output.boyomi.enabled);
  }

  _onChangeHost(e) {
    this.dispatch('output:changeBoyomiHost', String(e.target.value).trim())
  }

  _onChangePort(e) {
    this.dispatch('output:changeBoyomiPort', parseInt(String(e.target.value).trim(), 10));
  }
}
