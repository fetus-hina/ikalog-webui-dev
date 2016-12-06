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

    // プラグイン設定のタブ切り替え
    this.on("chrome:changePluginTab", newState => {
      this.update(state => {
        state.chrome.pluginTab = newState;
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
    this.on('input:changeFileDeinterlace', newState => {
      if (newState !== true && newState !== false) {
          return;
      }
      this.update(state => {
        state.plugins.input.fileDeinterlace = newState;
        return state;
      });
    });

    // input / ファイル入力のファイル名
    this.on('input:changeFilePath', newState => {
      this.update(state => {
        state.plugins.input.filePath = String(newState);
        return state;
      });
    });

    // キャプチャデバイス一覧再読み込み要求
    this.on('input:reloadDevices', () => {
      return $.getJSON('/api/v1/capture_devices.json', {_: Date.now()})
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

    // CSV 設定変更
    this.on('output:changeCsvEnable', newState => {
      this.update(state => {
        state.plugins.output.csv.enabled = !!newState;
        return state;
      });
    });
    this.on('output:changeCsvPath', newState => {
      this.update(state => {
        state.plugins.output.csv.path = String(newState);
        return state;
      });
    });

    // JSON 設定変更
    this.on('output:changeJsonEnable', newState => {
      this.update(state => {
        state.plugins.output.json.enabled = !!newState;
        return state;
      });
    });
    this.on('output:changeJsonPath', newState => {
      this.update(state => {
        state.plugins.output.json.path = String(newState);
        return state;
      });
    });

    // スクショ設定変更
    this.on('output:changeScreenshotEnable', newState => {
      this.update(state => {
        state.plugins.output.screenshot.enabled = !!newState;
        return state;
      });
    });
    this.on('output:changeScreenshotPath', newState => {
      this.update(state => {
        state.plugins.output.screenshot.path = String(newState);
        return state;
      });
    });

    // Slack 設定変更
    this.on('output:changeSlackEnable', newState => {
      this.update(state => {
        state.plugins.output.slack.enabled = !!newState;
        return state;
      });
    });
    this.on('output:changeSlackUrl', newState => {
      this.update(state => {
        state.plugins.output.slack.webhook = String(newState);
        return state;
      });
    });
    this.on('output:changeSlackBotName', newState => {
      this.update(state => {
        state.plugins.output.slack.botName = String(newState);
        return state;
      });
    });

    // Twitter 設定変更
    this.on('output:changeTwitterEnable', newState => {
      this.update(state => {
        state.plugins.output.twitter.enabled = !!newState;
        return state;
      });
    });
    this.on('output:changeTwitterFlag', newState => {
      this.update(state => {
        state.plugins.output.twitter = newState;
        return state;
      });
    });
    this.on('output:changeTwitterMessage', newState => {
      this.update(state => {
        state.plugins.output.twitter.additionalMessage = String(newState);
        return state;
      });
    });
    this.on('output:changeTwitterKeyType', newState => {
      if (newState !== 'own' && newState !== 'builtin') {
        return;
      }
      this.update(state => {
        state.plugins.output.twitter.useKey = newState;
        return state;
      });
    });
    this.on('output:changeTwitterConsumerKey', newState => {
      this.update(state => {
        state.plugins.output.twitter.consumerKey = String(newState);
        return state;
      });
    });
    this.on('output:changeTwitterConsumerSecret', newState => {
      this.update(state => {
        state.plugins.output.twitter.consumerSecret = String(newState);
        return state;
      });
    });
    this.on('output:changeTwitterAccessToken', newState => {
      this.update(state => {
        state.plugins.output.twitter.accessToken = String(newState);
        return state;
      });
    });
    this.on('output:changeTwitterAccessSecret', newState => {
      this.update(state => {
        state.plugins.output.twitter.accessSecret = String(newState);
        return state;
      });
    });

    // stat.ink
    this.on('output:changeStatinkEnable', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.statink.enabled = newState;
        return state;
      });
    });
    this.on('output:changeStatinkApiKey', newState => {
      newState = String(newState);
      if (newState.match(/^[0-9a-zA-Z_-]{0,43}$/)) {
        this.update(state => {
          state.plugins.output.statink.apikey = newState;
          return state;
        });
      }
    });
    this.on('output:changeStatinkFlag', newState => {
      this.update(state => {
        state.plugins.output.statink = newState;
        return state;
      });
    });
    this.on('output:changeStatinkAnonymizer', newState => {
      if (newState !== false && newState !== 'other' && newState !== 'all') {
        return;
      }
      this.update(state => {
        state.plugins.output.statink.anonymizer = newState;
        return state;
      });
    });

    // 棒読みちゃん
    this.on('output:changeBoyomiEnable', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.boyomi.enabled = newState;
        return state;
      });
    });
    this.on('output:changeBoyomiHost', newState => {
      this.update(state => {
        state.plugins.output.boyomi.host = String(newState);
        return state;
      });
    });
    this.on('output:changeBoyomiPort', newState => {
      if (typeof newState !== 'number' || newState < 1 || newState > 65535) {
        return;
      }
      this.update(state => {
        state.plugins.output.boyomi.port = newState;
        return state;
      });
    });

    // みくみくまうす
    this.on('output:changeMikuMikuMouthEnable', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.mikumikumouth.enabled = newState;
        return state;
      });
    });
    this.on('output:changeMikuMikuMouthHost', newState => {
      this.update(state => {
        state.plugins.output.mikumikumouth.host = String(newState);
        return state;
      });
    });
    this.on('output:changeMikuMikuMouthPort', newState => {
      if (typeof newState !== 'number' || newState < 1 || newState > 65535) {
        return;
      }
      this.update(state => {
        state.plugins.output.mikumikumouth.port = newState;
        return state;
      });
    });

    // Recording
    this.on('output:changeAutoitEnable', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.autoit.enabled = newState;
        return state;
      });
    });
    this.on('output:changeAutoitRename', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.autoit.rename = newState;
        return state;
      });
    });
    this.on('output:changeAutoitScriptPath', newState => {
      this.update(state => {
        state.plugins.output.autoit.scriptPath = String(newState);
        return state;
      });
    });
    this.on('output:changeAutoitOutputPath', newState => {
      this.update(state => {
        state.plugins.output.autoit.outputPath = String(newState);
        return state;
      });
    });

    // WebSocket
    this.on('output:changeWebSocketEnable', newState => {
      if (newState !== true && newState !== false) {
        return;
      }
      this.update(state => {
        state.plugins.output.websocket.enabled = newState;
        return state;
      });
    });
    this.on('output:changeWebSocketPort', newState => {
      if (typeof newState !== 'number' || newState < 1 || newState > 65535) {
        return;
      }
      this.update(state => {
        state.plugins.output.websocket.port = newState;
        return state;
      });
    });
  }

  render(state) {
    return <AppComponent {...state} />;
  }
}
