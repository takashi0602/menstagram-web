import React, { Component } from 'react';

export class Timeline extends Component {
  render() {
    return (
      <div className="c-container__padding" >
        <div class="containner" >
        <p>これはタイムラインです</p>
            <div class="row justify-content-center">
            <button class="btn-lg active rounded-pill" onClick={()=>{}}>
              グローバル
              </button>
            
            <button class="btn-lg active rounded-pill" onClick={()=>{}}>
              プライベート
              </button>
            </div>
          </div>
      </div>
/*投稿内容部分はcomponentsにかくのかな？*/
      
    );
  }
}        

       
      