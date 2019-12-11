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
  render() {
    // top, register, login, logoutでは表示しない
    const Hide = () => {
      if (
        ['', 'register', 'login', 'logout'].indexOf(
          this.props.history.location.pathname.split('/')[1]
        ) > -1
      ) {
        return <nav></nav>;
      } else {
        const path = this.props.history.location.pathname.split('/')[1];
        return (
          <nav className="d-flex justify-content-around" style={Navbar}>
            <Link to="/timeline" class="d-inline-block p-2" style={NavIcon}>
              <FontAwesomeIcon
                icon={faHome}
                style={path === 'timeline' ? NavIconActive : NavIconDisactive}
              ></FontAwesomeIcon>
            </Link>
            <Link to="/like" class="d-inline-block p-2" style={NavIcon}>
              <FontAwesomeIcon
                icon={faHeart}
                style={path === 'like' ? NavIconActive : NavIconDisactive}
              ></FontAwesomeIcon>
            </Link>
            <Link to="/post" class="d-inline-block p-2" style={NavIcon}>
              <FontAwesomeIcon
                icon={faImage}
                style={path === 'post' ? NavIconActive : NavIconDisactive}
              ></FontAwesomeIcon>
            </Link>
            <Link to="/notification" class="d-inline-block p-2" style={NavIcon}>
              <FontAwesomeIcon
                icon={faBell}
                style={
                  path === 'notification' ? NavIconActive : NavIconDisactive
                }
              ></FontAwesomeIcon>
            </Link>
            <Link
              to="/profile/menstagram"
              class="d-inline-block p-2"
              style={NavIcon}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={path === 'profile' ? NavIconActive : NavIconDisactive}
              ></FontAwesomeIcon>
            </Link>
          </nav>
        );
      }
    };
    return <div>{<Hide></Hide>}</div>;
  }
}
Menu.propTypes = {
  history: PropTypes.object
};
