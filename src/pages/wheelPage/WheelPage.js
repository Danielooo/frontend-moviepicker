

import './WheelPage.css'
import WheelComponent from "react-wheel-of-prizes";
import { useContext } from "react";
import { ShortlistContext } from "../../context/ShortlistContext";



function WheelPage() {
  const { shortlist } = useContext(ShortlistContext);

  let segments = []
  // let segments = ['Barbie', 'The Flash'];
  // // segments = ['Barbie', 'The Flash', 'The Shawshank Redemption', 'Inception', 'The Godfather', 'Pulp Fiction', 'The Dark Knight', 'Forrest Gump', 'The Matrix', 'Interstellar', 'Avengers: Endgame', 'Jurassic Park', 'Gladiator'];

  if ( shortlist.length > 0 ) {
    segments = shortlist.map((movie) => movie.title);
  }


  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000"
  ];

  const onFinished = (winner) => {
    alert(winner);
  };


  return (
    <>
      { shortlist.length === 0  ? (
        <p>Shortlist is leeg. Voeg films toe aan de shortlist</p>

        ) : shortlist.length === 1 ? (
          <p>Shortlist bevat maar 1 film. Voeg films toe</p>

        ) : (
          <div className="wheel-box">
            <WheelComponent
              // winningSegment={winner}
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              upDuration={300}
              downDuration={500}
              isOnlyOnce={false}
              fontFamily='Tahoma'
              // spinningSpeed={}
              // rotationSpeed={1}
            />
          </div>
        )
      }
    </>
  );
};

export default WheelPage;


