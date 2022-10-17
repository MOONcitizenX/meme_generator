import React, { useRef } from 'react';
import { useContext } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import Draggable from 'react-draggable';
import { StateContext } from '../context/context';

export const MemeImageContainer = () => {
	const { allMemesArr, meme, memeInputs, memeText } =
		useContext(StateContext);

	const getFullImage = (ref) => {
		exportComponentAsJPEG(ref, {
			fileName: `${allMemesArr[meme.currentIndex].name}.jpg`
		});
	};

	const printRef = useRef();

	return (
		<>
			<div className="meme-container" ref={printRef}>
				<img src={meme.randomImage} alt="123" className="meme-image" />
				{memeInputs.map((item) => {
					return (
						<Draggable key={`${item.id}MemeText`} bounds="parent">
							<p className="meme-text">
								{memeText[`${item.id}`]}
							</p>
						</Draggable>
					);
				})}
			</div>
			<button
				name="getFullImage"
				onClick={() => getFullImage(printRef)}
				className="wide-button"
			>
				Download Meme
			</button>
		</>
	);
};
