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
import { Checkbox, RadioButton } from '../../../elements';

const INDENT = 'push-xs-1 col-xs-11';
const t = (text) => window.i18n.t(text, {ns: 'output-sns'});

export default class Twitter extends Component {
  constructor(props) {
    super(props);
    this._onChangeEnable = this._onChangeEnable.bind(this);
    this._onToggleFlag = this._onToggleFlag.bind(this);
    this._onMsgChanged = this._onMsgChanged.bind(this);
    this._onChangeUseKey = this._onChangeUseKey.bind(this);
    this._onChangeConsumerKey = this._onChangeConsumerKey.bind(this);
    this._onChangeConsumerSecret = this._onChangeConsumerSecret.bind(this);
    this._onChangeAccessToken = this._onChangeAccessToken.bind(this);
    this._onChangeAccessSecret = this._onChangeAccessSecret.bind(this);
  }

  render() {
    const input = this.props.plugins.output.twitter.enabled ? this._renderInput() : null;

    return (
      <fieldset>
        <legend>
          <span className="fa fa-twitter fa-fw" />
          {t('Twitter')}
        </legend>
        <div className="form-group">
          <Checkbox
              name="output-tw-enable"
              checked={!!this.props.plugins.output.twitter.enabled}
              text={t('Post game results to Twitter')}
              onChange={this._onChangeEnable}
            />
        </div>
        {input}
      </fieldset>
    );
  }

  _renderInput() {
    return (
      <div className={INDENT}>
        {this._renderInputKeySwitch()}
        {this._renderInputOptions()}
      </div>
    );
  }

  _renderInputOptions() {
    return (
      <div>
        <div className="form-group">
          <Checkbox
              name="output-tw-use-reply"
              checked={!!this.props.plugins.output.twitter.useReply}
              text={t("Reply to @_ikalog_ to keep my followers' timeline clean")}
              onChange={e => {this._onToggleFlag(e, 'useReply')}}
            />
        </div>
        <div className="form-group">
          <Checkbox
              name="output-tw-screenshot"
              checked={!!this.props.plugins.output.twitter.sendScreenShot}
              text={t('Attach a scoreboard')}
              onChange={e => {this._onToggleFlag(e, 'sendScreenShot')}}
            />
        </div>
        <div className="form-group">
          <Checkbox
              name="output-tw-myscore"
              checked={!!this.props.plugins.output.twitter.sendMyScore}
              text={t('Include my score')}
              onChange={e => {this._onToggleFlag(e, 'sendMyScore')}}
            />
        </div>
        <div className="form-group">
          <Checkbox
              name="output-tw-kd"
              checked={!!this.props.plugins.output.twitter.sendKDRatio}
              text={t('Include my K/D ratio')}
              onChange={e => {this._onToggleFlag(e, 'sendKDRatio')}}
            />
        </div>
        <div className="form-group">
          <Checkbox
              name="output-tw-rank"
              checked={!!this.props.plugins.output.twitter.sendRank}
              text={t('Include my rank in ranked mode')}
              onChange={e => {this._onToggleFlag(e, 'sendRank')}}
            />
        </div>
        <div className="form-group">
          <label htmlFor="output-tw-msg">
            {t('Additional message')}:
          </label>
          <input
              type="text"
              className="form-control"
              name="output-tw-msg"
              id="output-tw-msg"
              value={this.props.plugins.output.twitter.additionalMessage}
              onChange={this._onMsgChanged}
              onFocus={e => {e.target.select()}}
            />
        </div>
      </div>
    );
  }

  _renderInputKeySwitch() {
    return (
      <div>
        <div className="form-group">
          <RadioButton
              name="output-tw-key"
              checked={this.props.plugins.output.twitter.useKey == 'builtin'}
              text={t('Use IkaLog Consumer Key (easy)')}
              onChange={e => this._onChangeUseKey(e, 'builtin')}
              disabled={!this.props.system.hasBuiltinTwitterToken}
            />
        </div>
        <div className="form-group">
          <RadioButton
              name="output-tw-key"
              checked={this.props.plugins.output.twitter.useKey == 'own'}
              text={t('Use you own Consumer Key')}
              onChange={e => this._onChangeUseKey(e, 'own')}
            />
        </div>
        {this._renderInputKeys()}
      </div>
    );
  }

  _renderInputKeys() {
    const isBuiltin = this.props.plugins.output.twitter.useKey === 'builtin';
    const isOwn     = this.props.plugins.output.twitter.useKey === 'own';
    if (isBuiltin || isOwn) {
      const consumerKey    = isBuiltin ? t('(Builtin)') : this.props.plugins.output.twitter.consumerKey;
      const consumerSecret = isBuiltin ? t('(Builtin)') : this.props.plugins.output.twitter.consumerSecret;
      const accessToken    = this.props.plugins.output.twitter.accessToken;
      const accessSecret   = this.props.plugins.output.twitter.accessSecret;

      const csOrAuth = isBuiltin
          ? (
            <div>
              <button type="button" className="btn btn-outline-primary">
                <span className="fa fa-fw fa-twitter" />
                {t('Authenticate')}
              </button>
            </div>
          )
          : (
            <div>
              <div className="form-group">
                <label htmlFor="output-tw-ck">
                  {t('Consumer Key')}:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="output-tw-ck"
                    value={consumerKey}
                    onChange={this._onChangeConsumerKey}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="output-tw-cs">
                  {t('Consumer Secret')}:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="output-tw-cs"
                    value={consumerSecret}
                    onChange={this._onChangeConsumerSecret}
                  />
              </div>
            </div>
          );

      return (
        <div className={INDENT}>
          {csOrAuth}
          <div className="form-group">
            <label htmlFor="output-tw-tk">
              {t('Access Token')}:
            </label>
            <input
                type="text"
                className="form-control"
                id="output-tw-tk"
                value={accessToken}
                onChange={this._onChangeAccessToken}
                disabled={isBuiltin}
              />
          </div>
          <div className="form-group">
            <label htmlFor="output-tw-ts">
              {t('Access Token Secret')}:
            </label>
            <input
                type="text"
                className="form-control"
                id="output-tw-ts"
                value={accessSecret}
                onChange={this._onChangeAccessSecret}
                disabled={isBuiltin}
              />
          </div>
        </div>
      );
    }
    return null; // 明示的にnullを返さないとエラーになる
  }
  _onChangeEnable() {
    this.dispatch('output:changeTwitterEnable', !this.props.plugins.output.twitter.enabled);
  }

  _onToggleFlag(e, flag) {
    const conf = Object.assign({}, this.props.plugins.output.twitter);
    conf[flag] = !conf[flag];
    this.dispatch('output:changeTwitterFlag', conf);
  }

  _onMsgChanged(e) {
    this.dispatch('output:changeTwitterMessage', String(e.target.value).trim())
  }

  _onChangeUseKey(e, newState) {
    this.dispatch('output:changeTwitterKeyType', newState);
  }

  _onChangeConsumerKey(e) {
    this.dispatch('output:changeTwitterConsumerKey', String(e.target.value).trim());
  }

  _onChangeConsumerSecret(e) {
    this.dispatch('output:changeTwitterConsumerSecret', String(e.target.value).trim());
  }

  _onChangeAccessToken(e) {
    this.dispatch('output:changeTwitterAccessToken', String(e.target.value).trim());
  }

  _onChangeAccessSecret(e) {
    this.dispatch('output:changeTwitterAccessSecret', String(e.target.value).trim());
  }
}
