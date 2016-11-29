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
import { RadioButton, Checkbox } from '../elements';

const RADIO_NAME = 'radio-9964c174-5d60-485a-b75d-ec15c80609f8';
const INDENT = 'push-xs-1 col-xs-11';

const t = text => window.i18n.t(text, {ns: 'input'});

export default class InputPlugin extends Component {
  render() {
    return (
      <div className="card">
        <h1 className="card-header">
          {t('Video Input')}
        </h1>
        <div className="card-block">
          <fieldset>
            <legend>
              {t('Select input source')}
            </legend>
            <Amarec {...this.props} />
            <DirectShow {...this.props} />
            <OpenCV {...this.props} />
            <Capture {...this.props} />
            <File {...this.props} />
          </fieldset>
        </div>
      </div>
    );
  }
}

class Amarec extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <RadioButton
            name={RADIO_NAME}
            checked={this.props.plugins.input.driver === 'amarec'}
            onChange={this._onChange}
            text={t('Capture through AmarecTV')} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeSource', 'amarec');
  }
}

class DirectShow extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <RadioButton
            name={RADIO_NAME}
            checked={this.props.plugins.input.driver === 'directshow'}
            onChange={this._onChange}
            text={t('HDMI video input (DirectShow, recommended)')} />
        <DeviceList driver="directshow" {...this.props} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeSource', 'directshow');
  }
}

class OpenCV extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <RadioButton
            name={RADIO_NAME}
            checked={this.props.plugins.input.driver === 'opencv'}
            onChange={this._onChange}
            text={t('HDMI video input (OpenCV driver)')} />
        <DeviceList driver="opencv" {...this.props} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeSource', 'opencv');
  }
}

class Capture extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <RadioButton
            name={RADIO_NAME}
            checked={this.props.plugins.input.driver === 'capture'}
            onChange={this._onChange}
            text={t('Realtime capture from desktop')} />
        <CalibrateButtons {...this.props} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeSource', 'capture');
  }
}

class CalibrateButtons extends Component {
  constructor(props) {
    super(props);
    this._calibrate = this._calibrate.bind(this);
    this._reset = this._reset.bind(this);
  }

  render() {
    if (this.props.plugins.input.driver !== 'capture') {
      return null;
    }
    return (
      <div className={INDENT + ' btn-group'}>
        <button type="button" className="btn btn-secondary" onChange={this._calibrate}>
          <span className="fa fa-search fa-fw" />
          {t('Calibrate')}
        </button>
        <button type="button" className="btn btn-secondary" onChange={this._reset}>
          <span className="fa fa-undo fa-fw" />
          {t('Reset')}
        </button>
      </div>
    );
  }

  _calibrate() {
    this.dispatch('input:calibrate', true);
  }

  _reset() {
    this.dispatch('input:calibrate', false);
  }
}

class File extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <RadioButton
            name={RADIO_NAME}
            checked={this.props.plugins.input.driver === 'file'}
            onChange={this._onChange}
            text={t('Read from pre-recorded video file (for testing)')} />
        <Deinterlace {...this.props} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeSource', 'file');
  }
}

class Deinterlace extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    if (this.props.plugins.input.driver !== 'file') {
      return null;
    }
    return (
      <div className={INDENT}>
        <Checkbox
            type="checkbox"
            checked={this.props.plugins.input.deinterlace}
            onChange={this._onChange}
            text={t('Enable deinterlacing (experimental)')} />
      </div>
    );
  }

  _onChange() {
    this.dispatch('input:changeDeinterlace', !this.props.plugins.input.deinterlace);
  }
}

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onReload = this._onReload.bind(this);
  }

  render() {
    if (this.props.plugins.input.driver !== this.props.driver) {
      return null;
    }
    const devices = this.props.plugins.input.devices;
    if (devices.length === 0) {
      this._onReload();
    }
    return (
      <div className="row">
        <div className={INDENT}>
          <select
              id="device"
              className="form-control mb-1"
              size="10"
              defaultValue={this.props.plugins.input.device}
              onChange={this._onChange}
          >
            {devices.map(device =>
              <option value={device}>
                {device}
              </option>
            )}
          </select>
          <div className="text-xs-right">
            <button className="btn btn-secondary" onClick={this._onReload}>
              <span className="fa fa-refresh fa-fw" />
              {t('Reload')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  _onChange(e) {
    this.dispatch('input:changeDevice', e.target.value);
  }

  _onReload() {
    this.dispatch('input:reloadDevices', '');
  }
}
