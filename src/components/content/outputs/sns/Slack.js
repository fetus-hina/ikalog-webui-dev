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
const t = (text) => window.i18n.t(text, {ns: 'output-sns'});

export default class Slack extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    this._onChangeUrl = this._onChangeUrl.bind(this);
    this._onChangeBotName = this._onChangeBotName.bind(this);
  }

  render() {
    const input = this.props.plugins.output.slack.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          <span className="fa fa-slack fa-fw" />
          {t('Slack')}
        </legend>
        <div className="form-group">
          <Checkbox
              name="output-slack-enable"
              checked={!!this.props.plugins.output.slack.enabled}
              text={t('Post game results to a Slack channel')}
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
          <label htmlFor="output-slack-url">
            {t('Incoming WebHook API URL')}:
          </label>
          <input
              type="url"
              className="form-control"
              id="output-slack-url"
              value={this.props.plugins.output.slack.webhook}
              onChange={this._onChangeUrl}
              onFocus={e => {e.target.select()}}
              placeholder="https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC"
            />

          <label htmlFor="output-slack-name">
            {t('Bot name')}:
          </label>
          <input
              type="text"
              className="form-control"
              id="output-slack-name"
              value={this.props.plugins.output.slack.botName}
              onChange={this._onChangeBotName}
              onFocus={e => {e.target.select()}}
            />
        </div>
      </div>
    );
  }

  _onChangeEnable() {
    this.dispatch('output:changeSlackEnable', !this.props.plugins.output.slack.enabled);
  }

  _onChangeUrl(e) {
    this.dispatch('output:changeSlackUrl', String(e.target.value).trim())
  }

  _onChangeBotName(e) {
    this.dispatch('output:changeSlackBotName', String(e.target.value).trim())
  }
}
