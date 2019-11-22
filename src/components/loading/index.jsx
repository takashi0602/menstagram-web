import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { LoadingStyle, Override } from './styled';

export class Loading extends React.Component {
  render() {
    return (
      <LoadingStyle>
        <div className="sweet-loading">
          <PacmanLoader
            css={Override}
            sizeUnit={'px'}
            size={40}
            color={'#EB6101'}
            loading={true}
          />
        </div>
      </LoadingStyle>
    );
  }
}
