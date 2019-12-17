import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHeart,
  faImage,
  faBell,
  faUser
} from '@fortawesome/free-solid-svg-icons';
// TODO faHart, faBellはフォーカスされている状態のときレギュラーアイコンにする
//  →コンフリクトするため今はインポートしない
import { Navbar, NavIcon, NavIconDisactive, NavIconActive } from './styled';

export class Menu extends Component {
  // top, register, login, logoutでは表示しない
  Hide = () => {
    if (
      ['', 'register', 'login', 'logout'].indexOf(
        this.props.history.location.pathname.split('/')[1]
      ) > -1
    )
      return;

    const path = this.props.history.location.pathname.split('/')[1];
    const query = this.props.history.location.pathname.split('/')[2];
    return (
      <Navbar>
        <Link to="/timeline" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faHome}
            style={path === 'timeline' ? NavIconActive : NavIconDisactive}
          />
        </Link>
        <Link to="/like" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faHeart}
            style={path === 'like' ? NavIconActive : NavIconDisactive}
          />
        </Link>
        <Link to="/post" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faImage}
            style={
              path === 'post' && query === undefined
                ? NavIconActive
                : NavIconDisactive
            }
          />
        </Link>
        <Link to="/notification" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faBell}
            style={path === 'notification' ? NavIconActive : NavIconDisactive}
          />
        </Link>
        <Link
          to="/profile/menstagram"
          className="d-inline-block p-2"
          style={NavIcon}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={path === 'profile' ? NavIconActive : NavIconDisactive}
          />
        </Link>
      </Navbar>
    );
  };
  render() {
    return <div>{this.Hide()}</div>;
  }
}
Menu.propTypes = {
  history: PropTypes.object
};
