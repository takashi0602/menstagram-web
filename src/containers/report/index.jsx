import React, { Component } from 'react';
import { question, yesButton, noButton } from './styled';

export class Report extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true
    };
  }
  render() {
    return (
      <div>
        <header className="py-3 px-3 border-bottom">
          <h1 className="h5 mb-0 text-center">ラーメンじゃないよ報告</h1>
        </header>
        <div className="container">
          <div className="row">
            <p className="col-12 m-2" style={question}>
              投稿にラーメン以外の画像が含まれていましたか？
            </p>
            <div className="col text-center mt-3">
              <span className="d-inline-block rounded-pill" style={yesButton}>
                はい
              </span>
            </div>
            <div className="col text-center mt-3">
              <span className="d-inline-block rounded-pill" style={noButton}>
                いいえ
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
