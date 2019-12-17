import styled from 'styled-components';

export const MenuOuter = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;
  position: fixed;
  right: -300px;
  top: 0;
  transition: transform 0.15s linear 0s;
  width: 300px;
  z-index: 1000;
  border-left: solid #c6c6c6 1px;
  border-width: 1px;

  &::before {
    background-color: #fff;
    border-radius: 0 0 0 10px;
    color: #eb6101;
    content: '≡';
    display: block;
    font-size: 50px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 100%;
    text-align: center;
    top: 0;
    margin-top: 15px;
    margin-right: 15px;
    width: 50px;
    border-width: 1px;
  }
  &:hover {
    transform: translate(-300px);
  }
`;

export const LogoutStyle = {
  textDecoration: 'none',
  color: '#3c3c3c',
  fontWeight: 'lighter',
  borderColor: '#c6c6c6',
  display: 'block',
  padding: '1rem',
  borderBottom: '1px solid #c6c6c6'
};
