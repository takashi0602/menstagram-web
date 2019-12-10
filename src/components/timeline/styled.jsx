import styled from 'styled-components';

export const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  background: no-repeat center;
  background-size: contain;
`;

export const EllipsisH = {
  width: '35px',
  height: '35px'
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

export const LikedHeartIcon = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
  color: '#EB6101'
};

export const NotLikedIcon = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
  color: '#666666'
};
