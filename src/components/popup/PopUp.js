import React from 'react';
import './PopUp.css'


function PopUp({text, type}) {
	
	return (
		<>
			{type === 'movie-summary' && (
				<div className='popup-container'>
					<p className='popup-container-text'>
						{text}
					</p>
				</div>
			)}
			
			{type === 'icon-explain' && (
			<div className='popup-container-icon-explain'>
				<p className='popup-container-text'>
					{text}
				</p>
			</div>
			)}
			
		</>
	)
}

export default PopUp;