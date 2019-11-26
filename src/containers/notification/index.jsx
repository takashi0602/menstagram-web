import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Notification extends Component {
  render() {
    const flag = true;
    if(flag === true)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>
      <div className="d-flex justify-content-around border-bottom">
        <Link to="/like" className  ="text-dark">いいね</Link>
        <Link to="/follow" className="text-black-50">フォロー</Link>
        <Link to="/management" className="text-black-50">運営</Link>
      </div>
          <div className="row">
            <Link to="/login" className="col-10 row">
              <img className="col-4" alt="icon" />
              <div className="col-8">さんがいいねしました</div>
            </Link>
            
            <Link to="/login" className="col-2 row">
            <img  alt="item" />
            </Link>
          </div>
        </div>
    );

    if(flag === false)
    return (
      <div className="container px-0">
      <h1 className="text-center">通知</h1>
      <h1 className="border-bottom">メニュー</h1>
      <a　className="text-center">通知はありません</a>
        </div>
    );
  }
}