import styled from 'styled-components';

export const BackButton = {
  fontSize: '27px',
  color: '#666666'
};

export const SideDrawerButton = {
  fontSize: '27px',
  color: '#EB6101'
};

export const UserName = {
  fontSize: '20px'
};
export const UserId = {
  fontSize: '16px'
};
export const Biography = {
  fontSize: '18px'
};

export const WhiteButton = {
  color: '#666666',
  border: '1px solid #C6C6C6',
  textDecoration: 'none',
  fontSize: '16px',
  height: '40px',
  lineHeight: '40px'
};
export const FollowButton = {
  color: 'white',
  backgroundColor: '#EB6101',
  fontSize: '16px',
  height: '40px',
  lineHeight: '40px'
};

export const noUnderline = {
  color: '#3C3C3C',
  textDecoration: 'none'
};
export const PostLink = {
  position: 'relative'
};
export const PostImage = {
  width: '100%',
  height: '125px',
  objectFit: 'contain'
};
export const ImagesIcon = {
  position: 'absolute',
  top: '15px',
  right: '15px'
};

export const HamMenu = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;
  position: fixed;
  right: -300px;
  top: 0;
  transition: transform 0.3s linear 0s;
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

export const manuBackground = styled.div`
  background-color: #333; /*黒背景部分背景色*/
  display: block;
  height: 100%;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: all 0.3s linear 0s; /*0.3s は変化するのにかかる時間*/
  width: 100%;
  z-index: -1;
`;

export const LogoutStyle = {
  textDecoration: 'none',
  color: '#3C3C3C',
  fontWeight: 'lighter ',
  borderColor: '#C6C6C6'
};
export const Submit = styled.button`
  textDecoration: none;
  fontSize: 16px;
  fontWeight: inherit;
  color: #EB6101;
  background-color: white;
  padding: 0;
  text-align: 'right'
`;
export const BlackLink = {
  color: '#3C3C3C',
  textDecoration: 'none'
};
export const Title = styled.div`
  fontSize: 18px;
  position: absolute;
  left: calc( 50% - 68px);
  text-align: center;
`;
export const PositionParent = styled.header`
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dee2e6;
`;
export const OrangeText = styled.div`
  color: #EB6101;
  margin-bottom: 1rem;
`;
export const TextArea = {
  resize: 'none'
};
