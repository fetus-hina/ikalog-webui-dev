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

export class RadioButton extends Component {
  render() {
    return (
      <label className="custom-control custom-radio">
        <input
            className="custom-control-input"
            type="radio"
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">
          {this.props.text}
        </span>
      </label>
    );
  }
}

export class WrappedRadioButton extends Component {
  render() {
    return (
      <div className="form-group">
        <RadioButton {...this.props} />
      </div>
    );
  }
}

export class Checkbox extends Component {
  render() {
    return (
      <label className="custom-control custom-checkbox">
        <input
            className="custom-control-input"
            type="checkbox"
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">
          {this.props.text}
        </span>
      </label>
    );
  }
}

export class WrappedCheckbox extends Component {
  render() {
    return (
      <div className="form-group">
        <Checkbox {...this.props} />
      </div>
    );
  }
}
