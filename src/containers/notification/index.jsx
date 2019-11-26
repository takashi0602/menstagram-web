import React, { Component } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

export class Notification extends Component {
  render() {
    const flag = true;
    if(flag === true)
    return (
      <div className="container px-0">
      <div className="text-center mb-4">通知</div>
      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-dark">いいね</Link>
        <Link to="/notification/follow" className="text-black-50">フォロー</Link>
        <Link to="/notification/management" className="text-black-50">運営</Link>
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
      <div className="text-center mb-4">通知</div>

      <div className="d-flex justify-content-around border-bottom">
        <Link to="/notification" className  ="text-dark">いいね</Link>
        <Link to="/notification/follow" className="text-black-50">フォロー</Link>
        <Link to="/notification/management" className="text-black-50">運営</Link>
      </div>
      <div　className="text-center mb-4">通知はありません</div>
        </div>
=======

export class Notification extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <div className="position-relative py-3 border-bottom mb-3">
           <div className="text-center mb-4">通知</div>
           <div className="d-flex justify-content-around">
            <button type="button">いいね</button>
            <button type="button">フォロー</button>
            <button type="button">運営</button>
           </div>
          </div>
      </div>
>>>>>>> 70a55ee25630e0ec490f5e57e5af3047bfa05311
    );
  }
}