import React, { Component } from 'react';
import { Question, YesButton, NoButton } from './styled';

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
            <Question>投稿にラーメン以外の画像が含まれていましたか？</Question>
            <div className="col text-center mt-3">
              <YesButton>はい</YesButton>
            </div>
            <div className="col text-center mt-3">
              <NoButton>いいえ</NoButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
