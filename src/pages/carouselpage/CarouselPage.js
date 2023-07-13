import React, { useState, useContext } from "react";
import CarouselComp from "../../components/carouselcomp/CarouselComp";

import Shortlist from '../../components/shortlist/ShortList';
import { ShortlistContext } from "../../context/ShortlistContext";

function CarouselPage() {
  const { shortlist } = useContext( ShortlistContext )
  const [ stopIndex, setStopIndex ] = useState(null);

  const handleRandomStop = () => {
    const randomIndex = Math.floor(Math.random() * shortlist.length);
    setStopIndex(randomIndex);
  };

  return (
    <div>
      <h1>Movie Slot Machine</h1>
      <button onClick={handleRandomStop}>Spin</button>
      <CarouselComp movies={shortlist} stopIndex={stopIndex} />
    </div>
  );
}

export default CarouselPage;