import React, { useState } from 'react';
import Lottie from 'react-lottie';

export default function LottieControl({ animation, size, loop, autoplay }) {
  const [isStopped, setStopped] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isStopped={isStopped}
      isClickToPauseDisabled
      isPaused={isPaused}
      height={size}
      width={size}
    />
  );
}
