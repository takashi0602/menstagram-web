import React from 'react';
import { Link } from "react-router-dom";
import titleSvg from "../../assets/images/title.svg";

export const Top = () => {
  return (
    <div className="c-container__padding">
      <div className="text-center pt-5 mb-3">
        <img src={titleSvg} alt="Menstagram" className="mb-5"/>
        <h3>SUSURU FOREVER,<br />SUSURU ANYWHERE.</h3>
      </div>
      <p className="mb-5">Menstagramは世界中のラーメンコミュニティを支える特化型SNSです。</p>
      <div className="mb-3">
        <p className="mb-0">アカウントを作成しますか？</p>
        <Link to="/register">登録する</Link>
      </div>
      <div>
        <p className="mb-0">アカウントをお持ちですか？</p>
        <Link to="/login">ログインする</Link>
      </div>
    </div>
  );
};
