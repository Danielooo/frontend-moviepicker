import React, { useState, useEffect } from 'react';

function LoadingBar({ duration, color, height, borderRadius, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          }
          clearInterval(interval);
          setIsLoading(false);
          onComplete(); // Calls getRandomMovie in Randomizer.js
          return prevProgress;
        });
      }, duration / 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [duration, isLoading, onComplete]);

  const handleButtonClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      setProgress(0);
    }
  };

  const barStyles = {
    backgroundColor: color,
    width: `${progress}%`,
    height: height,
    borderRadius: borderRadius,
  };

  return (
    <>
      <div>
        <div className="loading-bar" style={barStyles}></div>
        <button onClick={handleButtonClick}>
          {isLoading ? 'Randomizing' : 'Pick movie'}
        </button>
      </div>
    </>
  );
}

export default LoadingBar;
