import React, { Component } from 'react';
import { HeaderTitle } from './styled';
import PropTypes from 'prop-types';

export class Report extends Component {
  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <header className="py-3 px-3 border-bottom">
          <HeaderTitle>ラーメンじゃないよ報告</HeaderTitle>
        </header>
        <div className="c-container__padding">
          <p className="py-3 mb-4">
            投稿にラーメン以外の画像が含まれていましたか？
          </p>
          <div className="d-flex justify-content-around">
            <div>
              <button
                type="button"
                className="c-button__orange"
                onClick={this.goBack}
              >
                はい
              </button>
            </div>
            <div>
              <button
                type="button"
                className="c-button__white"
                onClick={this.goBack}
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  history: PropTypes.object
};
