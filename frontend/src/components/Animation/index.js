import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import { AnimatedContainer } from './styles';

export default function LottieControl({ animation, size, loop, autoplay }) {
  LottieControl.defaultProps = {
    size: 300,
    loop: true,
    autoplay: true,
  };

  LottieControl.propTypes = {
    animation: PropTypes.oneOfType([PropTypes.object]).isRequired,
    size: PropTypes.number,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
  };

  const defaultOptions = {
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimatedContainer>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled
        height={size}
        width={size}
        loop={loop}
        autoplay={autoplay}
      />
    </AnimatedContainer>
  );
}
