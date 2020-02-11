import styled from 'styled-components';

export const yumHeart = {
  width: '20px',
  height: '20px',
  color: '#EB6101',
  marginRight: '10px'
};

export const unyumHeart = {
  width: '20px',
  height: '20px',
  color: '#666666',
  marginRight: '10px'
};

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

export const ImageArea = styled.div`
  overflow: hidden;
  & .slick-dots {
    position: static;
  }
`;

export const RamenImage = styled.div`
  width: auto;
  height: 100vw;
  max-height: 768px;
  background: no-repeat center;
  background-size: contain;
`;

export const YumsImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #c6c6c6;
  background: no-repeat center;
  background-size: contain;
  margin-right: 5px;
  position: relative;
`;

export const YumsIcon = {
  width: '15px',
  height: '15px',
  color: '#666666',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const SlurpText = styled.p`
  margin-bottom: 64px;
`;
