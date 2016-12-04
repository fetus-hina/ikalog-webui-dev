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
import { Checkbox } from '../../elements';

const INDENT = 'push-xs-1 col-xs-11';
const t = (text) => window.i18n.t(text, {ns: 'output-websocket'});

export default class WebSocket extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    // this._onChangeHost = this._onChangeHost.bind(this);
    this._onChangePort = this._onChangePort.bind(this);
  }

  render() {
    const input = this.props.plugins.output.websocket.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          {t('WebSocket Server')}
        </legend>
        <div className="form-group">
          <p className="alert alert-warning">
            <strong>{t('Warning')}:</strong> {t('The server is accessible by anyone')}
          </p>
          <Checkbox
              name="output-websocket-enable"
              checked={!!this.props.plugins.output.websocket.enabled}
              text={t('Enable WebSocket server')}
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
        {/*
          <div className="form-group">
            <label htmlFor="output-websocket-host">
              {t('Host')}:
            </label>
            <input
                type="text"
                className="form-control"
                id="output-websocket-host"
                value={this.props.plugins.output.websocket.host}
                onChange={this._onChangeHost}
                onFocus={e => {e.target.select()}}
                placeholder={t('Example') + ': 127.0.0.1'}
              />
          </div>
        */}
        <div className="form-group">
          <label htmlFor="output-websocket-port">
            {t('Port')}:
          </label>
          <input
              type="number"
              className="form-control"
              id="output-websocket-port"
              value={this.props.plugins.output.websocket.port}
              onChange={this._onChangePort}
              onFocus={e => {e.target.select()}}
              placeholder={t('Example') + ': 9090'}
              min="1"
              max="65535"
            />
        </div>
      </div>
    );
  }

  _onChangeEnable() {
    this.dispatch('output:changeWebSocketEnable', !this.props.plugins.output.websocket.enabled);
  }

  // _onChangeHost(e) {
  //   this.dispatch('output:changeWebSocketHost', String(e.target.value).trim())
  // }

  _onChangePort(e) {
    this.dispatch('output:changeWebSocketPort', parseInt(String(e.target.value).trim(), 10));
  }
}
