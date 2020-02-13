import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHeart,
  faImage,
  // faBell,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as regularHeart,
  // faBell as regularBell
  faBellSlash
} from '@fortawesome/free-regular-svg-icons';
import { NavBar, NavIcon, NavIconInactive, NavIconActive } from './styled';
import connect from 'react-redux/es/connect/connect';

class MenuComponent extends Component {
  // top, register, login, logoutでは表示しない
  Hide = () => {
    if (
      ['', 'register', 'login', 'logout'].indexOf(
        this.props.history.location.pathname.split('/')[1]
      ) > -1 ||
      !this.props.location.key
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
        <Link to="/yums" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={path === 'yums' ? faHeart : regularHeart}
            style={path === 'yums' ? NavIconActive : NavIconInactive}
          />
        </Link>
        <Link to="/slurp" className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon
            icon={faImage}
            style={
              path === 'slurp' && query === undefined
                ? NavIconActive
                : NavIconInactive
            }
          />
        </Link>
        {/* TODO: 実装後、リンク追加 */}
        {/*<Link*/}
        {/*to="/notice/yummed"*/}
        {/*className="d-inline-block p-2"*/}
        {/*style={NavIcon}*/}
        {/*>*/}
        {/*<FontAwesomeIcon*/}
        {/*icon={path === 'notice' ? faBell : regularBell}*/}
        {/*style={path === 'notice' ? NavIconActive : NavIconInactive}*/}
        {/*/>*/}
        {/*</Link>*/}
        <div className="d-inline-block p-2" style={NavIcon}>
          <FontAwesomeIcon icon={faBellSlash} style={{ color: '#C6C6C6' }} />
        </div>
        <Link
          to={`/user/${this.props.userId}`}
          className="d-inline-block p-2"
          style={NavIcon}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={path === 'user' ? NavIconActive : NavIconInactive}
          />
        </Link>
      </NavBar>
    );
  };

  render() {
    return <div>{this.Hide()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export const Menu = connect(
  mapStateToProps,
  null
)(MenuComponent);

MenuComponent.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userId: PropTypes.string
};
