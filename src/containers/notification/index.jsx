import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { calc, notice_size, like_size, tital_size, menu_size, under} from './styled';

export class Notification extends Component {
  render() {
    const flag = true;
    const notices = [
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "メンスタグラム公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      },
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      },
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      },
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      },
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      },
      {
        id: 1,
        src_user: {
            user_id: "menstagram",
            screen_name: "公式",
            avater: "https://placehold.jp/150x150.png?text=icon"
        },
        post: {
            id: 1,
            image: "https://placehold.jp/150x150.png?text=image"
        },
        like: {
            created_at: "2019/11/29 22:56:15"
        }
      }
      
    ]

    if(flag === true)
    return (
      <div className=" px-0">
        <div className="text-center mb-5 mt-4" style={tital_size}>通知</div>
        <div className="d-flex justify-content-around border-bottom">
          <Link to="/notification" className  ="text-dark mb-2" style={menu_size,under}>いいね</Link>
          <Link to="/notification/follow" className="text-black-50" style={menu_size,under}>フォロー</Link>
          <Link to="/notification/management" className="text-black-50" style={menu_size,under}>運営</Link>
        </div>
        
        <div>
          {notices.map((notice)=>{
            return (
              <div className=" px-2 py-2 m-3">
                <Link
                  to={'/users/' + "aaaa"}
                  className=" d-inline-block align-items-center"
                  style= {calc} 
                >
                  <img
                    src={notice.src_user.avater}
                    alt="user_avatar"
                    className="d-inline-block rounded-circle border"
                    height="55px"
                    width="55px"
                  />
                  <a className="d-inline-block pl-3 text-body" style={notice_size}>{
                  notice.src_user.screen_name}がいいねしました
                  <td></td>
                  <a class="text-muted"style={like_size}>{notice.like.created_at.substr( 0, 10 )}</a>
                  </a>
                </Link>
                
                <img src={notice.post.image} height="50px" width="50px" alt=""/>
              </div>

        
              
            );
          })}

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
    );
  }
}