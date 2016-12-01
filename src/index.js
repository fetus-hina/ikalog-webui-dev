/*!
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
import ReactDOM from 'react-dom';
import App from './App';
import { initBootstrap, initFontAwesome, initI18Next, initAppStyle } from './bootstrap';
import { getUILanguage } from './Utils';

initBootstrap();
initFontAwesome();
initAppStyle();

const initLang = getUILanguage('en');

const i18n = initI18Next(initLang);
window.i18n = i18n;
window.React = React;

const app = new App({
  renderer: el => {
    ReactDOM.render(el, document.getElementById('app-root'));
  },
  initialState: {
    chrome: {
      lang: 'unknown',
      content: 'preview',
      pluginTab: 'file',
    },
    game: {
      lang: 'ja', // FIXME
    },
    plugins: {
      input: {
        driver: 'amarec',
        device: null,
        deinterlace: false,
        devices: [],
      },
      output: {
      },
    },
  },
  middlewares: [
    (t) => { console.log(t); return t },
  ],
});
window.app = app;

i18n.on('loaded', opts => {
  app.emit('chrome:changelang', i18n.language);
});

app.update(x => x);
