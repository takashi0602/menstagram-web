import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Management extends Component {
  render() {
    const flag = true;
    if(flag === true)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>
      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-black-50">いいね</Link>
        <Link to="/notification/follow" className="text-black-50">フォロー</Link>
        <Link to="/notification/management" className="text-dark">運営</Link>
      </div>
          <div className="row">
            <Link to="/login" className="col-5 row">
              <img className="col-9" alt="management_icon" />
            </Link>
            <a>management_messagfgsfsgdfssdfdgdfgfe</a>
          </div>
        </div>
    );

    if(flag === false)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>

      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-black-50">いいね</Link>
        <Link to="/notification/follow" className="text-black-50">フォロー</Link>
        <Link to="/notification/management" className="text-dark">運営</Link>
      </div>
      <div　className="text-center mb-4">通知はありません</div>
        </div>
    );
  }
}