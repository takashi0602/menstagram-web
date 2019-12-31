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
import {
  faHeart as regularHeart,
  faBell as regularBell
} from '@fortawesome/free-regular-svg-icons';
import { NavBar, NavIcon, NavIconInactive, NavIconActive } from './styled';

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
      <NavBar>
        <Link
          to="/timeline/private"
          className="d-inline-block p-2"
          style={NavIcon}
        >
          <FontAwesomeIcon
            icon={faHome}
            style={path === 'timeline' ? NavIconActive : NavIconInactive}
          />
        </Link>
        <Link to="/like" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={path === 'like' ? faHeart : regularHeart}
            style={path === 'like' ? NavIconActive : NavIconInactive}
          />
        </Link>
        <Link to="/post" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faImage}
            style={
              path === 'post' && query === undefined
                ? NavIconActive
                : NavIconInactive
            }
          />
        </Link>
        <Link
          to="/notification/liked"
          className="d-inline-block p-2"
          style={NavIcon}
        >
          <FontAwesomeIcon
            icon={path === 'notification' ? faBell : regularBell}
            style={path === 'notification' ? NavIconActive : NavIconInactive}
          />
        </Link>
        <Link
          to="/profile/menstagram"
          className="d-inline-block p-2"
          style={NavIcon}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={path === 'profile' ? NavIconActive : NavIconInactive}
          />
        </Link>
      </NavBar>
    );
  };

  render() {
    return <div>{this.Hide()}</div>;
  }
}

Menu.propTypes = {
  history: PropTypes.object
};
