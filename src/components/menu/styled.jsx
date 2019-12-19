import styled from 'styled-components';
export const Navbar = styled.nav`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: white;
  z-index: 1000;
  border-top: 1px solid #c6c6c6;
  display: flex;
  justify-content: space-around;
`;
export const NavIcon = {
  fontSize: '30px',
  width: 'calc( 100% / 5 )',
  lineHeight: '30px',
  textAlign: 'center'
};
export const NavIconInactive = {
  color: '#666666'
};
export const NavIconActive = {
  color: '#EB6101'
};
