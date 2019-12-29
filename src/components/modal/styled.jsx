import styled from 'styled-components';

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #c6c6c6;
  opacity: 0.4;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border: 1px solid #c6c6c6;
  border-radius: 10px;
  background-color: white;
  opacity: 1;
`;

export const ModalItem = styled.div`
  border-bottom: 1px solid #c6c6c6;
`;

export const ModalCancel = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
