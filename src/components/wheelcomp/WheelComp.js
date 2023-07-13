// import React, { useEffect, useRef, useState } from 'react';
// import Winwheel from 'winwheel';
// import { TweenMax } from 'gsap';
//
// function WheelComp({ movies }) {
//   const [isSpinning, setIsSpinning] = useState(false);
//
//
//       const wheel = new Winwheel({
//         canvasId: 'wheelCanvas',
//         numSegments: movies.length,
//         segments: movies.map((movie, index) => ({
//           fillStyle: `#${((index + 1) * 0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`,
//           text: movie.title,
//         })),
//         animation: {
//           type: 'spinToStop',
//           callbackFinished: handleSpinComplete,
//         },
//       });
//
//       wheel.draw();
//       wheel.startAnimation();
//
//
//   function handleSpinComplete(segment) {
//     console.log(`Selected movie: ${segment.text}`);
//     setIsSpinning(false);
//   }
//
//   function handleButtonClick() {
//     if (!isSpinning && wheel) {
//       setIsSpinning(true);
//     }
//   }
//
//   return (
//     <>
//       <h1>Wheel of Fortune</h1>
//       <canvas id="wheelCanvas" ref={wheel} width={500} height={500}></canvas>
//       <button onClick={handleButtonClick} disabled={isSpinning}>
//         {isSpinning ? 'Spinning...' : 'Spin'}
//       </button>
//     </>
//   );
// }
//
// export default WheelComp;
