import styled from 'styled-components';

export const SlurpButton = styled.button`
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

export const DisabledSlurpButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  padding: 0;
  color: #c6c6c6;
  font-weight: normal;
  cursor: pointer;
  background-color: transparent;
`;

export const SlurpLabel = styled.label`
  color: #eb6101;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const SlurpLabelDisabled = styled.label`
  color: #c6c6c6;
  cursor: pointer;
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
  color: '#666',
  cursor: 'pointer'
};

export const BackButton = styled.div`
  height: 20px;
  line-height: 20px;
  color: #666666;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem 0 1rem 1rem;
`;

export const ChevronLeftIcons = {
  width: '12.5px',
  height: '20px'
};

export const Title = styled.h1`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 0;
  text-align: center;
`;

export const HeaderTitle = styled.div`
  font-size: 16px;
  text-align: center;
`;

export const FaChevronLeftStyle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #666666;
`;

export const faChevronLeftIconStyle = {
  width: 'auto',
  height: '20px'
};
