import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  MenuWrapper,
  LogoutStyle,
  HamButton,
  Open,
  Close,
  Cover
} from './styled';

export class HamMenu extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isShowMenu: false
    };
  }

  toggleMenu = (e, props) => {
    this.setState({ isShowMenu: props });
  };

  //ここで配列展開
  Menus = () => {
    return this.props.menuItems.map((item, idx) => {
      return (
        <Link key={idx} style={LogoutStyle} to={item.path}>
          {item.label}
        </Link>
      );
    });
  };

  render() {
    return (
      <div>
        <MenuWrapper style={this.state.isShowMenu ? Open : Close}>
          <this.Menus />
          <HamButton onClick={e => this.toggleMenu(e, !this.state.isShowMenu)}>
            <FontAwesomeIcon icon={faBars} />
          </HamButton>
        </MenuWrapper>
        {this.state.isShowMenu && (
          <Cover onClick={e => this.toggleMenu(e, false)} />
        )}
      </div>
    );
  }
}

HamMenu.propTypes = {
  menuItems: PropTypes.array
};
