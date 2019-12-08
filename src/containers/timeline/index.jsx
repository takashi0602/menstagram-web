import React, { Component } from 'react';

export class Timeline extends Component {
  render() {
    return (
      <div className="c-container__padding">
        <p>これはタイムラインです</p>
        <div className="row justify-content-center">
          <button className="btn-lg active rounded-pill" onClick={() => {}}>
            グローバル
          </button>
          <button className="btn-lg active rounded-pill" onClick={() => {}}>
            プライベート
          </button>
        </div>
      </div>
    );
  }
}
