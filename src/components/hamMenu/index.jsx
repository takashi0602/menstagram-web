import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  MenuWrapper,
  itemStyle,
  HamButton,
  Open,
  Close,
  ButtonOpen,
  ButtonClose,
  Cover,
  LogoutItem
} from './styled';

export class HamMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMenu: false
    };
  }

  toggleMenu = (e, props) => {
    this.setState({ isShowMenu: props });
  };

  Menus = () => {
    return this.props.menuItems.map((item, idx) => {
      if (item.targetBlank) {
        return (
          <a
            key={idx}
            href={item.path}
            target="_blank"
            rel="noreferrer noopener"
            style={itemStyle}
          >
            {item.label}
          </a>
        );
      }
      return (
        <Link key={idx} to={item.path} style={itemStyle}>
          {item.label}
        </Link>
      );
    });
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className="position-relative">
        <MenuWrapper style={this.state.isShowMenu ? Open : Close}>
          {this.Menus()}
          <LogoutItem onClick={() => this.logout()}>ログアウト</LogoutItem>
        </MenuWrapper>
        <HamButton
          style={this.state.isShowMenu ? ButtonOpen : ButtonClose}
          onClick={e => this.toggleMenu(e, !this.state.isShowMenu)}
        >
          <FontAwesomeIcon icon={faBars} />
        </HamButton>
        {this.state.isShowMenu && (
          <Cover onClick={e => this.toggleMenu(e, false)} />
        )}
      </div>
    );
  }
}

HamMenu.propTypes = {
  menuItems: PropTypes.array,
  logout: PropTypes.func
};
