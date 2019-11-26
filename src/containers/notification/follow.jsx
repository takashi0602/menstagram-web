import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Follow extends Component {
  render() {
    const flag = true;
    if(flag === true)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>
      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-black-50">いいね</Link>
        <Link to="/notification/follow" className="text-dark">フォロー</Link>
        <Link to="/notification/management" className="text-black-50">運営</Link>
      </div>
          <div className="row">
            <Link to="/login" className="col-10 row">
              <img className="col-4" alt="icon" />
              <div className="col-8">さんにフォローされました</div>
            </Link>
            
            <Link to="/login" className="col-2 row">
            <img  alt="follow_button" />
            </Link>
          </div>
        </div>
    );

    if(flag === false)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>

      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-black-50">いいね</Link>
        <Link to="/notification/follow" className="text-dark">フォロー</Link>
        <Link to="/notification/management" className="text-black-50">運営</Link>
      </div>
      <div　className="text-center mb-4">通知はありません</div>
        </div>
    );
  }
}