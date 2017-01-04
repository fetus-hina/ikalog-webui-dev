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

const t = text => window.i18n.t(text, {ns: 'input'});

export default class Preview extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <PreviewImage {...this.props} />
        </div>
        <div className="form-group">
          <CaptureButton {...this.props} />
        </div>
      </div>
    );
  }
}

class PreviewImage extends Component {
  render() {
    const style = {
      width: "100%",
      height: "auto",
    };
    return <img src="http://127.0.0.1:8888/api/v1/engine/preview" style={style} />;
  }
}

class CaptureButton extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <button
          className="btn btn-secondary"
          disabled={!this.props.plugins.output.screenshot.currentEnabled}
          onClick={this._onClick}
      >
        <span className="fa fa-camera fa-fw" /> {t('Take a screenshot')}
      </button>
    );
  }

  _onClick() {
    this.dispatch('input:takeScreenshot', 1);
  }
}
