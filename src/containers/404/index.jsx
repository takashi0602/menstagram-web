import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import { BackToTopLink, AbsoluteContainer, Title, sadIcon } from './styled';

export class NotFound extends Component {
  backToTop = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="position-relative w-100">
        <AbsoluteContainer>
          <FontAwesomeIcon icon={faSadTear} style={sadIcon} />
          <Title>
            404
            <br />
            Not Found
          </Title>
          <div className="text-center">
            <BackToTopLink onClick={this.backToTop}>トップへ戻る</BackToTopLink>
          </div>
        </AbsoluteContainer>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.object
};
