import './Wheel.css'
import WheelComponent from "react-wheel-of-prizes";
import { useContext } from "react";
import {ShortlistContext} from "../../context/ShortlistContext";
import './../../App.css'
import Button from "../../components/button/Button";
import {Link, useNavigate} from "react-router-dom";


function Wheel() {
  const navigate = useNavigate();
  const { shortlist } = useContext(ShortlistContext);

  const segments = shortlist.map((movie) => movie.title);

  // 10 colors
  const segColors = [
    '#F4D58D',
    '#778DA9',
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    '#F8A39D',
    '#FBB7A7',
  ];

  const onFinished = (winner) => {
    alert(`Your randomly selected movie is: ${winner}`);
  };

  function handleClickBackToSearch(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <>
      <div className='main-outer-container'>
        <div className='wheel-outer-container'>
          <div className='wheel-inner-container'>
      { shortlist.length === 0  ? (
        <>
          <p>Shortlist is leeg. Voeg films toe aan de shortlist</p>
          <Button text='Back to Movie Search' disabled={false} handleClick={handleClickBackToSearch}/>
        </>

        ) : shortlist.length === 1 ? (
          <>
            <p>Shortlist bevat maar 1 film. Voeg films toe</p>
            <Button text='Back to Movie Search' disabled={false} handleClick={handleClickBackToSearch}/>
          </>
        ) : (
          <>
            <h2>Random Movie</h2>
            <h3>Go back to <Link to={{pathname: '/'}}>Movie Search</Link> to update your shortlist</h3>
            <h3>Hit the Spin button to get a movie chosen for you</h3>
            <p>pssst... If you don't like it. You can spin it again</p>

              <div className="wheel-box">
                <WheelComponent
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
                  size='250'
                />
              </div>
          </>
        )
      }
          </div>
        </div>
      </div>
    </>
  );
}

export default Wheel;


