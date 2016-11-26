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

import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="card">
          <div className="card-header">
            Menu
          </div>
          <div className="card-block">
            <a href="#" className="btn btn-secondary btn-block" onClick="">
              Preview
            </a>
            <a href="#" className="btn btn-secondary btn-block" onClick="">
              Video Input
            </a>
            <a href="#" className="btn btn-secondary btn-block" onClick="">
              Plugins
            </a>
          </div>
        </div>
      </div>
    );
  }
}
