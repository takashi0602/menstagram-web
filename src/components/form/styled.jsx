import styled from 'styled-components';

export const Relative = styled.div`
  position: relative;
`;

export const Absolute = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  height: 40px;
`;

export const Eye = {
  display: 'inline-block',
  width: '40px',
  height: '40px',
  background: '#C6C6C6',
  color: '#666666',
  cursor: 'pointer',
  padding: '5px',
  borderRadius: '5px'
};
