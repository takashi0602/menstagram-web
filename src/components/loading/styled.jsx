import styled from 'styled-components';
import { css } from '@emotion/core';

export const LoadingStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.55);
  z-index: 1000;
`;

export const Override = css`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  transform: translate(-50%, -50%);
`;
