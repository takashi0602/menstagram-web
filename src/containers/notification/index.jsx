import React, { Component } from 'react';

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
    );
  }
}