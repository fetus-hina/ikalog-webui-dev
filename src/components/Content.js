import React, { Component } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export default class Content extends Component {
  render() {
    const classesMain = this._addPushClass([
      'col-xs-12',
      'col-sm-7',
      'col-md-8',
      'col-lg-9',
      'col-xl-9',
    ]);
    const classesSide = this._addPullClass(this._makeCounterSide(classesMain));

    return (
      <div className="container mt-3">
        <div className="row">
          <MainContent className={classesMain.join(' ')} {...this.props} />
          <Sidebar className={classesSide.join(' ')} {...this.props} />
        </div>
      </div>
    );
  }

  // 左右入れ替えのための push-**-** クラスを生成して返す (col-md-10 => col-md-10 push-md-2)
  _addPushClass(classes) {
    return this._addPushPullClass(classes, 'push');
  }

  // 左右入れ替えのための pull-**-** クラスを生成して返す (col-md-10 => col-md-10 pull-md-2)
  _addPullClass(classes) {
    return this._addPushPullClass(classes, 'pull');
  }

  // _addPushClass/_addPullClass の実装関数
  _addPushPullClass(classes, pushOrPull) {
    const ret = [];
    classes.forEach(className => {
      const match = className.match(/^col-([a-z]{2})-(\d+)$/);
      ret.push(className);
      if (!match || match[2] === '12') {
        return;
      }
      const push = 12 - parseInt(match[2], 10);
      ret.push(`${pushOrPull}-${match[1]}-${push}`);
    });
    return ret;
  }

  // 2カラムレイアウトの反対側のクラスを自動生成する(col-**-** の合計が12になるように作る)
  _makeCounterSide(classes) {
    const ret = [];
    classes.forEach(className => {
      const match = className.match(/^col-([a-z]{2})-(\d+)$/);
      if (!match) {
        return;
      }
      if (match[2] === '12') {
        ret.push(className);
        return;
      }
      const width = 12 - parseInt(match[2], 10);
      ret.push(`col-${match[1]}-${width}`);
    });
    return ret;
  }
}
