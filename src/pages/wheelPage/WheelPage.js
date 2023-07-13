// TODO Remove Wheelpage and WheelComp and uninstall whinwheel and gsap

// import React, {useContext} from 'react';
// import { ShortlistContext } from "../../context/ShortlistContext";
// import WheelComp from '../../components/wheelcomp/WheelComp';
// import { TweenMax } from 'gsap';
//
// function WheelPage() {
//   const { shortlist } = useContext( ShortlistContext )
//
//   function handleClick() {
//     console.log(`Shortlist: ${shortlist.map(movie => (movie.title))}`)
//   }
//
//   return (
//     <>
//       <h1>Wheel of Fortune page</h1>
//       <h3>Shortlist</h3>
//       {shortlist.map(movie => (
//         <li key={movie.id}>{movie.title}</li>
//         ))
//       }
//       <WheelComp movies={shortlist} />
//     </>
//   )
// }
//
// export default WheelPage;