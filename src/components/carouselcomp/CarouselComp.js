// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
//
//
// function CarouselComp({ movies, stopIndex }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isRunning, setIsRunning] = useState(true);
//
//   useEffect(() => {
//     if (isRunning) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
//       }, 3);
//
//       return () => {
//         clearInterval(interval);
//       };
//     }
//   }, [isRunning, movies.length]);
//
//   useEffect(() => {
//     if (currentIndex === stopIndex) {
//       setIsRunning(false);
//     }
//   }, [currentIndex, stopIndex]);
//
//   return (
//     <Carousel selectedItem={currentIndex}>
//       {movies.map((movie, index) => (
//         <div key={index}>
//           <img src={movie.image} alt={movie.title} />
//           <p className="legend">{movie.title}</p>
//         </div>
//       ))}
//     </Carousel>
//   );
// }
//
// export default CarouselComp;
//
