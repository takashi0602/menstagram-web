import styled from 'styled-components';

export const BackToTopLink = styled.div`
  cursor: pointer;
  display: inline-block;
  text-decoration: underline;
  color: #eb6101;
  &:hover {
    color: #eb6101;
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 150%);
  text-align: center;
`;

export const Title = styled.h3`
  width: 200px;
  font-size: 32px;
  margin: 0 0 20px 0;
`;

export const sadIcon = {
  fontSize: '40px',
  position: 'absolute',
  top: '-30px',
  right: '-20px',
  transform: 'rotate(30deg)'
};
