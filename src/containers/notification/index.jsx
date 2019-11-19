import React, { Component } from 'react';

export class Notification extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <div className="position-relative py-3 border-bottom mb-3">
           <div className="text-center">通知</div>
           <div className="d-flex justify-content-around">
            <buttom type="buttom">いいね</buttom>
            <buttom type="buttom">フォロー</buttom>
            <buttom type="buttom">運営</buttom>
           </div>
          </div>
      </div>
    );
  }
}