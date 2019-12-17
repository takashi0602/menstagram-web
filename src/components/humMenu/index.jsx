import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MenuOuter, LogoutStyle } from './styled';

export class HamMenu extends Component {
  //ここで配列展開
  MenuList = () => {
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
      <MenuOuter>
        <this.MenuList />
      </MenuOuter>
    );
  }
}

HamMenu.propTypes = {
  menuItems: PropTypes.array
};
