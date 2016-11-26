import React, { Component } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export default class Content extends Component {
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <Sidebar className="col-xs-12 col-sm-3" />
          <MainContent className="col-xs-12 col-sm-9" />
        </div>
      </div>
    );
  }
}
