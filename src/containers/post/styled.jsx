import styled from 'styled-components';

export const PostButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  padding: 0;
  color: #eb6101;
  font-weight: normal;
  cursor: pointer;
  background-color: transparent;
`;

export const PostLabel = styled.label`
  color: #eb6101;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const RenderImage = styled.div`
  width: auth;
  height: 150px;
  background: no-repeat center;
  background-size: contain;
`;

export const Times = styled.div`
  position: absolute;
  top: 0;
  right: 0.5rem;
`;

export const TimesIcon = {
  width: '35px',
  height: '35px',
  color: '#666666',
  cursor: 'pointer',
};
