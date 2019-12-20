import styled from 'styled-components';

export const BackButton = {
  fontSize: '27px',
  color: '#666'
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

export const EditButton = {
  color: '#666',
  border: '1px solid #C6C6C6',
  textDecoration: 'none',
  fontSize: '16px',
  height: '40px',
  lineHeight: '40px',
  borderRadius: '50rem',
  textAlign: 'center'
};

export const WhiteButton = styled.div`
  color: #666;
  border: 1px solid #c6c6c6;
  text-decoration: none;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  border-radius: 50rem;
  text-align: center;
`;

export const FollowButton = styled.div`
  color: #fff;
  background-color: #eb6101;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  border-radius: 50rem;
  text-align: center;
`;

export const noUnderline = {
  color: '#3C3C3C',
  textDecoration: 'none'
};

export const PostLink = {
  position: 'relative'
};

export const PostImage = styled.img`
  width: 100%;
  height: 125px;
  object-fit: contain;
`;

export const ImagesIcon = {
  position: 'absolute',
  top: '15px',
  right: '15px'
};

export const Submit = styled.button`
  text-decoration: none;
  fontsize: 16px;
  font-weight: inherit;
  color: #eb6101;
  background-color: white;
  padding: 0;
  text-align: 'right';
`;

export const BlackLink = {
  color: '#3C3C3C',
  textDecoration: 'none'
};

export const Title = styled.div`
  fontsize: 18px;
  position: absolute;
  left: calc(50% - 68px);
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
  color: #eb6101;
  margin-bottom: 1rem;
`;

export const TextArea = {
  resize: 'none'
};
