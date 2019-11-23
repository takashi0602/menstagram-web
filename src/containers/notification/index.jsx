import React, { Component } from 'react';

export class Notification extends Component {
  render() {
    const flag = false;
    if(flag === true)
    return (
      <div class="container px-0">
      <h1 class="text-center">通知</h1>
      <h1 class="border-bottom">メニュー</h1>
          <div class="row">
            <a class="col-10 row">
              <img class="col-4" alt="icon" />
              <div class="col-8">さんがいいねしました</div>
            </a>
            <img class="col-2" alt="item" />
          </div>
        </div>
    );

    if(flag === false)
    return (
      <div class="container px-0">
      <h1 class="text-center">通知</h1>
      <h1 class="border-bottom">メニュー</h1>
      <a　class="text-center">通知はありません</a>
        </div>
    );
  }
}