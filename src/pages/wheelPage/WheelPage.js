

import './WheelPage.css'
import WheelComponent from "react-wheel-of-prizes";
import { useState, useContext } from "react";
import {ShortlistContext} from "../../context/ShortlistContext";



function WheelPage() {
  const { shortlist } = useContext(ShortlistContext);

  const [ points, setPoints ] = useState(false);
  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass",
    "better luck next time",
    "won a voucher"
  ];

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

  const ponitschek = () => {
    if (!points) {
      alert("get more points");
    } else {
    }
  };

  return (
    <div className="wheel-box">
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="won 60"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="hello"
      />
    </div>
  );
};

export default WheelPage;


