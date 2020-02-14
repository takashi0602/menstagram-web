import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-regular-svg-icons';
import { BackLink, AbsoluteContainer, Title, sadIcon } from './styled';
import { connect } from 'react-redux';

class NotFoundContainer extends Component {
  backToTop = () => {
    this.props.history.push('/');
  };

  backToTimeline = () => {
    this.props.history.push('/timeline/private');
  };

  showBackLink = () => {
    if (this.props.accessToken) {
      return (
        <BackLink onClick={this.backToTimeline}>タイムラインへ戻る</BackLink>
      );
    }
    return <BackLink onClick={this.backToTop}>トップへ戻る</BackLink>;
  };

  render() {
    return (
      <div className="position-relative w-100">
        <AbsoluteContainer>
          <FontAwesomeIcon icon={faDizzy} style={sadIcon} />
          <Title>
            404
            <br />
            Not Found
          </Title>
          <div className="text-center">{this.showBackLink()}</div>
        </AbsoluteContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken
  };
}

export const NotFound = connect(
  mapStateToProps,
  null
)(NotFoundContainer);

NotFoundContainer.propTypes = {
  history: PropTypes.object,
  accessToken: PropTypes.string
};
