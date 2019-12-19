import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MenuOuter,
  LogoutStyle,
  HumButton,
  Open,
  Close,
  Cover
} from './styled';

export class HamMenu extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isMenuShow: false
    };
  }
  toggleMenu = (e, props) => {
    this.setState({ isMenuShow: props });
  };
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
      <div>
        <MenuOuter style={this.state.isMenuShow ? Open : Close}>
          <this.MenuList />
          <HumButton onClick={e => this.toggleMenu(e, !this.state.isMenuShow)}>
            ≡
          </HumButton>
        </MenuOuter>
        {this.state.isMenuShow && (
          <Cover onClick={e => this.toggleMenu(e, false)} />
        )}
      </div>
    );
  }
}

HamMenu.propTypes = {
  menuItems: PropTypes.array
};
