import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: blue;
`;

const StyledText = styled.span`
  color: red;
`;

export default function Button(props) {
  const { children, onPress } = props;

  return (
    <StyledButton
      type="button"
      onClick={onPress}
    >
      <StyledText>
        {children}
      </StyledText>
    </StyledButton>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
};
Button.defaultProps = {
  onPress() {},
  children: null,
};
