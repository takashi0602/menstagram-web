import styled from 'styled-components';
export const Question = styled.div`
  font-size: 18px
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-rignt: 0.5rem;
`;
export const YesButton = styled.span`
  background-color: #eb6101;
  color: white;
  width: 120px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
  border-radius: 50rem;
`;

export const NoButton = styled.span`
  background-color: white;
  color: #666666;
  border: 1px solid #c6c6c6;
  width: 120px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
  border-radius: 50rem;
`;
