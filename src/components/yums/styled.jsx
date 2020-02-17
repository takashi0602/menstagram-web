import styled from 'styled-components';

export const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #c6c6c6;
  border-radius: 50%;
  margin-right: 20px;
  background: no-repeat center;
  background-size: contain;
  position: relative;
`;

export const EllipsisH = {
  width: '35px',
  height: '35px'
};

export const faUserIcon = {
  width: '25px',
  height: '25px',
  color: '#666666',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const RamenImage = styled.div`
  width: auto;
  height: 100vw;
  max-height: 768px;
  background: no-repeat center;
  background-size: contain;
`;

export const ImageArea = styled.div`
  overflow: hidden;
  & .slick-dots {
    position: static;
  }
`;

export const YumIcon = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
  color: '#EB6101'
};

export const NotYumIcon = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
  color: '#666666'
};

export const HiddenButton = styled.button`
  padding: 0;
  color: #C6C6C6;
  font-weight: normal;
  cursor: pointer;
  background-color: transparent;
`;
