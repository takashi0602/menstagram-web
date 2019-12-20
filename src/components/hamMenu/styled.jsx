import styled from 'styled-components';

export const MenuWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;
  position: fixed;
  right: max(calc(80px - 100vw), -300px);
  top: 0;
  width: min(calc(100vw - 80px), 300px);
  z-index: 2000;
  border-left: solid #c6c6c6 1px;
  border-width: 1px;
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

export const HamButton = styled.button`
    background-color: rgba(255,255,255, 0);
    color: #eb6101;
    display: block;
    font-size: 21px;
    height: 50px;
    line-height: 21px;
    position: absolute;
    right: min(calc(100vw - 80px), 300px);
    text-align: center;
    top: 0;
    margin-top: 15px;
    margin-right: 15px;
    padding: 0 ;
    width: 50px;
    border-width: 1px;
    border-radius: 0;
    opacity: 1 !important;
  }
`;

export const Open = {
  transition: 'transform 0.15s ease 0s',
  transform: 'translate( max(calc(80px - 100vw), -300px) )'
};

export const Close = {
  transition: 'transform 0.15s ease 0s',
  transform: 'translate( min(calc(100vw - 80px), 300px) )'
};

export const ButtonOpen = {
  transition: 'transform 0.15s ease 0s',
  transform: 'translate( 0px )'
};

export const ButtonClose = {
  transition: 'transform 0.15s ease 0s',
  transform: 'translate( min(calc(100vw - 80px ), 300px ) )'
};

export const Cover = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1600;
  background-color: #c6c6c6;
  opacity: 0.2;
`;
