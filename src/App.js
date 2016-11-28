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

import { Flux } from 'flumpt';
import AppComponent from './components/App';
import { setUILanguage } from './Utils';

export default class App extends Flux {
  subscribe() {
    // 表示言語切り替え
    this.on("chrome:changelang", newLang => {
      if (newLang !== 'ja' && newLang !== 'en') {
        return;
      }
      return new Promise(resolved => {
        window.i18n.changeLanguage(newLang, () => {
          this.update(state => {
            state.chrome.lang = newLang;
            setUILanguage(newLang);
            return state;
          });
          resolved();
        });
      });
    });

    // ゲーム言語切り替え
    this.on("game:changelang", newLang => {
      if (newLang !== 'ja' && newLang !== 'en_NA' && newLang !== 'en_EU') {
        return;
      }
      this.update(state => {
        state.game.lang = newLang;
        return state;
      });
    });

    // メインコンテンツ切り替え
    this.on("chrome:changeContent", newState => {
      if (newState !== 'preview' && newState !== 'input' && newState !== 'output') {
          return;
      }
      this.update(state => {
        state.chrome.content = newState;
        return state;
      });
    });

    // input / Amarec/DirectShow/OpenCV... の切り替え
    this.on('input:changeSource', newState => {
      this.update(state => {
        state.plugins.input.driver = newState;
        return state;
      });
    });
    
    // input / ファイル入力のでインタレース指定 ON/OFF
    this.on('input:changeDeinterlace', newState => {
      if (newState !== true && newState !== false) {
          return;
      }
      this.update(state => {
        state.plugins.input.deinterlace = newState;
        return state;
      });
    });

    // キャプチャデバイス一覧再読み込み要求
    this.on('input:reloadDevices', unusedNewState => {
      return $.getJSON('/api/capture_devices.json')
        .then(json => {
          this.update(state => {
            state.plugins.input.devices = json;
            return state;
          });
        });
    });

    // キャプチャデバイス選択
    this.on('input:changeDevice', newState => {
      this.update(state => {
        state.plugins.input.device = newState;
        return state;
      });
    });
  }

  render(state) {
    return <AppComponent {...state} />;
  }
}