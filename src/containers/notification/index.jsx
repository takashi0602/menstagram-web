import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Notification extends Component {
  render() {
    const flag = true;
    if(flag === true)
    return (
      <div className="container px-0">
      <h1 className="text-center">通知</h1>
      <h1 className="border-bottom">メニュー</h1>
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